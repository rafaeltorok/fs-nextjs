"use server";

// Next.js
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Services
import { addBlog, likeBlog } from "../services/blogs";
import { addBlogToReadingList } from "../services/readingList";

import { auth } from "../auth";

// TypeScript types
interface Notifications {
  errors: {
    title?: string;
    author?: string;
    url?: string;
    year?: string;
  };
  success: boolean;
}

interface Values {
  title?: string;
  author?: string;
  url?: string;
  year?: string;
}

export async function createBlog(
  prevState: { notifications: Notifications; values?: Values },
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

  const notifications: Notifications = {
    errors: {},
    success: false,
  };

  // Validate the Title field
  if (title?.trim().length < 5) {
    notifications.errors.title =
      "The blog title must be at least 5 characters long";
    notifications.success = false;
  }

  // Validate the Author field
  if (author?.trim().length < 5) {
    notifications.errors.author =
      "The author's name must be at least 5 characters long";
    notifications.success = false;
  }

  // Validate the URL field
  if (url?.trim().length < 5) {
    notifications.errors.url = "The URL must be at least 5 characters long";
    notifications.success = false;
  }

  // Validate the Year field
  if (Number(year) < 1 || Number(year) > new Date().getFullYear()) {
    notifications.errors.year = "Invalid year";
    notifications.success = false;
  }

  // Check if any of the error fields contains a value on it
  if (
    Object.values(notifications.errors).some(
      (val) => val !== null && val !== undefined && val !== "",
    )
  ) {
    return { notifications, values: { title, author, url, year } };
  }

  // If there are no errors, proceed to add the new object to the database
  const newBlog = await addBlog(title, author, url, year, Number(session.user?.id));
  revalidatePath("/blogs");

  // Include the newly added blog on the user's reading list
  await addBlogToReadingList(Number(session.user?.id), Number(newBlog[0].id));

  // Confirm on the notification that the new blog was successfully added
  return {
    notifications: {
      errors: { title: "", author: "", url: "", year: "" },
      success: true,
    },
  };
}

export async function updateLikeCounter(formData: FormData) {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
}
