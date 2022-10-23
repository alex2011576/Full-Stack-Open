import React from "react";
import { useState } from "react";

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

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="flag" />
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
