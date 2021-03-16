import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Timer from './../Timer';
import NumberBoard from './NumberBoard';
import { changeGameComplexity, pauseGame } from 'client/actions/minesweeperActions.js'
import {hasTouchScreen} from 'client/utils/minesweeper-helpers';

class GameStatus extends Component {
  constructor() {
    super();

    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);

    this.events = hasTouchScreen() ? {
      pause: {
        onTouchEnd: this.pause,  
      },
      restart: {
        onTouchEnd: this.restart,
      }
    } : {
      pause: {
        onClick: this.pause,  
      },
      restart: {
        onClick: this.restart,
      }
    } 
  }

  pause() {
    const { gameState, pauseGame} = this.props;
    const gameStarted = gameState.started && gameState.minesSet;
    if (gameStarted && gameState.minesSet && !gameState.finished) {
      pauseGame();
    }
  }

  restart() {
    const { gameState, changeGameComplexity, gameSettings } = this.props;

    if (gameState.paused) {
      this.pause();
      return;
    }

    if (gameState.started && gameState.minesSet) {
      changeGameComplexity(gameSettings.complexity);
    }
  }

  render() {
    const { gameState } = this.props;

    const isWin = gameState.finished && gameState.win;
    const isLose = gameState.finished && !gameState.win;

    return (
      <div className="status-wrapper">
        <NumberBoard number={gameState.started ? gameState.flagsLeft : 0} />
        <div
          className="game-result"
          {...this.events.restart}
        >
          <img src="icons/smile.svg" className={`smile-icon ${gameState.finished || gameState.paused ? 'hidden' : ''}`} alt="smiling emoji" />
          <img src="icons/surprised.svg" className={`surprised-icon ${gameState.finished || gameState.paused ? 'hidden' : ''}`} alt="surprised emoji" />
          <img src="icons/cool.svg" className={isWin ? '' : 'hidden'} alt="cool emoji in sunglasses" />
          <img src="icons/frown.svg" className={isLose ? '' : 'hidden'} alt="frown" />
          <img src="icons/sleeping.svg" className={gameState.paused ? '' : 'hidden'} alt="sleeping emoji" />
        </div>
        <div
          className="time-spent"
          {...this.events.pause}
        >
          {gameState.started ? <Timer /> : <span>0</span>}
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    const { gameState } = this.props;
    if (gameState.paused) {
      return;
    }
    this.pause();
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    gameSettings: state.gameSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      changeGameComplexity,
      pauseGame,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus)