"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Errors {
  username?: string;
  name?: string;
  password?: string;
}

interface Values {
  username?: string;
  name?: string;
  password?: string;
}

export const registerUser = async (
  prevState: { errors: Errors, values?: Values },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("password-confirm") as string;

  const errors: Errors = {};

  // Validate the Username field
  if (username?.trim().length < 4) {
    errors.username = "The username must be at least 4 characters long";
  }

  // Verify if the username has already been taken
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    errors.username = "Username already exists on the database";
  }

  // Validate the name field
  if (name?.trim().length < 4) {
    errors.name = "The name must be at least 4 characters long";
  }

  // Validate the password field
  if (password?.trim().length < 4) {
    errors.password = "The password must be at least 4 characters long";
  }

  // Verify if the password confirmation matches the password field
  if (password !== confirmPassword) {
    errors.password = "Passwords do not match";
  }

  // Check if any of the error fields contains a value on it
  if (Object.values(errors).some(val => val !== null && val !== undefined && val !== "")) {
    return { errors, values: { username, name, password } };
  }

  // If there are no errors, proceed to add the new user into the database
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
  redirect("/login");
}
