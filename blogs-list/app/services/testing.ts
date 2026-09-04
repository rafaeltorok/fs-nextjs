import { db } from "@/db";
import { users } from "@/db/schema";
import { blogs } from "@/db/schema";
import { readingList } from "@/db/schema";

export async function clearTables() {
  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);
}
