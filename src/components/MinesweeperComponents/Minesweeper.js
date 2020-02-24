import React, { Component } from 'react';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';

export default class extends Component {
  render() {
    return (
      <div>
        <h1 className="title">React Minesweeper</h1>
        <div className="description">
          <h2>Introduction</h2>
          <p>
            Minesweeper is a well-known puzzle game, which originates from the 1960s.
            Since that period of time it has been ported to a big variety of platforms.
            But I think that most of us recognize it from Microsoft Windows, as the game was an integral part of this operating system for multiple decades.
          </p>
          <p>
            Minesweeper comes in different sizes, shapes and even dimensions, as it's possible to find 3D implementations of this game.
            Current version is implemented using React.js + Redux and it also supports server-side rendering.
            I think that development of Minesweeper is a great way to learn new technologies and practise your programming skills.
            As a result you will get valuable experience and a real game which is fun to play.
            By the way, the code for this game can be found on GitHub, the link to repository is available below.
          </p>
          <h2>How to play</h2>
          <p>
            There are 3 different levels of complexity to choose from:
            <ul>
              <li>Beginner, 9x9 grid, 10 mines;</li>
              <li>Normal, 16x16 grid, 40 mines;</li>
              <li>Expert, 30x20 grid, 99 mines;</li>
            </ul>
            Feel free to choose any level you wish, but I encourage you to become an expert.
          </p>
          <p>
            The main goal of the game is to locate all the mines in the field and not to explode on the way.
            Use left-click on closed cells to open them and right-click to set/unset flag.
            By setting a flag you endicate cell as potentially explosive. In order to win all such cels should be marked.
            Opened cells might contain numbers, these numbers indicate the amount of mines, located in surrounding cells.
            Use those numbers to predict positions of cells with mines.
            In addition to that, clicking on a number would open all closed surrounding cells,
            but this will work only in case when the amount of surrounding flags equals to the amount of surrounding mines.
            This is done to speed up the process, as multiple cells can be opened simultaniously rather then clicking on each one separately.
            There is also a handy "pause" button in case you're interrupted.
            If you step on a mine the game is over, but no worries, you can try again and again until you make it.
          </p>
          <p>
            I guess that's it, happy playing!
            In case you have any suggestions, feature requests or bugs, please contact me via GitHub.
            Cheers!
          </p>
        </div>
        <GameComplexity />
        <GameGrid />
      </div>
    );
  }
}