import React, { Component } from 'react';

import { connect } from 'react-redux';
import Timer from './../Timer';

class GameStatus extends Component {
  render() {
    const { gameState } = this.props;

    return (
      <div>
        <div className="status-wrapper">
          <div className="time-spent">
            <img src="icons/clock.svg" alt="clock" />
            {gameState.started ? <Timer /> : <span>0</span>}
          </div>
          {gameState.started && gameState.finished &&
            <div className="game-result">
              {gameState.win
                ? <img src="icons/smile.svg" alt="smile" />
                : <img src="icons/frown.svg" alt="frown" />
              }
            </div>
          }
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