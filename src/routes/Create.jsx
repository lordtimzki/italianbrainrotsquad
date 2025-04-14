import React, { useState } from 'react'
import './Create.css'
import { supabase } from '../../client.js';
import { v4 as uuid } from 'uuid';

const Create = () => {
  const [brainrotValue, setBrainrotValue] = useState(50);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [name, setName] = useState('');
  const randomId = Math.floor(Math.random() * 1000000000); 

  
  async function addMember() {
    
    if (!name || name.trim() === '') {
      alert('Please enter a name');
      return;
    }
    
    if (!selectedAnimal) {
      alert('Please select a spirit animal');
      return;
    }
  
    const { data, error } = await supabase
      .from('Users')
      .insert([
        { id: randomId, name: name, brainrotted: brainrotValue, animal: animals[selectedAnimal].image, catchphrase: catchphrase }
      ])
      .select();
    
    if (error) {
      console.error('Error adding member:', error);
    } else {
      console.log('Member added:', data);
        alert('Member added successfully!');
      setName('');
      setSelectedAnimal('');
      setCatchphrase('');
      setBrainrotValue(50);
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const animals = {
    "bombadiro_crocodilo": {
      name: "Bombadiro Crocodilo",
      image: "src/images/bombardino.webp" 
    },
    "brr_brr_patapim": {
      name: "Brr Brr Patapim",
      image: "src/images/brrbrr.webp"
    },
    "tung_tung_tung_tung_sahur": {
      name: "Tung Tung Tung Tung Sahur",
      image: "src/images/tungtungtung.webp"
    },
    "boneca_ambalabu": {
      name: "Boneca Ambalabu",
      image: "src/images/boneca.jpg"
    },
    "trallalero_trallala": {
      name: "Trallalero Trallala",
      image: "src/images/tralalero.webp"
    },
    "cappuccino_assassino": {
      name: "Cappuccino Assassino",
      image: "src/images/cappuccino.webp"
    },
    "chimpanzini_bananini": {
      name: "Chimpanzini Bananini",
      image: "src/images/chimpanzini.webp"
    },
    "lirili_larila": {
      name: "Lirili Larila",
      image: "src/images/lirili.webp"
    },
    "tripi_tropi": {
      name: "Tripi Tropi",
      image: "src/images/tripi.webp"
    },
    "bobrito_bandito": {
      name: "Bobrito Bandito",
      image: "src/images/bomborito.webp"
    }
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
    <div className='create-container'>
      <h1>Add a new squad member!</h1>
      
      <div className='form-container'>
        <div className='box'>
          <h3>Name:</h3>
          <input 
        type='text' 
        name="name" 
        placeholder="Enter member's name"
        value={name}
        onChange={handleNameChange}
        required
        ></input>
        </div>
        
        <div className='box'>
          <h3>Brainrot: {brainrotValue}%</h3>
          <input 
            type='range' 
            name="brainrot" 
            min="0" 
            max="100" 
            value={brainrotValue} 
            onChange={handleBrainrotChange}
          ></input>
        </div>
        
        <div className='box'>
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

        <div className='box'>
          <h3>Catchphrase:</h3>
          <input 
            type='text' 
            name="catchphrase" 
            placeholder="Enter a signature catchphrase"
            value={catchphrase}
            onChange={handleCatchphraseChange}
          ></input>
        </div>
        
        {selectedAnimal && (
          <div className='box preview-box'>
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
        
        <button className="submit-btn" onClick={addMember}>Add Member</button>
      </div>
    </div>
  )
}

export default Create