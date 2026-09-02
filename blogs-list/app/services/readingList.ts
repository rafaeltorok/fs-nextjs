import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { auth } from "../auth";

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

export async function markAsRead(blogId: number) {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  // Extract the id value from the currently logged in user
  const userId = Number(session.user.id);
  
  // Confirm the entry exists
  const entryToUpdate = await getReadingListEntry(userId, blogId);

  // Update the entry read status
  if (entryToUpdate.length !== 0) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(eq(readingList.id, entryToUpdate[0].id));
  }
}
