import prisma from "@/lib/prisma";

// GET - Get a single blog by slug (public)
export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
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

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Increment views
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    // Format blog to match frontend structure
    const formattedBlog = {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
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
        bio: blog.authorBio,
      },
      imageUrl: blog.imageUrl,
    };

    return new Response(JSON.stringify({ blog: formattedBlog }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get blog error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
