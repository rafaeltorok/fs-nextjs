"use server";

import { revalidatePath } from "next/cache";
import { markAsRead } from "../services/readingList";

export async function updateReadStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  await markAsRead(id);
  revalidatePath("/me");
}
