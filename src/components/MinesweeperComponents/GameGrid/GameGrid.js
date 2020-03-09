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
      <div
        className={`game-grid-wrapper ${this.state.pressed ? 'pressed' : ''}`}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
        onTouchEnd={this.handleMouseUp}
        onTouchMove={this.handleMouseUp}
      >
        <GameStatus />
        <div
          className={`game-grid grid-${complexity.toLowerCase()} ${gameState.paused ? 'paused' : ''}`} 
          {...this.events}
        >
          {this.buildGrid()}
        </div>
      </div>
    );
  };

  constructor() {
    super();
    this.state = {pressed: false};

    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

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
    return gameState.started && !gameState.paused && !gameState.finished;
  }

  handleClick(e) {
    const { handleCellOpening, handleClickOnOpenedCell, rows } = this.props;
    const cell = this.getCell(e);

    if (!cell || !this.gameInProgress || cell.hasFlag) {
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

    if (cell && cell.isClosed) {
      toggleFlag(cell);
    }
  }

  getCell(e) {
    const { rows } = this.props;
    const cellElement = e.target.classList.contains('mines-number') ? e.target.parentElement : e.target;
    const row = cellElement.getAttribute('data-row');
    const column = cellElement.getAttribute('data-col');

    if (row === null || column === null) {
      return;
    }

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

  handleMouseDown(e) {
    if (!this.gameInProgress) {
      return;
    }
    const {classList} = e.target; 
    if (classList.contains('cell') || classList.contains('mines-number')) {
      this.setState({
        pressed: true,
      })
    }
  }

  handleMouseUp() {
    this.setState({
      pressed: false,
    })
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
