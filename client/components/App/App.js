import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Minesweeper from 'client/components/MinesweeperComponents/Minesweeper';
import Instructions from 'client/components/Instructions';
import Highscore from 'client/components/HighScore/HighScore';

const App = () =>
  <>
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
  </>

export default App;