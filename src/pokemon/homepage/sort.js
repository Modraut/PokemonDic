import React, { useEffect, useState } from 'react';
import { Button, Typography, Menu, MenuItem, makeStyles, Popover } from '@material-ui/core';

import { FilterList } from '@material-ui/icons';
import { firstLetterUppercase } from '../utils';

const useStyle = makeStyles({
  sortContainer: {
    position: "relative",
    top: "-10px"
  },
  menu: {
    position: "relative",
    left: "30px"
  },
  sortBy:{
    marginLeft: "10px",
    background: "#ea6f5a",
    borderRadius: "5px",
    padding: "3px",
    width: "200px"
  }
  
})

export const Sort = ( props ) => {
  const { pokemonData, setPokemonData, sortBy, setSortBy } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyle()


  const handleSortMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sortPokemons = (e) => {
    const newSortBy = e.target.textContent;
    setSortBy(newSortBy)
    const newPokemonData = [...pokemonData];

    newPokemonData.sort((a,b)=>{
      return b['stats'][newSortBy] - a['stats'][newSortBy]
    })

      setPokemonData(newPokemonData)
  }
  const sortPokemonsByIndex = (e) => {
    const newSortBy = e.target.textContent;
    setSortBy(newSortBy)
    const newPokemonData = [...pokemonData];
    newPokemonData.sort((a,b)=>{
      return a['id'] - b['id']
    })
    setPokemonData(newPokemonData)
  }
  const statsList = [
    "attack",
    "defense",
    "hp",
    "special-attack",
    "special-defense",
    "speed"
  ]
  

  return(

    <Typography component="div" className={classes.sortContainer} >
      <Button
        onClick={handleSortMenu}
      >
        <FilterList style={{fontSize:"32", paddingRight:"10px"}} />
        <Typography component="span">
          Sort By:
        </Typography>
        <Typography
          component="span"
          className={classes.sortBy}
        >
          {sortBy}
        </Typography>
      </Button>
      <Popover className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e)=>{sortPokemonsByIndex(e);setAnchorEl(null)}}>index</MenuItem>
        {
          statsList.map(stat=>(
            <MenuItem onClick={(e)=>{sortPokemons(e);setAnchorEl(null)}}>{stat}</MenuItem>
          ))
        }
      </Popover>
      </Typography>
  )


}