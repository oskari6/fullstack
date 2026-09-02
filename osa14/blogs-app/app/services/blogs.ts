import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingListEntries } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const [createdBlog] = await db
    .insert(blogs)
    .values({ title, author, url, userId: user.id })
    .returning();
  await db
    .insert(readingListEntries)
    .values({ userId: user.id, blogId: createdBlog.id });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};
