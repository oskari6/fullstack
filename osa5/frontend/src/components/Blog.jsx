import { Box, Button, Container } from "@mui/material";
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
      <Container data-testid="blog">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 1,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <h2>{blog.title}</h2>
          <span style={{ color: "grey " }}>by {blog.author}</span>
          {visible && (
            <>
              <a href={blog.url}>{blog.url}</a>
              <span style={{ color: "grey" }}>
                Added by {blog.creator.name}
              </span>
              <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {blog.likes} like{blog.likes === 1 ? "" : "s"}
                {loggedInUserJSON && (
                  <Button
                    style={{
                      borderColor: "blue",
                      borderWidth: "0.5px",
                    }}
                    onClick={handleLikeBlog}
                  >
                    like
                  </Button>
                )}
                {isOwned && (
                  <Button
                    style={{
                      color: "red",
                      width: 75,
                      borderColor: "red",
                      borderWidth: "0.5px",
                    }}
                    onClick={handleRemoveBlog}
                  >
                    remove
                  </Button>
                )}
              </span>
            </>
          )}
          <Button
            style={{
              width: 75,
              color: "gray",
              borderWidth: "0.5px",
            }}
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? "hide" : "view"}
          </Button>
        </Box>
      </Container>
    </>
  );
};
