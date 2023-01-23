import React from "react";

const Person = ({ person, onDelete }) => {
  const handleDelete = (entry) => {
    if (window.confirm(`Do you really want to delete ${entry.name}?`)) {
      onDelete(entry.id);
    }
  };
  return (
    <div>
      {person.name} {person.number}{" "}
      <button key={person.id} onClick={() => handleDelete(person)}>
        delete
      </button>
    </div>
  );
};

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Persons;
