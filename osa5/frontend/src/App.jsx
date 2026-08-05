import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const initialState = {
  title: "",
  author: "",
  url: "",
};

const App = () => {
  const [formData, setFormData] = useState(initialState);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      resetMsg;
    }, 3000);
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const resetMsg = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>{" "}
    </>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    resetMsg();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccessMessage("Login success");
    } catch {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    resetMsg();
    try {
      const newBlog = await blogService.create(formData);
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setFormData(initialState);
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      );
    } catch {
      setErrorMessage("creating blog failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    resetMsg;
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    setSuccessMessage("Logout successful");
  };

  const blogForm = () => (
    <>
      <h2>Create new</h2>
      <form
        onSubmit={addBlog}
        a
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
        <button type="submit">create</button>
      </form>
    </>
  );

  return (
    <div>
      <h2>blogs</h2>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {!user && loginForm()}
    </div>
  );
};

export default App;
