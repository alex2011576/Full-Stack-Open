import { useState } from "react";

const Person = ({ person }) => {
  return <div>{person.name}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "") {
      alert("Please, enter the name");
      return;
    }
    const duplicates = persons.filter(
      (person) => person.name === newName.trim()
    );
    if (duplicates.length) {
      alert(`${newName.trim()} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName.trim() }));
      setNewName("");
    }
  };

  const handleBookChange = (event) => {
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleBookChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
