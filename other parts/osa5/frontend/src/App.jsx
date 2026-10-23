import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Blog } from "./components/Blog";
import { BlogForm } from "./components/BlogForm";
import { BlogList } from "./components/BlogList";
import { Home } from "./components/Home";
import { LoginForm } from "./components/LoginForm";
import { Logout } from "./components/Logout";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const onCreateBlog = (createdBlog) => {
    setNotification({
      text: `Note '${createdBlog.title}' added!`,
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <Container style={{ fontFamily: "Arial, sans-serif" }}>
      <Router>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Blog app</h1>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
            {user && <Logout setUser={setUser} />}
          </Toolbar>
        </AppBar>

        <Notification notification={notification} />

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route
            path="/create"
            element={
              user ? (
                <BlogForm onCreate={() => onCreateBlog} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
