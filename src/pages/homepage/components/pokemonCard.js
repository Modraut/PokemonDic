import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia,  Grid, IconButton, makeStyles } from '@material-ui/core';


import { firstLetterUppercase, showThreeDigits } from "utils.js";
import { Star } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { Fragment } from 'react';


const useStyle = makeStyles(theme => ({
  stars: {
    color: "#ffd700"
  },

}))
const PokemonCard = ( props ) => {
  const classes = useStyle();
  const { pokemon, sortBy, favorites, toggleFavorites, history, setModalId } = props;
  const { id, name, stats } = pokemon;
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Fragment>
      <Grid 
        item
        xs={3}
        className="card"
        style={{ minWidth: "250px", maxWidth: "250px" }}
      >
        <Card 
          onClick={(e)=>setModalId(pokemon.id)}
          style={{ cursor: "pointer" }}
        >
          <CardHeader
            action={
              <IconButton
                className={ favorites.indexOf(id) !== -1? classes.stars: ""}
                onClick={(e)=> toggleFavorites(e, id )}
              >
                <Star />
              </IconButton>
            }
            title={sortBy==="index"? showThreeDigits(id): stats[sortBy]} // also add # before the number
          />
          <CardMedia
            image={sprite}
            src="img"
            style={{ width: "130px", height: "130px", margin: "auto" }}
          />
          <CardContent style={{ textAlign: "center" }}>
            {`${firstLetterUppercase(name)} `}
          </CardContent>
        </Card>

      </Grid>

    </Fragment>
  )
}

export default withRouter(PokemonCard)