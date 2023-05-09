import { useState, useEffect } from "react";
import Fight from "./Fight";

function Encounters({ locationId, onReset }) {
  const [pokemon, setPokemon] = useState("");
  const [spriteUrl, setSpriteUrl] = useState("");
  const [encounterExists, setEncounterExists] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

          if (isMounted) {
            setPokemon(capitalizeFirstLetter(randomEncounter.pokemon.name));
            setSpriteUrl(pokemonData.sprites.front_default);
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
          <div><Fight pokemon={{ url: "", name: pokemon }} /></div>
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
