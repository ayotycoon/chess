import logo from './logo.svg';
import { BrowserRouter, Link, Redirect, Route, Router, Switch } from 'react-router-dom'
import ChessGame from './chess';
import Home from './Home';
import CheckersGame from './checkers';
import NavBar from './misc/Navbar';
import {useContext, useState} from "react";
import {StateContext, StateProvider} from "./misc/StateProvider";
import StolenIn60SecondsGame from "./StolenIn60Seconds";

function App() {
  const {showNav, setShowNav} = useContext(StateContext);

  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <NavBar/>
      <Switch>
        <Route path="/chess" component={ChessGame} />
        <Route path="/checkers" component={CheckersGame} />
        <Route path="/stolen-in-60-seconds" component={StolenIn60SecondsGame} />
        <Route path="/" component={Home} />
      </Switch>

    </BrowserRouter>

  );
}

export default App;
