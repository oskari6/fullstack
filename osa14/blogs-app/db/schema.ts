import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("content").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const readingListEntries = pgTable("reading_list_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id),
  read: boolean("read").notNull().default(false),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingListEntries: many(readingListEntries),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingListEntries: many(readingListEntries),
}));

export const readingListEntryRelations = relations(
  readingListEntries,
  ({ one }) => ({
    user: one(users, {
      fields: [readingListEntries.userId],
      references: [users.id],
    }),

    blog: one(blogs, {
      fields: [readingListEntries.blogId],
      references: [blogs.id],
    }),
  }),
);
