import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

interface Props {
  blogs: Blog[];
  filter: string;
}

export default function BlogsClient({ blogs, filter }: Props) {
  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : blogs;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action="/blogs" method="get" className="mb-4">
        <input
          className="bg-gray-200 border-1"
          data-testid="filter-input"
          name="filter"
          placeholder="search"
          defaultValue={filter ?? ""}
        />
        <button
          className="bg-red-200 rounded p-2"
          data-testid="search-button"
          type="submit"
        >
          search
        </button>
      </form>
      <ul data-testid="blogs-list" className="space-y-2">
        {filteredBlogs.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-3 hover:bg-gray-50 flex gap-2"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
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
}
