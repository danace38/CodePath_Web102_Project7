import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function CrewmateDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, []);

  const fetchCrewmate = async () => {
    const { data } = await supabase.from('crewmates').select().eq('id', id).single();
    setCrewmate(data);
  }

  return crewmate ? (
    <div>
      <h1>{crewmate.name}</h1>
      <p>Attribute: {crewmate.attribute}</p>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default CrewmateDetail;