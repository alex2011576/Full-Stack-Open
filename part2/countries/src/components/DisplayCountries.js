import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Languages = ({ languages }) => {
  return (
    <>
      <h3>languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </>
  );
};

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city.hasOwnProperty("lat")) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        )
        .then((response) => {
          //   console.log(response.data);
          setWeather(response.data);
        })
        .catch((error) => {
          setError(JSON.stringify(error));
          setWeather([]);
          console.log("Error: ", error);
        });
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setError(JSON.stringify(error));
          console.log("Error: ", error);
        });
    }
  }, [city]);

  if (weather.length !== 0) {
    return (
      <div>
        <h2>Weather in {city.name}</h2>
        <p>temperature {Math.floor(weather.main.temp)} Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`Weather in ${city.name}`}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  } else if (error) {
    return <p>Failed to load weather :(</p>;
  } else {
    return <p>loading weather...</p>;
  }
};

const Country = ({ country }) => {
  let capital = {};

  if (country.capitalInfo.hasOwnProperty("latlng")) {
    capital = {
      name: country.capital,
      lat: country.capitalInfo.latlng[0] ?? "",
      lon: country.capitalInfo.latlng[1] ?? "",
    };
  } else {
    capital = {
      name: country.capital,
    };
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="flag" />
      <Weather city={capital} />
    </div>
  );
};

const CountryName = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowCountry(!showCountry)}>
        {!showCountry ? "show" : "hide"}
      </button>
      {showCountry ? <Country country={country} /> : ""}
    </div>
  );
};

const DisplayCountries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }
  return (
    <>
      {countriesToShow.map((country, index) => (
        <CountryName key={index} country={country} />
      ))}
    </>
  );
};

export default DisplayCountries;
