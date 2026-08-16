import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_BOOKS } from "./queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState();
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const allBooks = result.data.allBooks;
  const filteredBooks =
    genre && genre !== "all genres"
      ? allBooks.filter((b) => b.genres.includes(genre))
      : allBooks;
  const genres = allBooks.flatMap((b) => b.genres);
  const uniqueGenres = [...new Set(genres)];

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((g) => (
          <button
            style={g === genre ? { border: "3px solid aqua" } : {}}
            key={g}
            onClick={async () => {
              await result.refetch();
              setGenre(g);
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={async () => {
            await result.refetch();
            setGenre("all genres");
          }}
          style={"all genres" === genre ? { border: "3px solid aqua" } : {}}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
