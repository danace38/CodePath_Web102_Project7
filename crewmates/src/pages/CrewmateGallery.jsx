import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('crewmates').select('*');
    if (error) {
      console.error("Error fetching crewmates:", error.message);
    } else {
      setCrewmates(data);
    }
    setLoading(false);
  };

  return (
    <div className="gallery-container">
      <h1>Your Crewmate Gallery</h1>
      {loading ? (
        <p>Loading crewmates...</p>
      ) : (
        <div className="crewmate-cards">
          {crewmates.map((crewmate) => (
            <div
              key={crewmate.id}
              className="crewmate-card"
              onClick={() => navigate(`/crewmate/${crewmate.id}`)}
            >
              <h2>{crewmate.name}</h2>
              <p><strong>Speed:</strong> {crewmate.speed} mph</p>
              <p><strong>Color:</strong> {crewmate.color}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrewmateGallery;