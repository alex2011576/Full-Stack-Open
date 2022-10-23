import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCountries from "./components/DisplayCountries";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onFilterChange = (e) => {
    setNewFilter(e.target.value);
  };
  const countriesToShow = countries.filter((country) =>
    country.name.common.toUpperCase().includes(newFilter.toUpperCase())
  );
  return (
    <div>
      <Filter newFilter={newFilter} onFilterChange={onFilterChange} />
      <DisplayCountries countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
