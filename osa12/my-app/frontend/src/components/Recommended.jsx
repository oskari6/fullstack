import { useQuery } from "@apollo/client/react";
import { RECOMMENDED_BOOKS } from "./queries";

const Recommended = ({ show, favoriteGenre }) => {
  const result = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre: favoriteGenre },
  });
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const allBooks = result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
