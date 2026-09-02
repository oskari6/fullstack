import { NextResponse } from "next/server";

import { db } from "@/db";
import { blogs, readingListEntries, users } from "@/db/schema";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  await db.delete(readingListEntries);
  await db.delete(blogs);
  await db.delete(users);

  return NextResponse.json({ message: "ok" });
};
