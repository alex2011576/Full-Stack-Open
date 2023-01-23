import React from "react";

const PersonForm = ({
  addPerson,
  newName,
  NameHandler,
  newNumber,
  NumberHandler,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={NameHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={NumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
