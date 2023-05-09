import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";
import Encounters from "./components/Encounters";

function App() {
  const [data, setData] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocations, setShowLocations] = useState(true);

  useEffect(() => {
    async function fetchEmAll() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location?offset=0&limit=20");
        const pokeData = await response.json();
        setData(pokeData);
        console.log(pokeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchEmAll();
  }, []);

  const handleLocationClick = (locationId) => {
    setSelectedLocation(locationId);
    setData(null);
    setShowLocations(false);
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setShowLocations(true);
  };

  return (
    <div className="App">
      {showLocations ? (
        data ? (
          <Locations locations={data.results} onLocationClick={handleLocationClick} />
        ) : (
          <p>Loading locations...</p>
        )
      ) : selectedLocation ? (
        <Encounters locationId={selectedLocation} />
      ) : (
        <div>
          <p>This location doesn't seem to have any pokémon</p>
          <button onClick={handleReset}>Choose a different location</button>
        </div>
      )}
    </div>
  );
}

export default App;