import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function SummaryStatistics() {
  const [totalCrewmates, setTotalCrewmates] = useState(0);
  const [attributeCounts, setAttributeCounts] = useState({});
  const [mostCommonAttribute, setMostCommonAttribute] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    const { data: crewmates, error } = await supabase.from('crewmates').select('*');
    
    if (error) {
      console.error('Error fetching crewmates:', error);
      return;
    }

    setTotalCrewmates(crewmates.length);

    const attributeCount = {};
    crewmates.forEach(crewmate => {
      const attr = crewmate.attribute;
      attributeCount[attr] = (attributeCount[attr] || 0) + 1;
    });
    setAttributeCounts(attributeCount);

    const mostCommon = Object.keys(attributeCount).reduce((a, b) =>
      attributeCount[a] > attributeCount[b] ? a : b
    );
    setMostCommonAttribute(mostCommon);
  }

  return (
    <div>
      <h2>Summary Statistics</h2>
      <p>Total Crewmates: {totalCrewmates}</p>
      <h3>Attribute Distribution:</h3>
      <ul>
        {Object.entries(attributeCounts).map(([attribute, count]) => (
          <li key={attribute}>
            {attribute}: {count}
          </li>
        ))}
      </ul>
      <p>Most Common Attribute: {mostCommonAttribute}</p>
    </div>
  )
}

export default SummaryStatistics;