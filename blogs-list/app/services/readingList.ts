import { eq } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export async function getReadingList(id: number) {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, id),
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
