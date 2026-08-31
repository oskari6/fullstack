import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = getBlogs();

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : blogs;

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs" method="get">
        <input name="filter" placeholder="search" defaultValue={filter ?? ""} />
        <button type="submit">search</button>
      </form>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id} style={{ gap: 5, display: "flex" }}>
            <Link href={`/blogs/${blog.id}`}>
              <span>{blog.title}</span>
            </Link>
            <span>{blog.author}</span>
            <span>{blog.url}</span>
            <span>{blog.likes} likes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;
