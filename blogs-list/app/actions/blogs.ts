"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const year = formData.get("year") as string

  addBlog(title, author, url, year)
  revalidatePath("/blogs");
  redirect("/blogs")
}
