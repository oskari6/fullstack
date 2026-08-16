import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Notify from "./Notify";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "./queries";

const NewBook = (props) => {
  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addBook),
        };
      });
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
    },
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await createBook({ variables: { title, author, published, genres } });
    } catch (error) {
      setError(error.message);
      return;
    }
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <Notify errorMessage={error} />
      <form onSubmit={submit}>
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </label>
        <label>
          genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </label>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
