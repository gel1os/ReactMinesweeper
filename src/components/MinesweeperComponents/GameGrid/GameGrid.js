import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from './Row';
import Cell from './Cell';
import GameStatus from './GameStatus';
import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from './../../../actions/minesweeperActions.js'

class GameGrid extends Component {
  render() {
    return (
      <div className="game-grid-wrapper">
        <GameStatus />
        <div className="game-grid">
          {this.buildGrid()}
        </div>
      </div>
    );
  };

  buildGrid() {
    const {handleCellOpening, handleClickOnOpenedCell, toggleFlag, gameState} = this.props;
    return this.props.rows.map((row, rowIndex) => {
      let cells = row.map((cell, cellIndex) =>
        <Cell
          key={`${rowIndex}.${cellIndex}`}
          cell={cell}
          gameState={gameState}
          handleCellOpening={handleCellOpening}
          toggleFlag={toggleFlag}
          handleClickOnOpenedCell={handleClickOnOpenedCell}
        />)
      return <Row key={`row${rowIndex}`}>{cells}</Row>
    });
  }

}

function mapStateToProps(state) {
  return {
    rows: state.gridState.rows,
    gameState: state.gameState,
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
