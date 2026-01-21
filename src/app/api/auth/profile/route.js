import prisma from "@/lib/prisma";
import { verifyJwt, hashPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const payload = verifyJwt(token);
        if (!payload || !payload.userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const body = await req.json();
        const { name, phone, address, city, state, postalCode, country, password } = body;

        const updateData = {
            name,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
        };

        if (password && password.trim() !== "") {
            updateData.password = await hashPassword(password);
        }

        const updatedUser = await prisma.user.update({
            where: { id: payload.userId },
            data: updateData,
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
            },
        });

        return new Response(JSON.stringify({ user: updatedUser, message: "Profile updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Profile Update error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
