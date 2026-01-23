import prisma from "@/lib/prisma";

// GET - Get all blogs (public)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured");

    const where = {};
    
    if (category && category !== "All") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { subCategory: { contains: search, mode: "insensitive" } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    const blogs = await prisma.blog.findMany({
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
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });

    // Format blogs to match frontend structure
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: blog.readTime || "5 min read",
      category: blog.category,
      subCategory: blog.subCategory,
      views: blog.views > 1000 ? `${(blog.views / 1000).toFixed(1)}K` : blog.views.toString(),
      likes: blog.likes,
      comments: blog.comments,
      featured: blog.featured,
      tags: blog.tags,
      author: {
        name: blog.authorName || blog.createdBy?.name || "Admin",
        role: blog.authorRole || "Content Writer",
      },
      imageUrl: blog.imageUrl,
    }));

    return new Response(JSON.stringify({ blogs: formattedBlogs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Blogs API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
