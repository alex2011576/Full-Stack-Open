import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import contactService from "./services/contacts";
import "./index.css";

const Notification = ({ message }) => {
  let notificationColor = {
    color: "red",
  };

  if (message === null) {
    return null;
  } else if (message.hasOwnProperty("type") && message.type === "success") {
    notificationColor = {
      color: "green",
    };
  }

  return (
    <div className="alert" style={notificationColor}>
      {message.content}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setPersons(initialContacts);
      })
      .catch((error) => {
        if (notification !== null) {
          clearTimeout(notification.timeout);
        }
        setNotification({
          type: "error",
          content: `Connection to the phonebook has failed`,
          timeout: setTimeout(() => {
            setNotification(null);
          }, 5000),
        });
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const duplicate = persons.find(
        (person) => person.name === newName.trim()
      );
      if (
        window.confirm(
          `${duplicate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...duplicate, number: newNumber };
        contactService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            if (notification !== null) {
              clearTimeout(notification.timeout);
            }
            setNotification({
              type: "success",
              content: `Information about ${returnedPerson.name} was successfully updated`,
              timeout: setTimeout(() => {
                setNotification(null);
              }, 5000),
            });
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            // alert(`${duplicate.name} was already deleted from server`);
            setPersons(persons.filter((p) => p.id !== duplicate.id));
            if (notification !== null) {
              clearTimeout(notification.timeout);
            }
            setNotification({
              type: "error",
              content: `${duplicate.name} was already deleted from server or connection failed`,
              timeout: setTimeout(() => {
                setNotification(null);
              }, 5000),
            });
            console.log(error);
          });
      }
    } else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
      };
      contactService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          if (notification !== null) {
            clearTimeout(notification.timeout);
          }
          setNotification({
            type: "success",
            content: `Added ${returnedPerson.name}`,
            timeout: setTimeout(() => {
              setNotification(null);
            }, 5000),
          });
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          // alert(`failed to add ${newPerson.name} to the phonebook`);
          if (notification !== null) {
            clearTimeout(notification.timeout);
          }
          setNotification({
            type: "error",
            content: `Failed to add ${newPerson.name} to the phonebook`,
            timeout: setTimeout(() => {
              setNotification(null);
            }, 5000),
          });
          console.log(error);
        });
    }
  };

  const deletePerson = (id) => {
    contactService
      .deleteObject(id)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
        if (notification !== null) {
          clearTimeout(notification.timeout);
        }
        setNotification({
          type: "success",
          content: `Deletion succeded`,
          timeout: setTimeout(() => {
            setNotification(null);
          }, 5000),
        });
      })
      .catch((error) => {
        setPersons(persons.filter((p) => p.id !== id));
        if (notification !== null) {
          clearTimeout(notification.timeout);
        }
        setNotification({
          type: "error",
          content: `Deletion failed, it is better to reload this page!`,
          timeout: setTimeout(() => {
            setNotification(null);
          }, 5000),
        });
        console.log(error);
      });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
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
