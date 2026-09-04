import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

// Route /app/users
export async function getUsers() {
  return db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.id)],
  });
}

// Routes /app/blogs/[id]; GET /api/me
export async function getUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

// Route /app/users
export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      name: true,
      username: true,
    },
    with: {
      blogs: {
        orderBy: (blogs, { desc }) => [desc(blogs.likes)],
      },
    },
  });
}

// Route POST /api/blogs
export async function getUserToken(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      token: true,
    },
  });
}

// Route POST /api/blogs
export async function getUserId(token: string) {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
    },
  });
}

// Route GET /api/me
export async function getUserInfo(username: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: {
        orderBy: (blogs, { desc }) => [desc(blogs.likes)],
        columns: {
          title: true,
          author: true,
          url: true,
        },
      },
    },
  });

  if (result) {
    // Return a custom object format to alias the user's blogs field
    return {
      id: result?.id,
      username: result?.username,
      name: result?.name,
      createdBlogs: result?.blogs,
    };
  }
  return null;
}

// Route POST /api/testing/users
export async function addUser(username: string, name: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning();
  return newUser;
}
