import { db } from "../../db";
import { users } from "../../db/schema";

import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.id)],
  });
};

export const getUserWithNotes = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      notes: {
        orderBy: (notes, { asc }) => [asc(notes.id)],
      },
    },
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

export const getUserId = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
    },
  });
};
