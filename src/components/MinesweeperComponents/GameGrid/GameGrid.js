import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cell from './Cell';
import GameStatus from './GameStatus';
import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from './../../../actions/minesweeperActions.js'

class GameGrid extends Component {
  render() {
    return (
      <div className="game-grid-wrapper">
        <GameStatus />
        <div
          className={`game-grid grid-${this.props.complexity}`} 
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu}
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
    const { toggleFlag } = this.props;
    e.preventDefault();

    if (!this.gameInProgress) {
      return;
    }

    const cell = this.getCell(e);

    if (cell.isClosed) {
      toggleFlag(cell);
    }
  }

  getCell(e) {
    const { rows } = this.props;
    const cellElement = event.target.classList.contains('mines-number') ? e.target.parentElement : e.target;
    const row = cellElement.getAttribute('data-row');
    const column = cellElement.getAttribute('data-col');
    return rows[row][column];
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
