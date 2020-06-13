import React,{Component} from 'react';
import Pokemon from '../shared/js/Pokemon';
import PokemonComponent from './PokemonComponent';

class PokemonList extends Component{
    constructor(props){
        super(props);
        this.state={
            pokemonInfo : [],
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.pokemonList !== this.props.pokemonList){
            this.fetchPokemonInfo(this.props.pokemonList);
        }
    }

    async fetchPokemonInfo(pokemonList){
        const length = pokemonList.length;
        let dexNumber = this.props.currentDexNumber;
        let pokemons = [];
        for(let i=0; i<length; i++){
            let response = await fetch(pokemonList[i].url);
            let info = await response.json();
            let abilities = [];
            for(let j=0;j <  info.abilities.length;j++){
                abilities.push(info.abilities[j].ability.name);
            }
            let stats = [];
            for(let k=0;k<info.stats.length;k++){
                stats.push({
                    'name':info.stats[k].stat.name,
                    'base_stat':info.stats[k].base_stat
                })
            }
            let types = [];
            for(let k=0;k<info.types.length;k++){
                types.push(info.types[k].type.name);
            }
            dexNumber++;
            let imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${dexNumber}.png`;
            let pokemon = new Pokemon(dexNumber, info.name,abilities,stats,types,imageUrl);
            pokemons.push(pokemon);
            console.log(pokemons);
        }

        this.setState({
            pokemonInfo:pokemons
        })
    }

    render(){
        const pokemonCard = this.state.pokemonInfo.map(pokemon=>{
            return(
               <PokemonComponent pokemon={pokemon}/>
            );
        });

        return(
            <div className="">
                {pokemonCard}
            </div>
        );
    }
}

export default PokemonList;