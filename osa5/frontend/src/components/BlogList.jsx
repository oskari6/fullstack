import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const sortByLikes = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortByLikes(blogs)));
  }, []);
  return (
    <>
      <h2>blogs</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </div>
    </>
  );
};
