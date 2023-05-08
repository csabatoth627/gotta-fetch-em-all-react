import React from 'react';

function Locations({ locations }) {
  const sortedLocations = locations.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {sortedLocations.map((location, index) => (
        <>
          <button key={index}>{location.name}</button><br>
          </br>
        </>
      ))}
    </div>
  );
}

export default Locations;