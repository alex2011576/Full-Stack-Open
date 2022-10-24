import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setPersons(initialContacts);
      })
      .catch((error) => {
        alert(`failed to connect to the phonebook`);
        console.log(error);
      });
  }, []);
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

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
      contactService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(`failed to add ${newPerson.name} to the phonebook`);
          console.log(error);
        });
    }
  };

  const deletePerson = (id) => {
    contactService
      .deleteObject(id)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        alert(`Deletion failed`);
        console.log(error);
      });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        NameHandler={handleNameChange}
        NumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
