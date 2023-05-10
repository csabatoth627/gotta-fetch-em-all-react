import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";
import Encounters from "./components/Encounters";


function App() {
  const [data, setData] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocations, setShowLocations] = useState(false);
  const [showStarterScreen, setShowStarterScreen] = useState(true);

  const fetchLocations = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/location?offset=0&limit=20");
      const pokeData = await response.json();
      setData(pokeData);
      console.log(pokeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!showStarterScreen) {
      fetchLocations();
    }
  }, [showStarterScreen]);

  const handleLocationClick = (locationId) => {
    setSelectedLocation(locationId);
    setShowLocations(false);
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setShowLocations(true);
    fetchLocations();
  };

  const handlePlayClick = () => {
    setShowStarterScreen(false);
    setShowLocations(true);
  };

  return (
    <div className="App">
      {showStarterScreen ? (
        <div>
          <h1>Welcome to Nodémon!</h1>
          <img src="Nodemon.jpg" alt="Nodemon" className="nodemon-image" />
          <br></br>
          <button onClick={handlePlayClick}>Press to play</button>
        </div>
      ) : showLocations ? (
        data ? (
          <>
            <h1>Where wouldst thou like to go?</h1>
            <h2>Choose a location!</h2>
            <Locations locations={data.results} onLocationClick={handleLocationClick} />
          </>
        ) : (
          <p>Loading locations...</p>
        )
      ) : selectedLocation ? (
        <Encounters locationId={selectedLocation} onReset={handleReset} />
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
