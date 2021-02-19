import React, { useEffect, useState } from 'react';
import { Button, Typography, Menu, MenuItem, makeStyles, withStyles } from '@material-ui/core';

import { FilterList } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  sortContainer: {
    position: "relative",
    top: "-10px",
    [theme.breakpoints.down('sm')]:{
      paddingLeft: "20px",
      minWidth: '350px'
    }
  },

  sortBy:{
    marginLeft: "10px",
    background: "#ea6f5a",
    borderRadius: "5px",
    padding: "3px",
    width: "200px"
  },
  button: {
    [theme.breakpoints.down('sm')]:{
      padding: '0',
      // marginTop: '1rem'
    }
  }
}))



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
        className={classes.button}
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
      <Menu className={classes.menu}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e)=>{sortPokemonsByIndex(e);setAnchorEl(null)}}>index</MenuItem>
        {
          statsList.map((stat, index)=>(
            <MenuItem
              onClick={(e)=>{sortPokemons(e);setAnchorEl(null)}}
              key={`stat-${index}`}
            >{stat}</MenuItem>
          ))
        }
      </Menu>



      </Typography>
  )


}