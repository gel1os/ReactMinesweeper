import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cell from './Cell';
import GameStatus from './GameStatus';
import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from './../../../actions/minesweeperActions.js'
import {hasTouchScreen} from './../../../utils/minesweeper-helpers';
import Dialog from '../../Dialog/Dialog';

class GameGrid extends Component {
  constructor() {
    super(); 
    const zoom = localStorage.getItem('zoom') ? +localStorage.getItem('zoom') : 1
    this.state = {
      pressed: false,
      zoom,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.recalculateZoomableBounds = this.recalculateZoomableBounds.bind(this);

    this.events = hasTouchScreen() ? {
        onContextMenu: e => e.preventDefault(),
        onTouchStart: this.handleButtonPress,
        onTouchEnd: this.handleButtonRelease,
        onTouchMove: this.handleTouchMove,
      } : {
        onClick: this.handleClick,
        onContextMenu: this.handleContextMenu,
      }

    this.resizeObserver = new ResizeObserver(() => {
      this.recalculateZoomableBounds();
    });
    this.mutationObserver = new MutationObserver(() => {
      this.recalculateZoomableBounds();
    });
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

  componentDidMount() {
    this.mutationObserver.observe(this.refs.gridWrapper, {attributes: true, attributeFilter: ["style"]});
    this.resizeObserver.observe(this.refs.gridWrapper);
  }

  componentWillUnmount() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
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

  handleZoom(direction) {
    const zoom = direction === '+' ? this.state.zoom += 0.1 : this.state.zoom -= 0.1;
    localStorage.setItem('zoom', zoom);
    this.setState({zoom});
  }

  recalculateZoomableBounds() {
    requestAnimationFrame(() => {
      const MARGIN = 16;
      const {width, height} = this.refs.gridWrapper.getBoundingClientRect();
      this.refs.gridWrapper.parentElement.style.width = width + MARGIN + 'px';
      this.refs.gridWrapper.parentElement.style.height = height + MARGIN + 'px';
    })
  }

  render() {
    const {zoom} = this.state;
    const {complexity, gameState} = this.props;
    const {paused, finished} = gameState;
    const zoomPercentage = Math.round(zoom * 100);
    return (
      <React.Fragment>
        <div className='zoom-wrapper'>
          <button
            disabled={zoomPercentage <= 50}
            onClick={() => this.handleZoom('-')}
          >
            −
          </button>
          <div className="zoom">
            <img src="icons/zoom.svg" alt="zoom" />
            <span>{zoomPercentage}%</span>
          </div>
          <button disabled={zoomPercentage >= 300} onClick={() => this.handleZoom('+')}>+</button>
        </div>
        <div className="zoomable">
          <div
            ref="gridWrapper"
            className={`game-grid-wrapper ${this.state.pressed ? 'pressed' : ''}`}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseUp}
            onTouchEnd={this.handleMouseUp}
            onTouchMove={this.handleMouseUp}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'left top'
            }}
          >
            <GameStatus />
            <div className='separator'></div>
            <div
              className={`game-grid grid-${complexity.toLowerCase()} ${paused ? 'paused' : ''} ${finished ? 'finished' : ''}`} 
              {...this.events}
            >
              {this.buildGrid()}
            </div>
          </div>
        </div>
        {this.props.opened && <Dialog />}
      </React.Fragment>
    );
  };
}

function mapStateToProps(state) {
  return {
    rows: state.gridState.rows,
    gameState: state.gameState,
    complexity: state.gameSettings.complexity,
    opened: state.dialog.opened,
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
