import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const generateUserToken = async (id: number, token: string) => {
  const user = await getUserById(id);
  if (user) {
    await db.update(users).set({ token }).where(eq(users.id, id));
  }
};
