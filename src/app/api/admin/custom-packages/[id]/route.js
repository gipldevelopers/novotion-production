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

// GET - Get a single custom package
export async function GET(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const customPackage = await prisma.customPackage.findUnique({
      where: { id },
    });

    if (!customPackage) {
      return Response.json(
        { error: "Custom package not found" },
        { status: 404 }
      );
    }

    return Response.json(customPackage);
  } catch (error) {
    console.error("Error fetching custom package:", error);
    return Response.json(
      { error: "Failed to fetch custom package" },
      { status: 500 }
    );
  }
}

// PUT - Update a custom package (all packages can be updated)
export async function PUT(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Check if package exists
    const existing = await prisma.customPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return Response.json(
        { error: "Custom package not found" },
        { status: 404 }
      );
    }

    const { name, price, description, features, color, badge, icon } = body;

    const customPackage = await prisma.customPackage.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(description && { description }),
        ...(features !== undefined && {
          features: Array.isArray(features) ? features : [],
        }),
        ...(color && { color }),
        ...(badge !== undefined && { badge }),
        ...(icon && { icon }),
      },
    });

    return Response.json(customPackage);
  } catch (error) {
    console.error("Error updating custom package:", error);
    return Response.json(
      { error: "Failed to update custom package" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a custom package (only admin-created packages can be deleted)
export async function DELETE(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if package exists
    const existing = await prisma.customPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return Response.json(
        { error: "Custom package not found" },
        { status: 404 }
      );
    }

    // Prevent deleting seed packages
    if (existing.isSeed) {
      return Response.json(
        { error: "Cannot delete seed packages" },
        { status: 403 }
      );
    }

    await prisma.customPackage.delete({
      where: { id },
    });

    return Response.json({ message: "Custom package deleted successfully" });
  } catch (error) {
    console.error("Error deleting custom package:", error);
    return Response.json(
      { error: "Failed to delete custom package" },
      { status: 500 }
    );
  }
}
