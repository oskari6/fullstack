import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";

const initialState = {
  title: "",
  author: "",
  url: "",
};

export const BlogForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [formVisible, setFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const resetMsg = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const navigate = useNavigate();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    resetMsg();
    try {
      await blogService.create(formData);
      setFormVisible(false);
      setFormData(initialState);
      navigate("/blogs");
    } catch {
      setErrorMessage("creating blog failed");
    }
  };

  return (
    <>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>
      <h2>Create new</h2>

      {formVisible ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
            gap: 2,
          }}
        >
          <label
            style={{
              display: "flex",
            }}
          >
            title
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </label>
          <label
            style={{
              display: "flex",
            }}
          >
            author
            <input
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
            />
          </label>
          <label
            style={{
              display: "flex",
            }}
          >
            url
            <input
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
            />
          </label>
          <button onClick={handleCreateBlog}>create</button>
          <button onClick={() => setFormVisible(false)} type="button">
            cancel
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setFormVisible(true)}>
          create new blog
        </button>
      )}
    </>
  );
};
