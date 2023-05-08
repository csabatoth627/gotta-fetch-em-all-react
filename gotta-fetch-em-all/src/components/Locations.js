import React from 'react';

function Locations({ locations }) {
  const sortedLocations = locations.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <l>
      {sortedLocations.map((location, index) => (
        <li key={index}>{location.name}</li>
      ))}
    </l>
  );
}

export default Locations;