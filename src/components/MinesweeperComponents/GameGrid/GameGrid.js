import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cell from './Cell';
import GameStatus from './GameStatus';
import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from './../../../actions/minesweeperActions.js'
import {hasTouchScreen} from './../../../utils/minesweeper-helpers';

class GameGrid extends Component {
  render() {
    const {complexity, gameState} = this.props;
    return (
      <div className="game-grid-wrapper">
        <GameStatus />
        <div
          className={`game-grid grid-${complexity} ${gameState.paused ? 'paused' : ''}`} 
          {...this.events}
        >
          {this.buildGrid()}
        </div>
      </div>
    );
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.events = hasTouchScreen() ? {
        onContextMenu: e => e.preventDefault(),
        onTouchStart: this.handleButtonPress,
        onTouchEnd: this.handleButtonRelease,
        onTouchMove: this.handleTouchMove,
      } : {
        onClick: this.handleClick,
        onContextMenu: this.handleContextMenu,
      }
  }

  buildGrid() {
    const {gameState, rows} = this.props;
    return rows.flatMap(cell => cell).map((cell, cellIndex) =>
      <Cell
        key={cellIndex}
        cell={cell}
        gameState={gameState}
      />
    )
  }

  get gameInProgress() {
    const { gameState } = this.props;
    return gameState.started && !gameState.paused;
  }

  handleClick(e) {
    const { handleCellOpening, handleClickOnOpenedCell, rows } = this.props;
    const cell = this.getCell(e);

    if (!this.gameInProgress || cell.hasFlag) {
      return;
    }

    if (cell.isClosed) {
      handleCellOpening(cell);
    } else if (cell.minesNearby) {
      handleClickOnOpenedCell(cell, rows)
    }
  }

  handleContextMenu(e) {
    const { toggleFlag, gameState } = this.props;
    if (e.cancelable) {
      e.preventDefault();
    }

    if (!this.gameInProgress || !gameState.minesSet) {
      return;
    }

    const cell = this.getCell(e);

    if (cell.isClosed) {
      toggleFlag(cell);
    }
  }

  getCell(e) {
    const { rows } = this.props;
    const cellElement = e.target.classList.contains('mines-number') ? e.target.parentElement : e.target;
    const row = cellElement.getAttribute('data-row');
    const column = cellElement.getAttribute('data-col');
    return rows[row][column];
  }

  handleButtonPress(e) {
    e.persist();
    this.isLongPress = false;
    this.longPressTimeout = setTimeout(() => {
      this.handleContextMenu(e);
      this.isLongPress = true;
    }, 300);
  }

  handleButtonRelease(e) {
    if (!this.longPressTimeout) {
      return;
    }
    this.clearLongPressTimeout();
    if (!this.isLongPress) {
      this.handleClick(e);
    }
  }

  handleTouchMove() {
    if (this.longPressTimeout) {
      this.clearLongPressTimeout();
    }
  };

  clearLongPressTimeout() {
    clearTimeout(this.longPressTimeout);
    this.longPressTimeout = null;
  }
}

function mapStateToProps(state) {
  return {
    rows: state.gridState.rows,
    gameState: state.gameState,
    complexity: state.gameSettings.complexity,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      handleCellOpening,
      toggleFlag,
      handleClickOnOpenedCell,
    }, dispatch)
  }
}

GameGrid = connect(mapStateToProps, mapDispatchToProps)(GameGrid);

export default GameGrid;
