
import React, { useState, createContext, userContext, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { createBrowserHistory } from 'history';
import Homepage from './pokemon/homepage/homepage.js';
import Pokemon from './pokemon/pokemonDetails/pokemon.js';



const history = createBrowserHistory()

export default function App(){
  return(
    <div id="root">
        <Router history={history}>



          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Homepage} />
            <Route path="/:pokemonId?" component={Pokemon} />

          </Switch>

        </Router>

    </div>
    
  )
}

