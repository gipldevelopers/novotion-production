import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {  // Remove the request parameter since we're not using it
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

        // Run all queries in parallel
        const [
            totalUsers,
            totalPurchases,
            revenueData,
            pendingInquiries
        ] = await Promise.all([
            // Total Users
            prisma.user.count(),
            
            // Total Purchases
            prisma.purchase.count(),
            
            // Total Revenue (from successful payments)
            prisma.payment.aggregate({
                where: { status: 'SUCCESS' },
                _sum: { amount: true }
            }),
            
            // Pending Inquiries (NEW status messages)
            prisma.contactMessage.count({
                where: { status: 'NEW' }
            })
        ]);

        const stats = {
            totalUsers,
            totalPurchases,
            totalRevenue: revenueData._sum.amount || 0,
            pendingInquiries
        };

        return new Response(JSON.stringify(stats), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return new Response(JSON.stringify({ 
            error: "Internal Server Error",
            details: error.message 
        }), { status: 500 });
    }
}