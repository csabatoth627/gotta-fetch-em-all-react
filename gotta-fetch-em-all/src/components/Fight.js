import React, { useState, useEffect } from "react";

function Fight({ pokemon }) {
  const [usersPokemon, setUsersPokemon] = useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response1 = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
        const pokemon1 = await response1.json();
        const response2 = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
        const pokemon2 = await response2.json();
        const response3 = await fetch("https://pokeapi.co/api/v2/pokemon/poliwhirl");
        const pokemon3 = await response3.json();
        setUsersPokemon([pokemon1, pokemon2, pokemon3]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPokemons();
  }, []);

  return (
    <div>
      <h2>Owned Pokemons</h2>
      {usersPokemon.map((p) => (
        <div key={p.id}>
          <img src={p.sprites.front_default} alt={p.name} />
          <p>{capitalizeFirstLetter(p.name)}</p>
        </div>
      ))}
    </div>
  );
}

export default Fight;
