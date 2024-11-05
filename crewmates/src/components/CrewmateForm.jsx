import { useState } from 'react';
import { supabase } from '../lib/supabase';

function CrewmateForm({ crewmate, onSave }) {
  const [name, setName] = useState(crewmate?.name || '');
  const [attribute, setAttribute] = useState(crewmate?.attribute || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = crewmate
      ? await supabase.from('crewmates').update({ name, attribute }).eq('id', crewmate.id)
      : await supabase.from('crewmates').insert([{ name, attribute }]);
      
    if (error) {
      console.error(error);
    } else {
      onSave(data[0]);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Crewmate Name" required />
      <input value={attribute} onChange={(e) => setAttribute(e.target.value)} placeholder="Attribute" required />
      <button type="submit">{crewmate ? 'Update' : 'Add'} Crewmate</button>
    </form>
  )
}

export default CrewmateForm;