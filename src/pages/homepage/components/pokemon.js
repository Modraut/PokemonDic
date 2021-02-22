import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Card, CardHeader, CircularProgress, IconButton, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom"
import { firstLetterUppercase, showThreeDigits } from "utils.js"
import axios from 'axios';


import "./pokemon.scss"

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


const Pokemon = (props) => {
  // const { match, history, modalId } = props;
  // const { params } = match;
  // const { modalId } = params;
  const { modalId, setModalId } = props;

  const [pokemonDetails, setPokemonDetails] = useState(undefined)
  const getpokemonDetails = async ()=>{
    try{
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${modalId}`);
      const { data } = res;
      console.log(data);
      setPokemonDetails(data)
    } catch(error){
      setPokemonDetails(false)
    }
  }
  useEffect(()=>{
    getpokemonDetails()
  },[modalId])
  const fullImage = `https://pokeres.bastionbot.org/images/pokemon/${modalId}.png`
  const pokemonInfo = () => {
    const { name, id, species, height, weight , types, sprites  } = pokemonDetails;

    return (
      <div className="modal" onClick={()=>setModalId(null)} >
        <div className="modal__inner">
          <div className="modal__inner__pokemonBall__top" />
          <div className="modal__inner__pokemonBall__bottom" />
          <div className="modal__inner__content">
            <div className="modal__inner__content__left">
              <div className="grid">
                <div className="grid__item header">{`${showThreeDigits(modalId)} ${firstLetterUppercase(name)}`}</div>
                <div className="grid__item left">Species</div>
                <div className="grid__item right">{firstLetterUppercase(species.name)}</div>
                <div className="grid__item left">Height</div>
                <div className="grid__item right">{height}</div>
                <div className="grid__item left">Weight</div>
                <div className="grid__item right">{weight}</div>
                <div className="grid__item left">Types</div>
                <div className="grid__item right">
                  {
                    types.map((typeInfo)=>{
                      const {type: {name}} = typeInfo;
                      return <div key={name} style={{background: colours[name]}} >{name}</div>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="modal__inner__content__right">
              <img className="details_image" src={fullImage} />
            </div>
          </div>
        <div className="details__background" />
        </div>
      </div>
    )
  }
  return(
    <>
      { pokemonDetails === undefined && <CircularProgress />}
      { pokemonDetails !== undefined && pokemonDetails && pokemonInfo()}
      {/* { pokemonDetails === false && <Typography> Pokemon not found</Typography>} */}
    </>
  )
}

export default Pokemon;


