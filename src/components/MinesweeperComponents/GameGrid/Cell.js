import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from './../../../actions/minesweeperActions';

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.cell !== this.props.cell ||
      nextProps.gameState.paused !== this.props.gameState.paused;
  }

  render() {
    let { cell } = this.props;
    let cellClass = this.getCellClass(cell);

    return (
      <div
        className={`cell ${cellClass}`}
        data-col={cell.columnNumber}
        data-row={cell.rowNumber}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {this.showNearbyMines()}
      </div>
    )
  }

  handleClick() {
    let { cell, gameState, handleCellOpening, handleClickOnOpenedCell } = this.props;

    if (cell.isClosed && gameState.started && !cell.hasFlag && !gameState.paused) {
      handleCellOpening(cell);
    } else if (cell.minesNearby) {
      handleClickOnOpenedCell(cell)
    }
  }

  handleContextMenu(e) {
    let { cell, toggleFlag, gameState } = this.props;
    e.preventDefault();

    if (cell.isClosed && gameState.started && !gameState.paused) {
      toggleFlag(cell);
    }
  }

  showNearbyMines() {
    let { cell, gameState } = this.props;

    if (!gameState.paused && cell.minesNearby && !cell.isClosed && !cell.hasFlag) {
      return (
        <span className={`mines-number m${cell.minesNearby}`}>{cell.minesNearby}</span>
      );
    }

    return '';
  }

  getCellClass(cell) {
    let { gameState } = this.props;

    if (gameState.paused) {
      return '';
    }

    if (cell.hasMine && gameState.win) {
      return 'fa fa-flag-o';
    }

    if (cell.hasMine && gameState.finished) {
      let className = '';

      if (cell.blownMine) {
        className = 'red';
      }

      return `fa fa-bomb ${className}`;
    }

    if (cell.hasFlag) {

      if (!cell.hasMine && gameState.finished) {
        return 'fa fa-bomb crossed';
      }

      return 'fa fa-flag-o';
    }

    if (cell.isClosed) {
      return '';
    } else {
      if (cell.minesNearby && !cell.hasFlag) {
        return `opened mines${cell.minesNearby}`
      }
      return 'opened';
    }
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      handleCellOpening,
      handleClickOnOpenedCell,
      toggleFlag,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cell)