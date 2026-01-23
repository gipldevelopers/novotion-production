import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const payload = verifyJwt(token);
        if (!payload || payload.role !== 'ADMIN') {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const role = searchParams.get("role") || "";
        const skip = (page - 1) * limit;

        // Construct where clause
        const where = {};
        if (role) {
            where.role = role;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                include: {
                    purchases: {
                        take: 5, // Limit purchase history in list view for performance
                        orderBy: { createdAt: 'desc' }
                    },
                    payments: {
                        select: {
                            amount: true,
                            status: true
                        }
                    },
                    _count: {
                        select: { purchases: true, payments: true }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit,
            }),
            prisma.user.count({ where })
        ]);

        // Remove passwords and calculate total successful payments
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            
            // Calculate total successful payment amount
            const totalSuccessfulPayments = user.payments
                ?.filter(payment => payment.status === 'SUCCESS')
                .reduce((sum, payment) => sum + payment.amount, 0) || 0;
            
            return {
                ...userWithoutPassword,
                totalSuccessfulPayments
            };
        });

        return new Response(JSON.stringify({
            users: usersWithoutPasswords,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch users error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
