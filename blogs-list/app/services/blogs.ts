import { eq, ilike } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export async function getBlogs(filter: string) {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
    });
  }
  return db.query.blogs.findMany();
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
  userId: number,
) {
  const newBlog = await db.insert(blogs).values({
    title,
    author,
    url,
    year: Number(year),
    likes: 0,
    userId: userId,
  }).returning();

  return newBlog;
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
