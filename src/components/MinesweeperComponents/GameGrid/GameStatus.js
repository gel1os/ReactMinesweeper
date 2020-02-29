import React, { Component } from 'react';

import { connect } from 'react-redux';
import Timer from './../Timer';

class GameStatus extends Component {
  render() {
    const { gameState } = this.props;

    const isWin = gameState.finished && gameState.win;
    const isLose = gameState.finished && !gameState.win;

    return (
      <div>
        <div className="status-wrapper">
          <div className="time-spent">
            <img src="icons/clock.svg" alt="clock" />
            {gameState.started ? <Timer /> : <span>0</span>}
          </div>
          <div className="game-result">
            <img src="icons/smile.svg" className={`smile-icon ${gameState.finished ? 'hidden' : ''}`} alt="smile" />
            <img src="icons/surprised.svg" className={`surprised-icon ${gameState.finished ? 'hidden' : ''}`} alt="surprised smile" />
            <img src="icons/cool.svg" className={isWin ? '' : 'hidden'} alt="cool smile in sunglasses" />
            <img src="icons/frown.svg" className={isLose ? '' : 'hidden'} alt="frown" />
          </div>
          <div className="flags-left">
            <img src="icons/flag.svg" alt="flag" />
            <span>{gameState.started ? gameState.flagsLeft : 0}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
  }
}

export default connect(mapStateToProps)(GameStatus)