import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export async function getReadingList(id: number) {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, id),
  });
}

export async function getReadingListEntry(userId: number, blogId: number) {
  return db
    .select()
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .limit(1);
}

export async function addBlogToReadingList(userId: number, blogId: number) {
  await db.insert(readingList).values({
    userId,
    blogId,
  });
}

export async function markAsRead(id: number) {
  const entryToUpdate = await getReadingList(id);

  if (entryToUpdate) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(eq(readingList.id, id));
  }
}
