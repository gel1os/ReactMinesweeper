import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Minesweeper from './../MinesweeperComponents/Minesweeper';
import { hot } from 'react-hot-loader'
import About from '../About';
import Instructions from '../Instructions';
import Highscore from '../HighScore/HighScore';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <NavLink to="/" exact className='title'>
            Minesweeper
          </NavLink>
          <div className="navigation">
            <NavLink to="/" exact>Game</NavLink>
            <NavLink to="/score" exact>High score</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/instructions">How to play</NavLink>
            <a
              href="https://github.com/gel1os/ReactMinesweeper"
              target="_blank"
              className="view-github"
              rel="noopener"
            >
              <img src="icons/github.svg" alt="github logo"/>
              <span>View on GitHub</span>
            </a>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Minesweeper} />
            <Route path="/score" component={Highscore} />
            <Route path="/about" component={About} />
            <Route path="/instructions" component={Instructions} />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}
export default hot(module)(App);
