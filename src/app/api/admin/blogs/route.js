import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";
import { cookies } from "next/headers";

// Helper function to verify admin
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyJwt(token);
  if (!payload || !payload.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

// GET - List all blogs with pagination
export async function GET(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured");

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }
    if (featured !== null && featured !== undefined) {
      where.featured = featured === "true";
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return new Response(
      JSON.stringify({
        blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Blogs API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST - Create a new blog
export async function POST(req) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      subCategory,
      featured,
      readTime,
      tags,
      authorName,
      authorRole,
      authorBio,
      imageUrl,
    } = body;

    if (!title || !slug || !excerpt || !content || !category) {
      return new Response(
        JSON.stringify({ error: "Title, slug, excerpt, content, and category are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return new Response(JSON.stringify({ error: "Blog with this slug already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        subCategory: subCategory || null,
        featured: featured || false,
        readTime: readTime || null,
        tags: tags || [],
        authorName: authorName || null,
        authorRole: authorRole || null,
        authorBio: authorBio || null,
        imageUrl: imageUrl || null,
        createdById: admin.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return new Response(JSON.stringify({ blog }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Create blog error:", error);
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
