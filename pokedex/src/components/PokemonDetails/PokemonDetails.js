import { useParams } from "react-router-dom";
import axios from "axios";
import './PokemonDetails.css'
import { useEffect, useState } from "react";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonDetails()
{
    const {id}=useParams();
    const [pokemon,setPokemon]=useState({});
    async function downloadPokemon(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("res.data",response.data)
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=> t.type.name)
        })
    }

    const { pokemonListState } = usePokemonList(
        `https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : "Fire"}`,
        true
      );
      


    


    return(<div className="pokemon-details-wrapper">
    <img className="pokemon-details-image" src={pokemon.image} />
        <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
        <div className="pokemon-details-name">Weight:{pokemon.weight}</div>
        <div className="pokemon-details-name">Height:{pokemon.height}</div>
        <div className="pokemon-details-types">
            {pokemon.types && pokemon.types.map((t)=> <div key={t}> { t } </div>)}
        </div>
        
        {pokemon.types && 
        <div>
                    More {pokemon.types[0]} Types Pokemons
                    <ul>
                    {pokemonListState.pokemonlist && pokemonListState.pokemonlist.map((p)=><li key={p.pokemon.name}>{p.pokemon.name}</li>)}
                    </ul>
        </div>
        }
        </div>
        );


}

export default PokemonDetails;