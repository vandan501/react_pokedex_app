import '../Search/Search'
import './Pokedex.css'
import '../Pokemonlist/Pokemonlist'
import Search from '../Search/Search';
import Pokemonlist from '../Pokemonlist/Pokemonlist';
function Pokedex(){
    return(
    <div className="pokedex-wrapper">
        <Search/>
        <Pokemonlist />
    </div>
    );
    }
    
    export default Pokedex;