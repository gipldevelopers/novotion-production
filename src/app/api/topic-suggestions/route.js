import prisma from "@/lib/prisma";

// POST - Create a topic suggestion (public)
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !topic) {
      return new Response(
        JSON.stringify({ error: "Name, email, and topic are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const suggestion = await prisma.topicSuggestion.create({
      data: {
        name,
        email,
        topic,
        message: message || null,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Topic suggestion submitted successfully!",
        id: suggestion.id,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Topic suggestion API error:", error);
    return new Response(JSON.stringify({ error: "Failed to submit suggestion" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
