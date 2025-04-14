import React, { useState } from "react";
import "./Create.css";
import { supabase } from "../../client.js";

const Create = () => {
  const [brainrotValue, setBrainrotValue] = useState(50);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [name, setName] = useState("");
  const randomId = Math.floor(Math.random() * 1000000000);

  async function addMember() {
    if (!name || name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    if (!selectedAnimal) {
      alert("Please select a spirit animal");
      return;
    }

    const currentTimestamp = new Date().toISOString();

    const { data, error } = await supabase
      .from("Users")
      .insert([
        {
          id: randomId,
          name: name,
          brainrotted: brainrotValue,
          animal: animals[selectedAnimal].image,
          catchphrase: catchphrase,
          created_at: currentTimestamp,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding member:", error);
    } else {
      console.log("Member added:", data);
      alert("Member added successfully!");
      setName("");
      setSelectedAnimal("");
      setCatchphrase("");
      setBrainrotValue(50);
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const animals = {
    bombadiro_crocodilo: {
      name: "Bombadiro Crocodilo",
      image: "https://i.ibb.co/V0ttQ051/bombardino.webp",
    },
    brr_brr_patapim: {
      name: "Brr Brr Patapim",
      image: "https://i.ibb.co/Hf7ZGTxy/brrbrr.webp",
    },
    tung_tung_tung_tung_sahur: {
      name: "Tung Tung Tung Tung Sahur",
      image: "https://i.ibb.co/TDy7tHdn/tungtungtung.webp",
    },
    boneca_ambalabu: {
      name: "Boneca Ambalabu",
      image: "https://i.ibb.co/bMdsLbZ8/boneca.jpg",
    },
    trallalero_trallala: {
      name: "Trallalero Trallala",
      image: "https://i.ibb.co/Pz5mQZYg/tralalero.webp",
    },
    cappuccino_assassino: {
      name: "Cappuccino Assassino",
      image: "https://i.ibb.co/27jT4bNK/cappuccino.webp",
    },
    chimpanzini_bananini: {
      name: "Chimpanzini Bananini",
      image: "https://i.ibb.co/QvvhR8v7/chimpanzini.webp",
    },
    lirili_larila: {
      name: "Lirili Larila",
      image: "https://i.ibb.co/0g1kRH0/lirili.webp",
    },
    tripi_tropi: {
      name: "Tripi Tropi",
      image: "https://i.ibb.co/Mk6DLWM4/tripi.webp",
    },
    bobrito_bandito: {
      name: "Bobrito Bandito",
      image: "https://i.ibb.co/DgzWMCcs/bomborito.webp",
    },
  };

  const handleBrainrotChange = (e) => {
    setBrainrotValue(e.target.value);
  };

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
  };

  const handleCatchphraseChange = (e) => {
    setCatchphrase(e.target.value);
  };

  return (
    <div className="create-container">
      <h1>Add a new squad member!</h1>

      <div className="form-container">
        <div className="box">
          <h3>Name:</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter member's name"
            value={name}
            onChange={handleNameChange}
            required
          ></input>
        </div>

        <div className="box">
          <h3>Brainrot: {brainrotValue}%</h3>
          <input
            type="range"
            name="brainrot"
            min="0"
            max="100"
            value={brainrotValue}
            onChange={handleBrainrotChange}
          ></input>
        </div>

        <div className="box">
          <h3>Spirit Animal:</h3>
          <select
            name="animal"
            id="animals"
            value={selectedAnimal}
            onChange={handleAnimalChange}
            required
          >
            <option value="">Select an animal</option>
            {Object.entries(animals).map(([key, animal]) => (
              <option key={key} value={key}>
                {animal.name}
              </option>
            ))}
          </select>
        </div>

        <div className="box">
          <h3>Catchphrase:</h3>
          <input
            type="text"
            name="catchphrase"
            placeholder="Enter a signature catchphrase"
            value={catchphrase}
            onChange={handleCatchphraseChange}
          ></input>
        </div>

        {selectedAnimal && (
          <div className="box preview-box">
            <h3>Preview:</h3>
            <img
              src={animals[selectedAnimal].image}
              alt={animals[selectedAnimal].name}
              className="animal-preview"
            />
            {catchphrase && (
              <div className="catchphrase-preview">
                <p>"{catchphrase}"</p>
              </div>
            )}
          </div>
        )}

        <button className="submit-btn" onClick={addMember}>
          Add Member
        </button>
      </div>
    </div>
  );
};

export default Create;
