import React, { Component } from 'react';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';

export default class extends Component {
  render() {
    return (
      <div>
        <h1 className="title">React Minesweeper</h1>
        <GameComplexity />
        <GameGrid />
      </div>
    );
  }
}