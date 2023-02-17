import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Game" component={ Game } />
      <Route exact path="/Config" component={ Config } />
      <Route exact path="/Feedback" component={ Feedback } />
      <Route exact path="/Ranking" component={ Ranking } />
    </Switch>
  );
}
