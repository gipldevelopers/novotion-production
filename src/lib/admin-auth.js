import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { error: jsonError("Unauthorized", 401) };
  }

  const payload = verifyJwt(token);

  if (!payload?.userId || payload.role !== "ADMIN") {
    return { error: jsonError("Forbidden", 403) };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return { error: jsonError("Forbidden", 403) };
  }

  return { user };
}
