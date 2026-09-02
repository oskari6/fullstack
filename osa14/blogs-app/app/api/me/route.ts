import { getUserWithBlogs } from "@/app/services/users";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authorization.slice(7);

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userWithBlogs = await getUserWithBlogs(user.username);
  return NextResponse.json(userWithBlogs);
};
