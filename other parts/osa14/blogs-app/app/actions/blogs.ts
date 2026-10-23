"use server";

import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";

type FormState = {
  error: string;
  success: boolean;
  title: string;
  author: string;
  url: string;
};

export const createBlog = async (prevState: FormState, formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const values = { title, author, url };

  if (!title || title.length < 5) {
    return {
      ...values,
      error: "Blog title must be defined and at least 5 characters long",
      success: false,
    };
  }
  if (!author || author.length < 5) {
    return {
      ...values,
      error: "Blog author must be defined and at least 5 characters long",
      success: false,
    };
  }
  if (!url || url.length < 5) {
    return {
      ...values,
      error: "Blog url must be defined and at least 5 characters long",
      success: false,
    };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return {
    title: "",
    author: "",
    url: "",
    error: "",
    success: true,
  };
};

export const updateBlog = async (id: number) => {
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
