// Next Server
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/app/services/users";

// Services
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
  const { title, author, url, year } = body;

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

  // // Validate the Year field
  if (
    !year ||
    isNaN(Number(year)) ||
    Number(year) < 1 ||
    Number(year) > new Date().getFullYear()
  ) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  await addBlog(title, author, url, year, Number(userId.id));
  revalidatePath("/blogs");
  return NextResponse.json({ success: true }, { status: 201 });
};
