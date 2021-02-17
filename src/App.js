
import React, { useState, createContext, userContext, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { createBrowserHistory } from 'history';
import Homepage from 'pages/homepage/homepage.js';
import Pokemon from 'pages/pokemonDetails/pokemon.js';


export default function App(){
  return(
    <div id="root">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Homepage} />
            <Route path="/:pokemonId" component={Pokemon} />

          </Switch>

        </Router>

    </div>
    
  )
}

