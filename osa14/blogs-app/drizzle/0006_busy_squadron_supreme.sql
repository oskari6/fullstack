CREATE TABLE "reading_list_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text NOT NULL,
	"blog_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_list_entries" ADD CONSTRAINT "reading_list_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_list_entries" ADD CONSTRAINT "reading_list_entries_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;