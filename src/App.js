import React, { Component } from 'react';
import './App.css';
import PokemonList from './component/PokemonListComponent';

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

class App extends Component {
  constructor(){
    super();
    this.state = {
      pokemons : [],
      currentIndex:0,
      lastIndex:2,
    }
    this.fetchPokemonList = this.fetchPokemonList.bind(this);
    this.handlePokemonListScroll = this.handlePokemonListScroll.bind(this);
    this.onPokemonClick = this.onPokemonClick.bind(this);
  }

  componentDidMount(){
    this.fetchPokemonList();
    window.addEventListener('scroll', this.handlePokemonListScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handlePokemonListScroll);
  }

  async fetchPokemonList() {
    let response = await fetch(url);
    var data = await response.json();
    this.setState({
      pokemons: data.results
    })
  }

  handlePokemonListScroll(e){
    setTimeout(function(){
      let activeElement = document.elementFromPoint(0,20);
      let id = activeElement.id;
      let currentDexNumber = this.state.currentIndex;
      if(id!==currentDexNumber){
        this.setState({
          currentIndex:id,
          lastIndex:id+2
        });
      }
    }.bind(this),1000)
  }

  onPokemonClick(e){
    let id = e.target.id;
    this.setState({
      currentIndex:id,
      lastIndex:id+2,
    });
  }

  render(){
    const pokemonList = this.state.pokemons.map((pokemon,index)=>{
      return (
        <div key={index} className="pokemon row list-group text-center" onClick={(event)=>this.onPokemonClick(event)}>
           <span className="list-group-item" id={index}>{pokemon.name}</span>
        </div>
      )
    })

    return (
      <div className="container-fluid">
        <div className="App row">
          <div className="pokemon-list col-3 list-group-flush">
              {pokemonList}
          </div>
          <div className="col-sm-9 col-12 p-2 pokemon-card">
              <PokemonList pokemonList={this.state.pokemons.slice(this.state.currentIndex,this.state.lastIndex)} currentDexNumber={this.state.currentIndex}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
