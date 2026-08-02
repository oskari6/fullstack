import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./Countries";
import Country from "./Country";
import Course from "./Course";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./personService";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
    if (
      duplicates.length &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      updatePerson(duplicates[0].id, newPerson).then((data) => {
        setPersons(persons.map((p) => (p.id !== duplicates[0].id ? p : data)));
      });
    } else {
      createPerson(newPerson).then((data) => {
        setPersons([...persons, { name: data.name, number: data.number }]);
      });
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

  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(""); //name.common

  const filteredCountries =
    countrySearch !== ""
      ? countries.filter((c) =>
          c.name.common.toLowerCase().includes(countrySearch.toLowerCase()),
        )
      : [];

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const country =
    selectedCountry !== ""
      ? countries.find((c) => c.name.common === selectedCountry)
      : filteredCountries[0];

  return (
    <>
      {/*1*/}
      <div>
        {courses.map((course) => (
          <div key={course.name}>
            <Course course={course} />
          </div>
        ))}
      </div>
      {/*2*/}
      ----------------------------------------------------------------------------------------------------------------
      <div>
        <h2>Phonebook</h2>
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
      {/*3*/}
      ----------------------------------------------------------------------------------------------------------------
      <div style={{ paddingTop: "20px" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          <span>find countries</span>
          <input
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setSelectedCountry("");
            }}
          />
        </div>

        <div>
          {filteredCountries.length > 10 ? (
            <p>
              {countrySearch === ""
                ? ""
                : "Too many matches, specify another filter"}
            </p>
          ) : (
            <>
              {country &&
              (selectedCountry || filteredCountries.length === 1) ? (
                <Country country={country} />
              ) : (
                <Countries
                  onSelect={() => setSelectedCountry(country.name.common)}
                  countries={filteredCountries}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
