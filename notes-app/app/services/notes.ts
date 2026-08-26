import { db } from "../../db";
import { notes } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getNotes = (importantOnly: boolean) => {
  if (importantOnly) {
    return db.query.notes.findMany({
      where: eq(notes.important, true),
    });
  }

  return db.query.notes.findMany();
};

export const getNoteById = (id: number) => {
  return db.query.notes.findFirst({
    where: eq(notes.id, id),
  });
};

export const addNote = async (
  content: string,
  important: boolean,
  userId: number,
) => {
  await db.insert(notes).values({ content, important, userId: userId });
};

export const toggleImportance = async (id: number) => {
  const note = await getNoteById(id);
  if (note) {
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id));
  }
};
