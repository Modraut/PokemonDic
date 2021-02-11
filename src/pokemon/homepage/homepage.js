import React, { useEffect, useState } from 'react';
import { fade, AppBar, Avatar, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, makeStyles, Tab, Tabs, TextField, Toolbar, CardActions, Button, Typography, Menu, MenuItem } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search"

import { firstLetterUppercase, getPokemonList, getStats } from "../utils";

import axios from "axios";
import './homepage.scss';
import { Star } from '@material-ui/icons';

import { Sort } from './sort'
import { Fragment } from 'react';

const useStyle = makeStyles(theme => ({
  appbar:{
    backgroundColor: "#524da2",
    minWidth: "500px"
  },
  pokemonDicContainer:{
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  toolbar:{
    backgroundColor: fade(theme.palette.common.white, 0.15),
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
    justifyContent: "space-between",
  },

  searchContainer:{
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px"
  },
  searchInput: {
    width: "200px",
    margin: "5px"
  },
  stars: {
    color: "#ffd700"
  },
  addition: {
    display: "flex",
    alignItems: "baseline",
    minWidth: "650px"
  }
}))


const Homepage = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const localStorage = window.localStorage;
  const classes = useStyle();

  const [ pokemonData, setPokemonData ] = useState([])
  const [ filter, setFilter ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)
  const [ sortBy, setSortBy] = useState("index"); 


  const [ favorites, setFavorites ] = useState([]);  // favorites pokemons
  const [ showFavorites, setShowFavorites ] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  
  const toggleFavorites = ( e, name ) =>{
    e.stopPropagation();
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(name);
    if(index!==-1){
      newFavorites.splice(index,1)
    } else{
      newFavorites.push(name);
    }
    // console.log(newFavorites);
    setFavorites(newFavorites)
    localStorage.setItem('favorite_pokemons', JSON.stringify(newFavorites))
  }

  // get pokemon data
  useEffect(()=>{
    getPokemonList( setIsLoading ).then((pokemonList)=>{

      setPokemonData(pokemonList);
      // setIsLoading(false)

    });
    if(!window.localStorage){
      window.alert(`Oops! seems the browse doesn't support the "favorite" function`)
      return false
    } else{
      const localStorage = window.localStorage;
      if(localStorage.getItem('favorite_pokemons')==null){
        localStorage.setItem('favorite_pokemons', JSON.stringify([]))
      }
      const favoritePokemons = JSON.parse(localStorage.getItem('favorite_pokemons'));
      setFavorites(favoritePokemons)  // get the list of favorite pokemons from localStorage
    }
  },[])


  const PokemonCard = ( pokemon ) => {
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
  const Cards = () =>{
    return(
      <Grid 
        container
        spacing={4}
        justify="center"
        className={classes.pokemonDicContainer}
        wrap={"wrap"}
      >
      {
        pokemonData.map(pokemon =>{
          if(showFavorites){
            return (
              pokemon.name.includes(filter) &&
              favorites.indexOf(pokemon.name)!==-1 &&
              PokemonCard(pokemon)
            )
          }else{
            return(
              pokemon.name.includes(filter) &&
              PokemonCard(pokemon)
            )
          }
        })
      }
      </Grid>
    )
  }

  return (
    <>
      <AppBar
        position="static"
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" component="h1">
            PokemonDic
          </Typography>
          <Typography component="div">
              <Button
                onClick={handleMenu}
              >
                My Favorites
                <Star className={classes.stars} />
              </Button>
              <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={()=>{setShowFavorites(false);setAnchorEl(null)}}>Show all</MenuItem>
                  <MenuItem onClick={()=>{setShowFavorites(true);setAnchorEl(null)}}>My favorites</MenuItem>
                </Menu>
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography
        component="div"
        className={classes.addition}>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <TextField 
            className={classes.searchInput}
            label="Search Pokemon"
            variant="standard"
            onChange={handleSearchChange}
          />
        </div>
        <Sort
          pokemonData={pokemonData}
          setPokemonData={setPokemonData}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </Typography>
      {
        !isLoading?
        (
          Cards()
        ): (
          <CircularProgress />
        )
      }
    </>
  )
}

export default Homepage;