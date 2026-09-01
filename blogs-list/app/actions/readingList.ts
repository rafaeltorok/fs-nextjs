"use server";

import { revalidatePath } from "next/cache";
import { markAsRead, addBlogToReadingList } from "../services/readingList";

export async function updateReadStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  await markAsRead(id);
  revalidatePath("/me");
}

export async function addToUserReadingList(formData: FormData) {
  const userId = Number(formData.get("user_id"));
  const blogId = Number(formData.get("blog_id"));
  await addBlogToReadingList(userId, blogId);
  revalidatePath(`/blogs/${blogId}`);
}
