import React, { Component } from 'react';

import { connect } from 'react-redux';
import Timer from './../Timer';

class GameStatus extends Component {
  render() {
    const { gameState } = this.props;

    return (
      <div>
        {gameState.started &&
          <div className="game-result">
            {gameState.finished
              ? gameState.win
                ? <React.Fragment>You win! <i className="fa fa-smile-o"></i></React.Fragment>
                : <React.Fragment>You lose! <i className="fa fa-frown-o"></i></React.Fragment>
              : gameState.paused
                ? <React.Fragment>Game paused:</React.Fragment>
                : <React.Fragment>Game in progress:</React.Fragment>
            }
          </div>
        }
        <div>
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

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
  }
}

export default connect(mapStateToProps)(GameStatus)