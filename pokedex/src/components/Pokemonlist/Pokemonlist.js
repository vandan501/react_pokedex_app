import { useEffect, useState } from "react";
import axios from 'axios';
import './Pokemonlist.css';
import React from "react";
import Pokemon from "../Pokemon/Pokemon"; 



function Pokemonlist() 
{
  const [pokemonlist, setPokemonlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon/';
  
  async function downloadpokemons() {
    try {
      const response = await axios.get(POKEDEX_URL);//this downloads list of 20 pokimons
      const pokemonResults = response.data.results;//we get the array of pokemons from the result
      
      console.log(response.data)

      // iterating over the array of pokemons and using their url to create an array of promise
      // that will download those 20 pokemons
      const pokemonResultPromises = pokemonResults.map(pokemon => axios.get(pokemon.url));
      
      // passwing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromises);// array of detailde data of 20 pokemons
      console.log(pokemonData)

      // now iterate on data of each pokemon and  extract id ,name ,image  and types
      const pokemonListResult = pokemonData.map(pokeData => {
      const pokemon = pokeData.data;
        return {
          id:pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other && pokemon.sprites.other.dream_world.front_default)
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types
        };
      });
      
      console.log(pokemonListResult);
      setPokemonlist(pokemonListResult);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadpokemons();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading ? 'Loading...' : pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)}

      </div>
        <div className="controls">
        <button>Previous</button>
        <button>Next</button>
        </div>
    </div>
  );
}

export default Pokemonlist;