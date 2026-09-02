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
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
      <div className="p-2 rounded shadow-sm bg-gray-100 max-w-xs">
        <p>
          <span className="font-semibold">Author: </span>
          <span className="inline-block max-w-xs truncate align-bottom">
            {blog.author}
          </span>{" "}
        </p>
        <p>
          <span className="font-semibold">Url: </span>
          <span className="inline-block max-w-xs truncate align-bottom">
            {blog.url}
          </span>
        </p>
        <p>
          <span className="font-semibold">Likes: </span>
          <span className="inline-block max-w-xs truncate align-bottom">
            {blog.likes}
          </span>
        </p>
      </div>
      <form className="p-2" action={updateBlogWithId}>
        <button className="bg-red-200 rounded px-2" type="submit">
          like
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
