import React from 'react';
import { Card, CardContent, CardHeader, CardMedia,  Grid, IconButton, makeStyles } from '@material-ui/core';

import { firstLetterUppercase } from "../../../utils";
import { Star } from '@material-ui/icons';


const useStyle = makeStyles(theme => ({
  stars: {
    color: "#ffd700"
  },

}))

const PokemonCard = ( props ) => {
  const classes = useStyle();
  const { pokemon, sortBy, favorites, toggleFavorites, history } = props;
  const { id, name, stats } = pokemon;
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const showThreeDigits = (number) => {
    let newNumber;
    if(number<10){ newNumber = `#00${number}`}
    if(number>=10 && number<100){ newNumber = `#0${number}`}
    if(number>=100){ newNumber = `#${number}`}
    return newNumber
  }
  // const index = showThreeDigits(id)
  return (
    <Grid 
      item
      xs={3}
      className="card"
      style={{ minWidth: "250px", maxWidth: "250px" }}
    >
      <Card 
        onClick={()=>{ history.push(`./${id}`) }}
        style={{ cursor: "pointer" }}
        // className={classes.card}
      >
        <CardHeader
          action={
            <IconButton
              className={ favorites.indexOf(name) !== -1 && classes.stars}
              onClick={(e)=> toggleFavorites(e, name )}
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
  )
}

export default PokemonCard