import './App.css';
import React, { useState, useEffect } from 'react';
import Locations from './components/Locations';



function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchEmAll() {
      try {
        const respone = await fetch('https://pokeapi.co/api/v2/location?offset=0&limit=20');
        const pokeData = await respone.json();
        setData(pokeData);
        console.log(pokeData);
      }
      catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchEmAll();
  }, []);


  return (
    <div className="App">
      {data ? (
        <Locations locations={data.results} />
      ) : (
        <p>Loading selected location...</p>
      )}
    </div>
  );
}

export default App;
