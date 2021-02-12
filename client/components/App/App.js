import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Minesweeper from './../MinesweeperComponents/Minesweeper';
import Instructions from '../Instructions';
import Highscore from '../HighScore/HighScore';
export default class App extends Component {
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
            <NavLink to="/instructions">How to play</NavLink>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Minesweeper} />
            <Route path="/score" component={Highscore} />
            <Route path="/instructions" component={Instructions} />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}
