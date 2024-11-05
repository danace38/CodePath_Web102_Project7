import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import crewmateImage from '../../public/amongcreate.png';

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !speed || !color) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, speed, color }]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Failed to create crewmate. Please try again.");
    } else {
      console.log("Crewmate created:", data);
      navigate('/gallery');
    }
  }

  return (
    <div className="create-crewmate-container">
      <h1 className="create-crewmate-title">Create a New Crewmate</h1>
      <img src={crewmateImage} alt="Crewmates" className="create-crewmate-image" />
      <form onSubmit={handleSubmit} className="create-crewmate-form">
        <div className="form-section">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter crewmate's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label htmlFor="speed">Speed (mph):</label>
          <input
            type="number"
            id="speed"
            placeholder="Enter speed in mph"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label>Color:</label>
          <div className="color-options">
            {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'].map((colorOption) => (
              <div key={colorOption}>
                <input
                  type="radio"
                  id={colorOption}
                  name="color"
                  value={colorOption}
                  checked={color === colorOption}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label htmlFor={colorOption}>{colorOption}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="create-crewmate-button">Create Crewmate</button>
      </form>
    </div>
  )
}

export default CreateCrewmate;