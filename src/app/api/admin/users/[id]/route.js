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

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                purchases: {
                    include: {
                        payment: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                payments: {
                    orderBy: { createdAt: 'desc' }
                },
                _count: {
                    select: { purchases: true, payments: true }
                }
            }
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const { password, ...userWithoutPassword } = user;

        return new Response(JSON.stringify({ user: userWithoutPassword }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch user detail error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

// Helper function to verify admin
async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return null;
    }

    const payload = verifyJwt(token);
    if (!payload || payload.role !== 'ADMIN') {
        return null;
    }

    return payload;
}

// PUT - Update a user
export async function PUT(request, { params }) {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Check if user exists
        const existing = await prisma.user.findUnique({
            where: { id },
        });

        if (!existing) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Check if email is being changed and if it's already taken
        if (body.email && body.email !== existing.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email: body.email },
            });

            if (emailExists) {
                return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
            }
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(body.name !== undefined && { name: body.name }),
                ...(body.email && { email: body.email }),
                ...(body.phone !== undefined && { phone: body.phone }),
                ...(body.address !== undefined && { address: body.address }),
                ...(body.city !== undefined && { city: body.city }),
                ...(body.state !== undefined && { state: body.state }),
                ...(body.postalCode !== undefined && { postalCode: body.postalCode }),
                ...(body.country !== undefined && { country: body.country }),
                ...(body.role && { role: body.role }),
                ...(body.status !== undefined && { status: body.status }),
            },
        });

        const { password, ...userWithoutPassword } = updatedUser;

        return new Response(JSON.stringify({ user: userWithoutPassword }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Update user error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

// PATCH - Suspend/Unsuspend a user
export async function PATCH(request, { params }) {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { id } = await params;

        // Check if user exists
        const existing = await prisma.user.findUnique({
            where: { id },
        });

        if (!existing) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Prevent suspending admin accounts
        if (existing.role === 'ADMIN') {
            return new Response(JSON.stringify({ error: "Cannot suspend admin accounts" }), { status: 403 });
        }

        // Toggle suspend status
        const newStatus = existing.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                status: newStatus,
            },
        });

        const { password, ...userWithoutPassword } = updatedUser;

        return new Response(JSON.stringify({
            user: userWithoutPassword,
            message: `User ${newStatus === 'SUSPENDED' ? 'suspended' : 'unsuspended'} successfully`
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Suspend user error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
