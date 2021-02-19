import React, { useEffect, useRef, useState } from 'react';
import { fade, AppBar, CircularProgress, makeStyles, TextField, Toolbar, Button, Typography, Menu, MenuItem, Popover } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search"

import { getPokemonList} from "../../utils";

import './homepage.scss';
import { Star } from '@material-ui/icons';

import { Sort } from './components/sort'
import Cards from './components/cards';

import hanalei from 'common/fonts/Hanalei-Regular.ttf'
import stalinistOne from 'common/fonts/StalinistOne-Regular.ttf'
import { Fragment } from 'react';
import Pokemon from './components/pokemon';

const useStyle = makeStyles(theme => ({
  appbar:{
    backgroundColor: "#524da2",
    [theme.breakpoints.up('sm')]:{
      minWidth: "550px",
    },
  },
  title: {
    fontFamily: `'stalinist One','cursive'`,
    fontSize: "1.5rem"
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
    marginBottom: "2rem",
    // width: "100%"
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px"
  },
  searchInput: {
    width: "200px",
    margin: "5px"
  },
  addition: {
    [theme.breakpoints.up('sm')]:{
      display: "flex",
      alignItems: "baseline",
      minWidth: "650px"
    },
  },  
  stars: {
    color: "#ffd700"
  },

}))


const Homepage = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const localStorage = window.localStorage;
  const classes = useStyle();

  const [ pokemonData, setPokemonData ] = useState([])
  const [ filter, setFilter ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)  // is the pokemonData has been loaded
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

  const toggleFavorites = ( e, id ) =>{
    e.stopPropagation();
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(id);
    if(index!==-1){
      newFavorites.splice(index,1)
    } else{
      newFavorites.push(id);
    }
    // console.log(newFavorites);
    setFavorites(newFavorites.sort())
    localStorage.setItem('favorite_pokemons', JSON.stringify(newFavorites))
  }

  // get pokemon data
  useEffect(()=>{
    getPokemonList( setIsLoading ).then((pokemonList)=>{

      setPokemonData(pokemonList);
      console.log(pokemonList);
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

  const [ modalId, setModalId ] = useState(null)  // The id of the pokemon shown in the modal


  return (
    <div className="homepage" >
      {/* <AppBar
        position="static"
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" component="h1" className={classes.title} >
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
      </AppBar> */}
      <header className="navbar">
        <div className="navbar__inner">
          <a  className="navbar__inner__title" href='/'>
            <h1 className="navbar__inner__title">PokemonDic</h1>
          </a>
          <div className="navbar__inner__myFavorites">
            <Button
              onClick={handleMenu}
              className={classes.button}
            >
              <span className="navbar__inner__myFavorites__text">My Favorites</span>
              <Star className={classes.stars} />
            </Button>
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{setShowFavorites(false);setAnchorEl(null)}}>Show all</MenuItem>
              <MenuItem onClick={()=>{setShowFavorites(true);setAnchorEl(null)}}>My favorites</MenuItem>
            </Popover>
          </div>
        </div>
      </header>
      <Typography
        component="div"
        className={classes.addition}
      >
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
          <Cards pokemonData={pokemonData}
            favorites={favorites}
            showFavorites={showFavorites}
            sortBy={sortBy}
            toggleFavorites={toggleFavorites}
            filter={filter}
            setModalId={setModalId}
          />
        ): (
          <CircularProgress />
        )
      }
      <Pokemon
        modalId={modalId}
        setModalId={setModalId}
      />
    </div>
  )
}

export default Homepage;