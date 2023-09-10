import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url,type)
{
        const [pokemonListState, setPokemonListState] = useState({
          pokemonlist: [],
          isLoading: true,
          pokedexurl: url,
          nexturl: '',
          previousurl: ''
        });
        async function downloadpokemons() {
            try {
              const response = await axios.get(pokemonListState.pokedexurl);
              const pokemonResults = response.data.results;

              console.log(response.data.pokemon)
        
              setPokemonListState(state => ({
                ...state,
                nexturl: response.data.next,
                previousurl: response.data.previous
              }));
              
              if(type){
                setPokemonListState((state)=>({
                  ...state,
                  pokemonlist : response.data.pokemon.slice(0, 5)
                })) 
              }else{
              const pokemonResultPromises = pokemonResults.map(pokemon => axios.get(pokemon.url));
              const pokemonData = await axios.all(pokemonResultPromises);
        
              const pokemonListResult = pokemonData.map(pokeData => {
                const pokemon = pokeData.data;
                return {
                  id: pokemon.id,
                  name: pokemon.name,
                  image: (pokemon.sprites.other && pokemon.sprites.other.dream_world.front_default)
                    ? pokemon.sprites.other.dream_world.front_default
                    : pokemon.sprites.front_shiny,
                  types: pokemon.types
                };
              });
        
              setPokemonListState(state => ({
                ...state,
                pokemonlist: pokemonListResult,
                isLoading: false
              }));
            }
        
            } catch (error) {
              console.error("Error fetching Pokémon data:", error);
              setPokemonListState(prevState => ({
                ...prevState,
                isLoading: false
              }));
            }
          }

      useEffect(()=>{
        downloadpokemons();
      },[pokemonListState.pokedexurl])  
      return {pokemonListState,setPokemonListState}
}

export default usePokemonList;