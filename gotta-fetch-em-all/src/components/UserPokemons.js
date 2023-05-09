import React, { useState, useEffect } from "react";

function UserPokemons ({ pokemon }) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [selectPokemon, setSelectPokemon] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response1 = await fetch(
          "https://pokeapi.co/api/v2/pokemon/squirtle"
        );
        const pokemon1 = await response1.json();
        const response2 = await fetch(
          "https://pokeapi.co/api/v2/pokemon/charizard"
        );
        const pokemon2 = await response2.json();
        const response3 = await fetch(
          "https://pokeapi.co/api/v2/pokemon/gyarados"
        );
        const pokemon3 = await response3.json();
        setUsersPokemon([pokemon1, pokemon2, pokemon3]);
        console.log(pokemon1);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPokemons();
  }, []);

  return (
    <div>
      {!selectPokemon ? (
        <React.Fragment>
          <h2>Owned Pokemons</h2>
          <h3>Who will you choose?</h3>

          {usersPokemon.map((p) => (
            <div key={p.id}>
              <button
                onClick={() => {
                  setSelectPokemon(p);
                }}
              >
                <img src={p.sprites.front_default} alt={p.name} />
                <p>{capitalizeFirstLetter(p.name)}</p>
                <p>HP: {p.stats[0].base_stat}</p>
                <p>Attack Power: {p.stats[1].base_stat}</p>
                <p>Defense: {p.stats[2].base_stat}</p>
              </button>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src={selectPokemon.sprites.back_default}
            alt={selectPokemon.name}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default UserPokemons;
