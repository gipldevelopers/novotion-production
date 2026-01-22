import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return new Response(JSON.stringify({ user: null }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const payload = verifyJwt(token);

        if (!payload || !payload.userId) {
            return new Response(JSON.stringify({ user: null }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                postalCode: true,
                country: true,
                role: true,
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ user: null }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Auth Me error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
