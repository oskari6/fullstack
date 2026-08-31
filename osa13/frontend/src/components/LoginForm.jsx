import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../components/Logout";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const resetMsg = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    resetMsg();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setSuccessMessage("Login success");
      navigate("/blogs");
    } catch {
      setErrorMessage("wrong username or password");
    }
  };

  return (
    <>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>

      {loggedInUser ? (
        <div>
          {loggedInUser.name} logged in
          <Logout setUser={setUser} />
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: 150,
              gap: 2,
            }}
          >
            <TextField
              label="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              label="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button style={{ backgroundColor: "blue" }} onClick={handleLogin}>
              login
            </Button>
          </form>
        </>
      )}
    </>
  );
};
