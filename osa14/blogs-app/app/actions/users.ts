"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../../db";
import { users } from "../../db/schema";
import { generateUserToken } from "../services/users";

type FormState = {
  error: string;
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export const registerUser = async (
  prevState: FormState,
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const values = { username, name, password, passwordConfirm };

  if (!username || username.length < 4) {
    return {
      ...values,
      error: "Username must be defined and at least 4 characters long.",
    };
  }
  if (!password || password.length < 4) {
    return {
      ...values,
      error: "Password must be defined and at least 4 characters long.",
    };
  }
  if (password !== passwordConfirm) {
    return {
      ...values,
      error: "Passwords didn't match.",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (existingUser) {
    return {
      ...values,
      error: "User exists already",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async (id: number) => {
  const token = crypto.randomBytes(32).toString("hex");

  await generateUserToken(id, token);
  revalidatePath("/me");
};
