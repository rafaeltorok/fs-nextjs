"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export async function createBlog(formData: FormData) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const year = formData.get("year") as string;

  await addBlog(title, author, url, year);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function updateLikeCounter(formData: FormData) {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
}
