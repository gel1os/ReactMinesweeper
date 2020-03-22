import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Minesweeper from './../MinesweeperComponents/Minesweeper';
import { hot } from 'react-hot-loader'
import About from '../About';
import Instructions from '../Instructions';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="title">React Minesweeper</h1>
        <main>
          <Switch>
            <Route exact path="/" component={Minesweeper} />
            <Route path="/about" component={About} />
            <Route path="/instructions" component={Instructions} />
          </Switch>
        </main>
        <footer>
          <NavLink to="/" exact className="btn">Game</NavLink>
          <NavLink to="/about" className="btn">About</NavLink>
          <NavLink to="/instructions" className="btn">How to play</NavLink>
          <a
            href="https://github.com/gel1os/ReactMinesweeper"
            target="_blank"
            className="btn view-github"
            rel="noopener"
          >
            <img src="icons/github.svg" alt="github logo"/>
            <span>View on GitHub</span>
          </a>
        </footer>
      </React.Fragment>
    )
  }
}
export default hot(module)(App);