import { notFound } from "next/navigation";
import { updateBlog } from "../../actions/blogs";
import { addToReadingList } from "../../actions/readingList";
import { getBlogById } from "../../services/blogs";
import { getCurrentUser } from "../../services/session";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const user = await getCurrentUser();

  if (!blog) {
    notFound();
  }

  const updateBlogWithId = updateBlog.bind(null, Number(id));
  const updateReadingList = user
    ? addToReadingList.bind(null, user.id, Number(id))
    : undefined;

  const selfAdded = user && user.id === blog.userId;
  const inReadingList =
    !selfAdded &&
    user?.readingListEntries.some((rle) => rle.blogId === blog.id);

  return (
    <div data-testid="blog-detail" className="p-4">
      <h2 data-testid="blog-title" className="font-bold text-xl mb-2">
        {blog.title}
      </h2>
      <div className="p-2 rounded shadow-sm bg-gray-100 max-w-xs">
        <p>
          <span className="font-semibold">Author: </span>
          <span
            data-testid="blog-author"
            className="inline-block max-w-xs truncate align-bottom"
          >
            {blog.author}
          </span>
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
      {user && !selfAdded && !inReadingList && (
        <form className="p-2" action={updateReadingList}>
          <button
            data-testid="add-to-reading-list-button"
            className="bg-green-200 rounded px-2"
            type="submit"
          >
            add to reading list
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogPage;
