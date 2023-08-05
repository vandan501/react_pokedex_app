import '../Search/Search'
import './Pokedex.css'
import '../Pokemonlist/Pokemonlist'
import Search from '../Search/Search';
import Pokemonlist from '../Pokemonlist/Pokemonlist';
function Pokedex(){
    return(
    <div className="pokedex-wrapper">
        <h1 id="pokedex-heading">Pokedex</h1>
        <Search/>
        <Pokemonlist />
    </div>
    );
    }
    
    export default Pokedex;