import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
const initialState = {
  title: "",
  author: "",
  url: "",
};

export const BlogForm = ({ onCreate }) => {
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
      const createdBlog = await blogService.create(formData);
      setFormVisible(false);
      setFormData(initialState);
      navigate("/blogs");
      onCreate(createdBlog);
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
          <TextField
            label="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          <TextField
            label="author"
            value={formData.author}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                author: e.target.value,
              }))
            }
          />
          <TextField
            label="url"
            value={formData.url}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
          />
          <Button
            onClick={handleCreateBlog}
            variant="contained"
            style={{ marginTop: 10 }}
          >
            create
          </Button>
          <Button onClick={() => setFormVisible(false)} type="button">
            cancel
          </Button>
        </form>
      ) : (
        <Button type="button" onClick={() => setFormVisible(true)}>
          create new blog
        </Button>
      )}
    </>
  );
};
