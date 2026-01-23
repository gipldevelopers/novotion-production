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

// PUT - Update topic suggestion status
export async function PUT(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return new Response(JSON.stringify({ error: "Status is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const suggestion = await prisma.topicSuggestion.update({
      where: { id },
      data: { status },
    });

    return new Response(JSON.stringify({ suggestion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update suggestion error:", error);
    return new Response(JSON.stringify({ error: "Failed to update suggestion" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE - Delete topic suggestion
export async function DELETE(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await params;

    await prisma.topicSuggestion.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Suggestion deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete suggestion error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete suggestion" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
