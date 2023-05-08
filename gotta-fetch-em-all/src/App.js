import './App.css';
import React, { useState, useEffect } from 'react';



function App() {
  const [data, setData] = useState();

useEffect (() => {
  async function fetchEmAll () {
    try {
      const respone = await fetch('https://pokeapi.co/api/v2/location/');
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

      </div>
    );
  }

export default App;
