import { db } from "@/db";
import { readingListEntries } from "@/db/schema";
import { eq } from "drizzle-orm";

export const addBlogToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingListEntries).values({ userId, blogId }).returning();
};

export const markReadingListEntryAsRead = async (entryId: number) => {
  const entry = await db.query.readingListEntries.findFirst({
    where: eq(readingListEntries.id, entryId),
  });
  if (entry) {
    await db
      .update(readingListEntries)
      .set({ read: true })
      .where(eq(readingListEntries.id, entryId));
  }
};
