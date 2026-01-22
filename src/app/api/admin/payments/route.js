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
        const status = searchParams.get("status") || "";
        const search = searchParams.get("search") || "";
        const skip = (page - 1) * limit;

        const where = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { orderId: { contains: search, mode: 'insensitive' } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { user: { name: { contains: search, mode: 'insensitive' } } }
            ];
        }

        const [payments, total, stats] = await Promise.all([
            prisma.payment.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit
            }),
            prisma.payment.count({ where }),
            prisma.payment.aggregate({
                where: { status: 'SUCCESS' },
                _sum: {
                    amount: true
                },
                _count: {
                    id: true
                }
            })
        ]);

        return new Response(JSON.stringify({
            payments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            stats: {
                totalRevenue: stats._sum.amount || 0,
                successCount: stats._count.id || 0
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch payments error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
