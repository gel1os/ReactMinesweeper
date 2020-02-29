import React, { Component } from 'react';
import {complexities} from './../../../utils/constants.js'

export default class GameComplexity extends Component {
  get gameInProgress() {
    const {gameState} = this.props;
    return this.gameStarted && !gameState.finished;
  }

  get gameStarted() {
    const {gameState} = this.props;
    return gameState.started && gameState.minesSet;
  }

  render() {
    const { gameSettings, gameState, changeGameComplexity, pauseGame } = this.props;

    return (
      <div className="complexity-wrapper">
        <div className="select-complexity">Select complexity:</div>
        {this.renderRadioButtons('game-complexity')}
        <div className="btns">
          <div
            className="btn btn-success start-game"
            disabled={!this.gameStarted}
            onClick={() => this.gameStarted && changeGameComplexity(gameSettings.complexity)}
          >
            Restart
          </div>
          <div
            className="pause-game btn btn-warning"
            disabled={!this.gameInProgress}
            onClick={() => this.gameInProgress && pauseGame()}
          >
            {gameState.paused ? 'Resume' : 'Pause'}
          </div>
        </div>
      </div>
    );
  };

  renderRadioButtons(name) {
    const {gameSettings, changeGameComplexity} = this.props;
    return complexities.map((complexity, i) => {
      return (
        <div className="radio" key={i}>
          <label>
            <input type="radio"
              name={name}
              value={complexity.value}
              onChange={e => changeGameComplexity(e.target.value)}
              checked={gameSettings.complexity === complexity.value}
            />
            {complexity.label}
          </label>
        </div>
      )
    });
  }
}
