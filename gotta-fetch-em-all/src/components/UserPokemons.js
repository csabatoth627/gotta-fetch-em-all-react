import React, { useState, useEffect } from "react";
import Fight from "./Fight";
import "./UserPokemons.css";

function UserPokemons({ enemyHp, setEnemyHp, enemyAttack, enemySetAttack, enemyDefense, enemySetDefense  }) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [selectPokemon, setSelectPokemon] = useState(null);
  const [userHp, setUserHp] = useState("");
  const [userAttack, setUserAttack] = useState("");
  const [userDefense, setUserDefense] = useState("");

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
      } catch (error) {
        console.error(error); 
      }
    }
    fetchPokemons();
  }, []);

  return (
    <>
      <div>
        <h2>Owned Pokemons</h2>
      </div>
      <div className="pokemon-deck">
        {!selectPokemon ? (
          <React.Fragment>

            {usersPokemon.map((p) => (
              <div key={p.id} className="pokemon-card">
                <button
                  onClick={() => {
                    setSelectPokemon(p);
                    setUserHp(p.stats[0].base_stat)
                    setUserAttack(p.stats[1].base_stat)
                    setUserDefense(p.stats[2].base_stat)
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
              <p>HP: {userHp}</p>
            <Fight 
            enemyHp={enemyHp}
            setEnemyHp={setEnemyHp}
            enemyAttack={enemyAttack}
            enemySetAttack={enemySetAttack}
            enemyDefense={enemyDefense}
            enemySetDefense={enemySetDefense}
            userHp={userHp}
            setUserHp={setUserHp}
            userAttack={userAttack}
            userDefense={userDefense}

        
            />
          </React.Fragment>
        )}
      </div>
      <div>
        <h2>Who will you choose?</h2>
        <h5>Pick one of your pokemon to start encounter</h5>
      </div>
    </>
  );
}

export default UserPokemons;
