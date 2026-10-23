import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Notify from "./Notify";
import { LOGIN } from "./queries";

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      localStorage.setItem("favorite-genre", data.login.favoriteGenre);
    },
    onError: (error) => {
      setError("login failed " + error.message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login({ variables: { username, password } });
    } catch (error) {
      setError("login failed " + error.message);
      return;
    }
    setUsername("");
    setPassword("");
    setPage("authors");
  };

  if (!show) {
    return null;
  }
  return (
    <>
      <Notify errorMessage={error} />
      <h2>Login</h2>
      <div>
        <form onSubmit={submit}>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          <button type="submit">login</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
