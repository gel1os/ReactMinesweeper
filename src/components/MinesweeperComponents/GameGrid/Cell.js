import React, { Component } from 'react';

export default class Cell extends Component {
  render() {
    const { cell } = this.props;
    const cellClass = this.getCellClass(cell);

    return (
      <div
        className={`cell ${cellClass}`}
        data-col={cell.columnNumber}
        data-row={cell.rowNumber}
      >
        {this.showNearbyMines()}
      </div>
    )
  }

  showNearbyMines() {
    const { cell, gameState } = this.props;

    if (gameState.paused) {
      return '';
    }

    if (!cell.isClosed && !cell.hasFlag && cell.minesNearby) {
      return (
        <div className={`mines-number m${cell.minesNearby}`}>{cell.minesNearby}</div>
      );
    }

    return '';
  }

  getCellClass(cell) {
    const { gameState } = this.props;

    if (gameState.paused) {
      return '';
    }

    if (cell.hasMine && gameState.win) {
      return 'flag';
    }

    if (cell.hasMine && gameState.finished) {
      if (cell.hasFlag) {
        return 'flag';
      }
      return `mine opened ${cell.blownMine ? 'red' : ''}`;
    }

    if (cell.hasFlag) {
      if (!cell.hasMine && gameState.finished) {
        return 'mine cross opened';
      }

      return 'flag';
    }

    if (cell.isClosed) {
      return '';
    } else {
      if (cell.minesNearby && !cell.hasFlag) {
        return `opened mines${cell.minesNearby}`
      }
      return 'opened empty';
    }
  }
}