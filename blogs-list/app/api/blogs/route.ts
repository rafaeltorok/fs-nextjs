// Next Server
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Services
import { getUserId } from "@/app/services/users";
import { getBlogs, addBlog } from "@/app/services/blogs";

export const GET = async () => {
  const blogs = await getBlogs("");
  return NextResponse.json(blogs);
};

export const POST = async (req: NextRequest) => {
  const authToken = req.headers.get("Authorization");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = await getUserId(authToken.substring(7));

  if (!authToken.toLowerCase().includes("bearer") || !userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const body = await req.json();
  const { title, author, url } = body;

  // Validate the Title field
  if (!title || title.length < 5) {
    return NextResponse.json(
      { error: "The blog title must be at least 5 characters long" },
      { status: 400 },
    );
  }

  // Validate the Author field
  if (!author || author.length < 5) {
    return NextResponse.json(
      { error: "The author's name must be at least 5 characters long" },
      { status: 400 },
    );
  }

  // Validate the URL field
  if (!url || url.length < 5) {
    return NextResponse.json(
      { error: "The URL must be at least 5 characters long" },
      { status: 400 },
    );
  }

  await addBlog(title, author, url, Number(userId.id));
  revalidatePath("/blogs");
  return NextResponse.json({ success: true }, { status: 201 });
};
