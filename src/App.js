
import React, { useState, createContext, userContext, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { createBrowserHistory } from 'history';
import Homepage from 'pages/homepage/homepage.js';
import Pokemon from 'pages/homepage/components/pokemon.js';


export default function App() {
  return (
    <div id="root">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />

        </Switch>

      </Router>

    </div>

  )
}

