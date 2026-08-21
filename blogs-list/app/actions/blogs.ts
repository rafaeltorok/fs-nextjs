"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

interface Errors {
  title?: string;
  author?: string;
  url?: string;
  year?: string;
}

interface Values {
  title?: string;
  author?: string;
  url?: string;
  year?: string;
}

export async function createBlog(
  prevState: { errors: Errors, values?: Values },
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const year = formData.get("year") as string;

  const errors: Errors = {};

  // Validate the Title field
  if (title?.trim().length < 5) {
    errors.title = "The blog title must be at least 5 characters long";
  }

  // Validate the Author field
  if (author?.trim().length < 5) {
    errors.author = "The author's name must be at least 5 characters long";
  }

  // Validate the URL field
  if (url?.trim().length < 5) {
    errors.url = "The URL must be at least 5 characters long";
  }

  // Validate the Year field
  if (Number(year) < 1 || Number(year) > new Date().getFullYear()) {
    errors.year = "Invalid year";
  }

  // Check if any of the error fields contains a value on it
  if (Object.values(errors).some(val => val !== null && val !== undefined && val !== "")) {
    return { errors, values: { title, author, url, year }};
  }

  // If there are no errors, proceed to add the new object to the database
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
