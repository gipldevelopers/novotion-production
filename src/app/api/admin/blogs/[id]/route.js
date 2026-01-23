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

// GET - Get a single blog
export async function GET(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
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

    return new Response(JSON.stringify({ blog }), {
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

// PUT - Update a blog
export async function PUT(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await params;
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

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return new Response(JSON.stringify({ error: "Blog with this slug already exists" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;
    if (featured !== undefined) updateData.featured = featured;
    if (readTime !== undefined) updateData.readTime = readTime;
    if (tags !== undefined) updateData.tags = tags;
    if (authorName !== undefined) updateData.authorName = authorName;
    if (authorRole !== undefined) updateData.authorRole = authorRole;
    if (authorBio !== undefined) updateData.authorBio = authorBio;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData,
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
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return new Response(JSON.stringify({ error: "Failed to update blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE - Delete a blog
export async function DELETE(req, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.blog.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Blog deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
