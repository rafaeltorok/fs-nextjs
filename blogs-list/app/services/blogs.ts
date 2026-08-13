import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export async function getBlogs(filter: string) {
  return db.query.blogs.findMany({
    where: eq(blogs.title, filter)
  });
}

export async function getBlogById(id: number) {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
}

export async function addBlog(
  title: string,
  author: string,
  url: string,
  year: string,
) {
  await db.insert(blogs)
    .values({
      title,
      author,
      url,
      year: Number(year),
      likes: 0,
    });
}

export async function likeBlog(id: number) {
  const blogToUpdate = await getBlogById(id);

  if (blogToUpdate) {
    await db
      .update(blogs)
      .set({ likes: blogToUpdate.likes + 1 })
      .where(eq(blogs.id, id));
  }
}
