import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function CrewmateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('crewmates').select('*').eq('id', id).single();
    if (error) {
      console.error("Error fetching crewmate:", error.message);
    } else {
      setCrewmate(data);
      setName(data.name);
      setSpeed(data.speed);
      setColor(data.color);
    }
    setLoading(false);
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  }

  // Updating the crewmate
  const handleUpdate = async () => {
    const { error } = await supabase.from('crewmates').update({ name, speed, color }).eq('id', id);
    if (error) {
      console.error("Error updating crewmate:", error.message);
      alert("Failed to update crewmate. Please try again.");
    } else {
      alert("Crewmate updated successfully!");
      setIsEditing(false);
      fetchCrewmate();
    }
  }

  // Deleting the crewmate
  const handleDelete = async () => {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) {
      console.error("Error deleting crewmate:", error.message);
      alert("Failed to delete crewmate. Please try again.");
    } else {
      alert("Crewmate deleted successfully!");
      navigate('/gallery');
    }
  }

  if (loading) return <p>Loading crewmate...</p>;

  return (
    <div className="crewmate-detail-container">
      <h1>Crewmate Details</h1>
      
      {isEditing ? (
        <div>
          <h2>Edit Crewmate: {crewmate.name}</h2>
          <div className="form-section">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter crewmate's name"
            />
          </div>
          <div className="form-section">
            <label>Speed (mph):</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="Enter speed in mph"
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
          <button onClick={handleUpdate} className="update-button">Save Changes</button>
          <button onClick={handleEditToggle} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Crewmate: {crewmate.name}</h2>
          <p><strong>Speed:</strong> {crewmate.speed} mph</p>
          <p><strong>Color:</strong> {crewmate.color}</p>
          <button onClick={handleEditToggle} className="edit-button">Edit Crewmate</button>
          <button onClick={handleDelete} className="delete-button">Delete Crewmate</button>
        </div>
      )}
    </div>
  )
}

export default CrewmateDetail;