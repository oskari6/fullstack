import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";

export const Blog = () => {
  const id = useParams().id;

  useEffect(() => {
    blogService.getById(id).then((blogData) => {
      setBlog(blogData);
    });
  }, [id]);

  const [blog, setBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const loggedInUserJSON = window.localStorage.getItem("loggedNoteappUser");

  const navigate = useNavigate();

  const handleLikeBlog = async () => {
    resetMsg();
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlog(updatedBlog);
    } catch {
      setErrorMessage("liking blog failed");
    }
  };

  const handleRemoveBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    resetMsg();
    try {
      await blogService.remove(id);
      setSuccessMessage("blog removed successfully");
      navigate("/blogs");
    } catch {
      setErrorMessage("removing blog failed");
    }
  };

  const resetMsg = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  if (!blog) {
    return null;
  }
  console.log(blog.creator);
  const isOwned = loggedInUserJSON
    ? blog.creator?.username === JSON.parse(loggedInUserJSON).username
    : false;

  return (
    <>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>
      <div data-testid="blog" style={{ borderWidth: 1, border: "solid" }}>
        <div style={{ paddingTop: 5, display: "flex", gap: 5 }}>
          <span>{blog.title}</span>
          <span>{blog.author}</span>
          <button onClick={() => setVisible((prev) => !prev)}>
            {visible ? "hide" : "view"}
          </button>
        </div>
        {visible && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{blog.url}</span>
            <span>
              likes {blog.likes}
              {loggedInUserJSON && (
                <button onClick={handleLikeBlog}>like</button>
              )}
            </span>
            <span>{blog.author}</span>
            {isOwned && (
              <button style={{ width: 75 }} onClick={handleRemoveBlog}>
                remove
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
