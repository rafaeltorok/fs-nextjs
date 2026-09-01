import { eq } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export async function getReadingList(id: number) {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, id),
  });
}
