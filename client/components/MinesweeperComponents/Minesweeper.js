import React, { Component } from 'react';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';

export default class Minesweeper extends Component {
  render() {
    const canUseDOM = !!(typeof window !== 'undefined' &&
      window.document && window.document.createElement);
    return (
      <div className="game">
        <GameComplexity />
        {canUseDOM ? <GameGrid /> : null}
      </div>
    );
  }
}