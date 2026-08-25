import { useEffect, useState } from "react";
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPersons().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicates = persons.filter((p) => p.name === newName);
    try {
      if (
        duplicates.length &&
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        updatePerson(duplicates[0].id, newPerson).then((data) => {
          setPersons(
            persons.map((p) => (p.id !== duplicates[0].id ? p : data)),
          );
        });
      } else {
        createPerson(newPerson).then((data) => {
          setPersons([...persons, { name: data.name, number: data.number }]);
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleDelete = (e, person) => {
    e.preventDefault();
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id);
      setPersons(persons.filter((p) => p.id != person.id));
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        {error && (
          <p
            stlyle={{
              padding: "10px",
              border: "#ff0000",
              borderWidth: "3px",
              borderRadius: "rounded",
            }}
          >
            {error}
          </p>
        )}
        <span>filter shown with</span>
        <Filter value={search} onChange={(e) => setSearch(e.target.value)} />
        <h1>add a new</h1>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          onNameChange={(e) => setNewName(e.target.value)}
          onNumberChange={(e) => setNewNumber(e.target.value)}
          handleSubmit={handleSubmit}
        />

        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default App;
