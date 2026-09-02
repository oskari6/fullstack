import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NewBlogForm } from "./NewBlogForm";

const NewBlog = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <NewBlogForm />
    </div>
  );
};

export default NewBlog;
