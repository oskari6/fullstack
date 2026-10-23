import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import Notify from "./Notify";
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const token = localStorage.getItem("user-token");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.editAuthor),
        };
      });
    },
  });

  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await editAuthor({ variables: { name, setBornTo: birthyear } });
    } catch (error) {
      setError(error.message);
      return;
    }

    setName("");
    setBirthyear("");
  };

  return (
    <div>
      <Notify errorMessage={error} />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "150px" }}
        >
          <h2>Set birthyear</h2>
          <label>
            name
            <select
              name="name"
              onChange={({ target }) => setName(target.value)}
              value={name}
            >
              <option value="">Select author</option>
              {result.data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            born
            <input
              type="number"
              value={birthyear}
              onChange={({ target }) => setBirthyear(Number(target.value))}
            />
          </label>
          <button onClick={submit} type="button">
            update author
          </button>
        </div>
      )}
    </div>
  );
};

export default Authors;
