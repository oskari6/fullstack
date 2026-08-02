import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country) {
      return;
    }
    const apiKey = import.meta.env.VITE_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${apiKey}`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {weather && (
        <div>
          <h2>Weather in {country.name.common}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind {weather.wind.speed}</p>
        </div>
      )}
    </div>
  );
};

export default Country;
