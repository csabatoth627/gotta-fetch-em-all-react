import React from "react";
import "./Locations.css";

function Locations({ locations, onLocationClick }) {
  const sortedLocations = locations.sort((a, b) => a.name.localeCompare(b.name));

  const handleClick = (locationUrl) => {
    const locationId = locationUrl.split("/").slice(-2)[0];
    onLocationClick(locationId);
  };

  return (
    <div className="locations-container">
      {sortedLocations.map((location, index) => (
        <React.Fragment key={index}>
          <button onClick={() => handleClick(location.url)}>
            {location.name.charAt(0).toUpperCase() + location.name.slice(1)}
          </button>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Locations;