const Countries = ({ countries, onSelect }) => {
  return (
    <>
      {countries.map((country) => (
        <p key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={onSelect}>Show</button>
        </p>
      ))}
    </>
  );
};

export default Countries;
