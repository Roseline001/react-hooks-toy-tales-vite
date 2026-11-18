import React, { useState } from "react";

function ToyForm({ addToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (event) => {
    setFormData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));
  };

  // POST: create a new toy that starts with 0 likes
  const handleSubmit = (event) => {
    event.preventDefault();
    const newToy = {
      ...formData,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to create toy");
        }
        return r.json();
      })
      .then((createdToy) => {
        addToy(createdToy);
        setFormData({ name: "", image: "" });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
