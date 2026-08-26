import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "@/db/schema";

export async function getUsers() {
  return db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.id)],
  });
}

export async function getUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: {
        orderBy: (blogs, { desc }) => [desc(blogs.likes)],
      },
    },
  });
}

export const getUserToken = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      token: true,
    },
  });
};

export const getUserId = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
    },
  });
};
