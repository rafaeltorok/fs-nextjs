"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { auth } from "../auth";

export const registerUser = async (formData: FormData) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = Number(session.user?.id);
  const token = randomUUID();
  
  await db.update(users).set({ token: token }).where(eq(users.id, id));
}
