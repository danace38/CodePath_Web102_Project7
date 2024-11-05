import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import CrewmateForm from './CrewmateForm';

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data } = await supabase.from('crewmates').select();
    setCrewmates(data);
  }

  const handleDelete = async (id) => {
    await supabase.from('crewmates').delete().eq('id', id);
    fetchCrewmates();
  }

  return (
    <div>
      <CrewmateForm onSave={fetchCrewmates} />
      <ul>
        {crewmates.map(crewmate => (
          <li key={crewmate.id}>
            {crewmate.name} - {crewmate.attribute}
            <button onClick={() => handleDelete(crewmate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CrewmateList;