import React, { Component } from 'react';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';

export default class extends Component {
  render() {
    return (
      <div>
        <h2>Minesweeper</h2>
        <GameComplexity />
        <GameGrid />
      </div>
    );
  }
}