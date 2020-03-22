import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
class About extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>About</h2>
        <p>
          Hi, thank you for visiting this page!
        </p>
        <p>
          Minesweeper is a well-known puzzle game, which originates from the 1960s.<br/>
          Since then it has been ported to a big variety of platforms.<br/>
          But most of us recognize it from Microsoft Windows, as the game was an integral part of this operating system for multiple decades.
        </p>
        <p>
          Minesweeper comes in different sizes, shapes and even dimensions, as it's possible to find 3D implementations of this game.<br/>
          Current version is implemented using React.js + Redux and it supports server-side rendering.<br/>
          I think that development of Minesweeper is a great way to learn new technologies and practice your programming skills.<br/>
          As a result you will get valuable experience and a real game which is fun to play.
        </p>
        <p>
          Have fun and don't get blown!<br/> 
          In case you have any suggestions, feature requests or bugs, feel free to contact me via GitHub.<br/>
          Cheers!
        </p>
      </React.Fragment>
    )
  }
}
export default hot(module)(About);