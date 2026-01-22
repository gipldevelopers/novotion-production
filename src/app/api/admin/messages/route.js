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
        const status = searchParams.get("status") || "UNRESOLVED"; // Default to unsolved (NEW or IN_PROGRESS)
        const search = searchParams.get("search") || "";
        const skip = (page - 1) * limit;

        const where = {};

        // Handling "UNRESOLVED" special status to show both NEW and IN_PROGRESS
        if (status === "UNRESOLVED") {
            where.status = { in: ["NEW", "IN_PROGRESS"] };
        } else if (status) {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { message: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [messages, total] = await Promise.all([
            prisma.contactMessage.findMany({
                where,
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: limit
            }),
            prisma.contactMessage.count({ where })
        ]);

        // Get counts for dashboard
        const [totalNew, totalInProgress] = await Promise.all([
            prisma.contactMessage.count({ where: { status: "NEW" } }),
            prisma.contactMessage.count({ where: { status: "IN_PROGRESS" } })
        ]);

        return new Response(JSON.stringify({
            messages,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            stats: {
                newCount: totalNew,
                inProgressCount: totalInProgress,
                unresolvedTotal: totalNew + totalInProgress
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Fetch messages error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
