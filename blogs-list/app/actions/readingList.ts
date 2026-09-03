"use server";

import { revalidatePath } from "next/cache";
import { markAsRead, addBlogToReadingList } from "../services/readingList";

export async function updateReadStatus(formData: FormData) {
  const blogId = Number(formData.get("blog_id"));
  await markAsRead(blogId);
  revalidatePath("/me");
}

export async function addToUserReadingList(formData: FormData) {
  const blogId = Number(formData.get("blog_id"));
  await addBlogToReadingList(blogId);
  revalidatePath(`/blogs/${blogId}`);
}
