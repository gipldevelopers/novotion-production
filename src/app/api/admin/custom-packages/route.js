import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

// Helper function to verify admin
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyJwt(token);
  if (!payload || !payload.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

// GET - List all custom packages
export async function GET(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isSeed = searchParams.get("isSeed");

    const where = {};
    if (isSeed !== null) {
      where.isSeed = isSeed === "true";
    }

    const packages = await prisma.customPackage.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(packages);
  } catch (error) {
    console.error("Error fetching custom packages:", error);
    return Response.json(
      { error: "Failed to fetch custom packages" },
      { status: 500 }
    );
  }
}

// POST - Create a new custom package (admin-created only, not seed)
export async function POST(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, price, description, features, color, badge, icon } = body;

    if (!name || !price || !description) {
      return Response.json(
        { error: "Name, price, and description are required" },
        { status: 400 }
      );
    }

    // Generate ID from name
    const id = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Check if ID already exists
    const existing = await prisma.customPackage.findUnique({
      where: { id },
    });

    if (existing) {
      return Response.json(
        { error: "A package with this name already exists" },
        { status: 400 }
      );
    }

    const customPackage = await prisma.customPackage.create({
      data: {
        id,
        name,
        price: parseFloat(price),
        description,
        features: Array.isArray(features) ? features : [],
        color: color || "blue",
        badge: badge || null,
        icon: icon || "Zap",
        isSeed: false, // Admin-created packages are not seed packages
      },
    });

    return Response.json(customPackage, { status: 201 });
  } catch (error) {
    console.error("Error creating custom package:", error);
    return Response.json(
      { error: "Failed to create custom package" },
      { status: 500 }
    );
  }
}
