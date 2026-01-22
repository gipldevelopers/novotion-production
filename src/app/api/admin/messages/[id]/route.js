import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const payload = verifyJwt(token);
        if (!payload || payload.role !== 'ADMIN') {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const message = await prisma.contactMessage.findUnique({
            where: { id }
        });

        if (!message) {
            return new Response(JSON.stringify({ error: "Message not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch message detail error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const payload = verifyJwt(token);
        if (!payload || payload.role !== 'ADMIN') {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const { status, adminNotes } = await request.json();

        const updatedMessage = await prisma.contactMessage.update({
            where: { id },
            data: {
                status,
                adminNotes
            }
        });

        return new Response(JSON.stringify({ message: updatedMessage }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Update message error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
