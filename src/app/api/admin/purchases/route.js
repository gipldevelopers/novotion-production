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
        const skip = (page - 1) * limit;

        const [purchases, total, stats] = await Promise.all([
            prisma.purchase.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    payment: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit
            }),
            prisma.purchase.count(),
            prisma.purchase.aggregate({
                _sum: {
                    itemPrice: true
                },
                _count: {
                    id: true
                }
            })
        ]);

        // Get success payment stats
        const paymentStats = await prisma.payment.aggregate({
            where: { status: 'SUCCESS' },
            _sum: {
                amount: true
            }
        });

        return new Response(JSON.stringify({
            purchases,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            stats: {
                totalRevenue: stats._sum.itemPrice || 0,
                totalOrders: stats._count.id || 0,
                successfulPayments: paymentStats._sum.amount || 0
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch purchases error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
