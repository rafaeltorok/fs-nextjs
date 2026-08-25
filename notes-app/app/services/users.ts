import { db } from "../../db";
import { users } from "../../db/schema";
import { auth } from "../auth";

import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithNotes = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { notes: true },
  });
};

export const getUserToken = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      token: true,
    },
  });
};
