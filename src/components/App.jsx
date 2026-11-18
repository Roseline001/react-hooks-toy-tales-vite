import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys when the page first loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to get toys");
        }
        return r.json();
      })
      .then(setToys)
      .catch((error) => console.log(error.message));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add a newly created toy to state
  const addToy = (newToy) =>
    setToys((previousToys) => [...previousToys, newToy]);

  // Replace the updated toy in state, keeping the same order
  const updateToy = (updatedToy) =>
    setToys((previousToys) =>
      previousToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );

  // Remove a donated toy from state
  const deleteToy = (deletedToyId) =>
    setToys((previousToys) =>
      previousToys.filter((toy) => toy.id !== deletedToyId)
    );

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} updateToy={updateToy} deleteToy={deleteToy} />
    </>
  );
}

export default App;
