import { useState, useEffect } from "react";
import UserPokemons from "./UserPokemons";

function Encounters({ locationId, onReset, updatePokemon, setUpdatePokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState("")
  const [pokemon, setPokemon] = useState("");
  const [spriteUrl, setSpriteUrl] = useState("");
  const [encounterExists, setEncounterExists] = useState(false);
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/location/${locationId}/`
        );
        const data = await response.json();
        const locationAreas = data.areas;
        const randomArea =
          locationAreas[Math.floor(Math.random() * locationAreas.length)];
        const areaResponse = await fetch(randomArea.url);
        const areaData = await areaResponse.json();

        if (areaData.pokemon_encounters.length > 0) {
          const randomEncounter = areaData.pokemon_encounters[Math.floor(Math.random() * areaData.pokemon_encounters.length)];

          const pokemonResponse = await fetch(randomEncounter.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          setPokemonDetails(pokemonData)

          if (isMounted) {
            setPokemon(capitalizeFirstLetter(randomEncounter.pokemon.name));
            setSpriteUrl(pokemonData.sprites.front_default);
            setHp(pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat);
            setAttack(pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat);
            setDefense(pokemonData.stats.find(stat => stat.stat.name === "defense").base_stat);
            setEncounterExists(true);
          }
        } else {
          if (isMounted) {
            setEncounterExists(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    setEncounterExists(false);
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [locationId]);

  const handleBackClick = () => {
    onReset();
  };

  return (
    <div>
      {encounterExists ? (
        <div>
          <p>A wild <strong>{pokemon}</strong> appeared</p>
          <img src={spriteUrl} alt={pokemon} />
          <p>HP: {hp}</p>
          <p>Attack: {attack}</p>
          <p>Defense: {defense}</p>
          <div><UserPokemons 
          setUpdatePokemon={setUpdatePokemon}
          updatePokemon={updatePokemon}
          back={onReset}
          pokemon={pokemonDetails }
          enemyHp={hp}
          setEnemyHp={setHp}
          enemyAttack={attack}
          enemySetAttack={setAttack}
          enemyDefense={defense}
          enemySetDefense={setDefense}
          /></div>
        </div>
      ) : (
        <>
          <p>No pokemon found in this location</p>
          <button onClick={handleBackClick}>Back to location selection</button>
        </>
      )}
    </div>
  );
}


export default Encounters;

