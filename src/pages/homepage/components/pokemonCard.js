import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia,  Grid, IconButton, makeStyles } from '@material-ui/core';


import { firstLetterUppercase } from "../../../utils";
import { Star } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';



const useStyle = makeStyles(theme => ({
  stars: {
    color: "#ffd700"
  },
  card: {
    // position: "absolute",
    display: "none"
  }
}))
const PokemonCard = ( props ) => {
  const [ expand, setExpand ] = useState(false)
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
  // const toggleExpansion = ( element, to, duration = 0.35 ) => {
  //   return new Promise(res => {
  //     requestAnimationFrame(()=>{
  //       element.style.transition = `
  //       width ${duration}s east-in-out,
  //       height ${duration}s east-in-out,
  //       left ${duration}s east-in-out,
  //       top ${duration}s east-in-out,
  //       `
  //       element.style.top = 0
  //       element.style.left = 0
  //       element.style.width = '100vw'
  //       element.style.height = '100vh'
  //     })
  //     setTimeout(res, duration)
  //   })
  // }
  // const expandCard = async (e) => {
  //   const card = e.currentTarget;
  //   const cardClone = card.cloneNode(true)
  //   card.parentNode.appendChild(card)
  //   const { top, left, width, height } = card.getBoundingClientRect();
  //   cardClone.style.position = 'fixed';
  //   cardClone.style.top = top + 'px';
  //   cardClone.style.left = left + 'px';
  //   cardClone.style.width = width + 'px';
  //   cardClone.style.height = height + 'px';
  //   card.style.opacity= '0'
  //   card.parentNode.appendChild(card)

  // }
  // const index = showThreeDigits(id)
  return (
    <Grid 
      item
      xs={3}
      className="card"
      style={{ minWidth: "250px", maxWidth: "250px" }}
    >
      <Card 
        // onClick={()=>{history.push(`/${id}`)}}
        onClick={()=>setExpand(!expand)}
        style={{ cursor: "pointer" }}
        className={expand? classes.card: ""}
      >
        <CardHeader
          action={
            <IconButton
              className={ favorites.indexOf(name) !== -1? classes.stars: ""}
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
      <div className="card__container">
        <div className="card__container__inner">
          
        </div>
      </div>
    </Grid>
  )
}

export default withRouter(PokemonCard)