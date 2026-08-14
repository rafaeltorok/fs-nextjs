"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const year = formData.get("year") as string;
  const userId = formData.get("userId") as string;

  await addBlog(title, author, url, year, userId);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function updateLikeCounter(formData: FormData) {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
}
