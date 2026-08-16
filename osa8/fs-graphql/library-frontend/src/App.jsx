import { useApolloClient } from "@apollo/client/react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";

const App = () => {
  const client = useApolloClient();

  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const favoriteGenre = localStorage.getItem("favorite-genre");

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={onLogout}>logout</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
          </>
        )}
      </div>

      <LoginForm
        setPage={setPage}
        show={page === "login"}
        setToken={setToken}
      />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add" && token} />

      <Recommended
        show={page === "recommended" && token}
        favoriteGenre={favoriteGenre}
      />
    </div>
  );
};

export default App;
