import React, { Component } from 'react';
import {complexities} from './../../../utils/constants.js'

export default class GameComplexity extends Component {
  get gameInProgress() {
    let {gameState} = this.props;
    return gameState.started && !gameState.finished;
  }

  render() {
    let { gameSettings, gameState, changeGameComplexity, chooseGameComplexity, pauseGame } = this.props;

    return (
      <div>
        <h4>Select Game Complexity</h4>
        {this.renderRadioButtons('game-complexity')}
        <div className="btns">
          <div
            className="btn btn-success start-game"
            onClick={() => chooseGameComplexity(gameSettings.complexity)}
          >
            {this.gameInProgress ? 'Restart' : 'Start'} Game
          </div>
          {this.gameInProgress ?
            <React.Fragment>
              <div
                className="pause-game btn btn-warning"
                onClick={pauseGame}
              >
                {gameState.paused ? 'Resume' : 'Pause'} Game
              </div>
              <div
                className="finish-game btn btn-primary"
                onClick={() => changeGameComplexity(gameSettings.complexity)}
              >
                Finish Game
              </div>
            </React.Fragment> : ''
          }
          </div>
      </div>
    );
  };

  renderRadioButtons(name) {
    let {gameSettings, changeGameComplexity} = this.props;
    return complexities.map((complexity, i) => {
      return (
        <div className="radio" key={i}>
          <label>
            <input type="radio"
              name={name}
              value={complexity.value}
              onChange={e => changeGameComplexity(e.target.value)}
              checked={gameSettings.complexity === complexity.value}
              disabled={this.gameInProgress}
            />
            {complexity.label}
          </label>
        </div>
      )
    });
  }
}
