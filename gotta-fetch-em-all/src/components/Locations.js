import React from "react";

function Locations({ locations, onLocationClick }) {
  const sortedLocations = locations.sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (locationUrl) => {
    const locationId = locationUrl.split("/").slice(-2)[0];
    onLocationClick(locationId);
  };

  return (
    <div>
      {sortedLocations.map((location, index) => (
        <React.Fragment key={index}>
          <button onClick={() => handleClick(location.url)}>{location.name}</button>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Locations;