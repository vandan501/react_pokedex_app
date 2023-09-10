import './Pokemonlist.css';
import Pokemon from "../Pokemon/Pokemon"; 
import usePokemonList from "../../hooks/usePokemonList";

function Pokemonlist() {
  
  const {pokemonListState,setPokemonListState}= usePokemonList('https://pokeapi.co/api/v2/pokemon/',false)
    return (


    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading ? 'Loading...' : pokemonListState.pokemonlist.map(p => (
          <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
        ))}
      </div>




      <div className="controls">
        <button disabled={!pokemonListState.previousurl} onClick={() => {
          const urlToSet = pokemonListState.previousurl;
          setPokemonListState(prevState => ({
            ...prevState,
            pokedexurl: urlToSet
          }));
        }}>Previous</button>
        <button disabled={!pokemonListState.nexturl} onClick={() => {
          const urlToSet = pokemonListState.nexturl;
          setPokemonListState(prevState => ({
            ...prevState,
            pokedexurl: urlToSet
          }));
        }}>Next</button>
      </div>
    </div>
  );
}

export default Pokemonlist;
