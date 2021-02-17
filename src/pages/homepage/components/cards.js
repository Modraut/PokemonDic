import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import PokemonCard from './pokemonCard';


const useStyle = makeStyles(theme => ({

  pokemonDicContainer:{
    paddingTop: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]:{
      boxSizing: 'border-box',
      width: "100%"
    }
  },
}))

const Cards = (props) =>{
  const { pokemonData, favorites, showFavorites, sortBy, toggleFavorites, filter } = props
  const classes = useStyle()
  return(
    <Grid 
      container
      spacing={4}
      justify="center"
      className={classes.pokemonDicContainer}
      wrap={"wrap"}
    >
    {
      pokemonData.map((pokemon, index) =>{
        if(showFavorites){
          return (
            pokemon.name.includes(filter) &&
            favorites.indexOf(pokemon.name)!==-1 &&
            <PokemonCard 
              pokemon={pokemon}
              sortBy={sortBy}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
              key={`pokemon-${index}`}
            />
          )
        }else{
          return(
            pokemon.name.includes(filter) &&
            <PokemonCard 
              pokemon={pokemon}
              sortBy={sortBy}
              favorites={favorites}
              toggleFavorites={toggleFavorites}
              key={`pokemon-${index}`}
            />
          )
        }
      })
    }
    </Grid>
  )
}

export default Cards