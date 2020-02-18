import React, { Component } from 'react';

import { connect } from 'react-redux';
import Timer from './../Timer';

class GameStatus extends Component {
  render() {
    const { gameState, gameSettings } = this.props;

    return (
      <div>
        {gameState.started
          ? gameState.finished
            ? gameState.win
              ? <span className="game-result">You win! <i className="fa fa-smile-o"></i></span>
              : <span className="game-result">You lose! <i className="fa fa-frown-o"></i></span>
            : gameState.paused
              ? <span className="game-result">Game paused... <i className="fa fa-meh-o"></i></span>
              : <span className="game-result">Game in progress... <i className="fa fa-meh-o"></i></span>
          : ''
        }
        <div style={{ maxWidth: gameSettings.width * 20 + 'px' }}>
          <span className="time-spent">
            <i className="fa fa-clock-o"></i>
            {' '}
            {gameState.started ? <Timer /> : 0}
          </span>
          <span className="flags-left pull-right">
            <i className="fa fa-flag"></i> {gameState.started ? gameState.flagsLeft : 0}
          </span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, own) {
  return {
    gameSettings: state.gameSettings,
    gameState: state.gameState,
  }
}

export default connect(mapStateToProps)(GameStatus)