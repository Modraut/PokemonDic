import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Card, CardHeader, CircularProgress, IconButton, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import { firstLetterUppercase } from "../../utils"
import axios from 'axios';



// import "./pokemon.scss"


const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemonDetails, setPokemonDetails] = useState(undefined)
  const getpokemonDetails = async ()=>{
    try{
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const { data } = res;
      console.log(data);
      setPokemonDetails(data)
    } catch(error){
      setPokemonDetails(false)
    }
  }
  useEffect(()=>{
    getpokemonDetails()
  },[pokemonId])
  const fullImage = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`
  const pokemonInfo = () => {
    const { name, id, species, height, weight , types, sprites  } = pokemonDetails;

    return (
      <div className="details">
        <Typography variant="h1">
          {`${pokemonId}. ${firstLetterUppercase(name)}`}
        </Typography>
        <img src={fullImage} style={{ width: "360px" }}/>
        <Typography variant="h3" >
          Pokemon Info
        </Typography>
        <Typography>
          Species: 
          <Link href={species.url} >
            {species.name}
          </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6">Types: </Typography>
        {
          types.map((typeInfo)=>{
            const {type: {name}} = typeInfo;
            return <Typography key={name}>{name}</Typography>
          })
        }
        <div className="details__background" />
      </div>
    )
  }
  return(
    <>
      { pokemonDetails === undefined && <CircularProgress />}
      { pokemonDetails !== undefined && pokemonDetails && pokemonInfo()}
      { pokemonDetails === false && <Typography> Pokemon not found</Typography>}
      { pokemonDetails !== undefined && (
        <Button variant="contained" onClick={()=> history.push('/')} >
          Back to Pokedex
        </Button>
      )}
    </>
  )
}

export default Pokemon;


