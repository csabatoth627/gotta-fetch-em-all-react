import  {useState, useEffect} from "react";

const FindSomePokemon = () => {
   const [pokemon, setPokemon] = useState("")

    useEffect(() =>{
        //  Hely azonosítója (amire majd kattintunk most pl 1 es id)
const locationId = 1;

// Helyhez tartozó területek  lekérdezése
fetch(`https://pokeapi.co/api/v2/location/${locationId}/`)
  .then((response) => response.json())
  .then((data) => {
    const locationAreas = data.areas;

    //  Random terület kiválasztása
    const randomArea = locationAreas[Math.floor(Math.random() * locationAreas.length)];
    //  A terület adatainak lekérdezése
    fetch(randomArea.url)
      .then((response) => response.json())
      .then((areaData) => {
        // Random pokémon kiválasztása...
        const randomEncounter =
          areaData.pokemon_encounters[Math.floor(Math.random() * areaData.pokemon_encounters.length)];
        setPokemon(randomEncounter.pokemon.name);
   
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });

    }, [])
console.log(pokemon);
}
export default FindSomePokemon