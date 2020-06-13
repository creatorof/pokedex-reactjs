import React from 'react';
import '../shared/css/PokemonComponent.css';

function PokemonComponent(props) {
    const stats = props.pokemon.stats.map(stat => {
        let widthStyle = {
            width:stat.base_stat+'%',
        }
        return (
            <div className={stat.name+" base-stat"} style={widthStyle}>
                {stat.name} {stat.base_stat}
            </div>
        );
    });

    const types = props.pokemon.types.map(type => {
        return (
            <span className={type}>{type} </span>
        );
    });

    const abilities = props.pokemon.abilities.map(ablitity => {
        return (
            <span> {ablitity} </span>
        );
    });

    return (
        <div className="card p-2 mb-1">
            <div className="row">
                <div className="col-4 text-center">
                    <div className="pokemon-image">
                        <img src={props.pokemon.imageUrl} alt={props.pokemon.name} />
                    </div>
                    <span>{props.pokemon.name}</span>
                    <div className="types">
                        {types}
                    </div>
                    <div className="abilities">
                        {abilities}
                    </div>
                </div>
                <div className="col-8 pokemon-stats">
                    {stats}
                </div>
            </div>
        </div>
    );
}

export default PokemonComponent;