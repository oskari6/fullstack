const Persons = ({ filteredPersons, onDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={(e) => onDelete(e, person)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
