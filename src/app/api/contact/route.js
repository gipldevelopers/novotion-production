import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { fullName, email, phone, company, userType, message } = body;

        if (!fullName || !email || !message) {
            return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const contactEntry = await prisma.contactMessage.create({
            data: {
                fullName,
                email,
                phone,
                company,
                userType,
                message,
            },
        });

        return new Response(JSON.stringify({ message: "Inquiry sent successfully!", id: contactEntry.id }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Contact API error:", error);
        return new Response(JSON.stringify({ error: "Failed to send message" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
