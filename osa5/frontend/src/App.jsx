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
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/login">
          login
        </Link>
        <Link style={padding} to="/create">
          new blog
        </Link>
        {user && <Logout setUser={setUser} />}
      </div>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route
          path="/create"
          element={user ? <BlogForm /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
