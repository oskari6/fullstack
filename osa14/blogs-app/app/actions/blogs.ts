"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const updateBlog = async (id: number) => {
  likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
