"use server";

import { revalidatePath } from "next/cache";
import {
  addBlogToReadingList,
  markReadingListEntryAsRead,
} from "../services/readingList";

export const addToReadingList = async (userId: number, blogId: number) => {
  await addBlogToReadingList(userId, blogId);
  revalidatePath(`/blogs/${blogId}`);
};

export const markAsRead = async (entryId: number) => {
  await markReadingListEntryAsRead(entryId);
  revalidatePath("/me");
};
