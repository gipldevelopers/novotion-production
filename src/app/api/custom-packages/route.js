import prisma from "@/lib/prisma";

// GET - Fetch all custom packages (public)
export async function GET(req) {
  try {
    const packages = await prisma.customPackage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(packages);
  } catch (error) {
    console.error("Error fetching custom packages:", error);
    return Response.json(
      { error: "Failed to fetch custom packages" },
      { status: 500 }
    );
  }
}
