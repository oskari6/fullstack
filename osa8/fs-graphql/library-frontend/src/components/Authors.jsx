import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: birthyear } });

    setName("");
    setBirthyear("");
  };

  return (
    <div>
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
      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <h2>Set birthyear</h2>
        <label>
          name
          <select onChange={({ target }) => setName(target.value)} value={name}>
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
    </div>
  );
};

export default Authors;
