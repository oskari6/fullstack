import { notFound } from "next/navigation";
import { updateBlog } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const updateBlogWithId = updateBlog.bind(null, Number(id));

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <form action={updateBlogWithId}>
        <button type="submit">like</button>
      </form>
    </div>
  );
};

export default BlogPage;
