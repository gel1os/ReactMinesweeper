import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Minesweeper from './../MinesweeperComponents/Minesweeper';
import { hot } from 'react-hot-loader'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={Minesweeper} />
        <a
          href="https://github.com/gel1os/ReactMinesweeper"
          target="_blank"
          className="view-github"
          rel="noopener"
        >
          <img src="icons/github.svg" alt="github logo"/>
          <span>View on GitHub</span>
        </a>
      </React.Fragment>
    )
  }
}
export default hot(module)(App);