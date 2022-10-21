import { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [newFilter, setNewFilter] = useState("");
  const handleInputChange = (event) => {
    setNewFilter(event.target.value);
    onFilterChange(event.target.value);
  };
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleInputChange} />
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Please, enter the name and number");
      return;
    }

    const nameDuplicates = persons.some(
      (person) => person.name === newName.trim()
    );

    if (nameDuplicates) {
      alert(`${newName.trim()} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (value) => {
    setNewFilter(value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
