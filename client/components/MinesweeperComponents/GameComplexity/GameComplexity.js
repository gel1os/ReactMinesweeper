import React, { Component } from 'react';
import {complexities} from './../../../utils/constants.js'

export default class GameComplexity extends Component {
  render() {
    const {gameSettings, changeGameComplexity} = this.props;
    return (
      <div className="complexity-wrapper">
        <div className="select-complexity">Select complexity:</div>
        {complexities.map((complexity, i) =>
          <div className="radio" key={i}>
            <label>
              <input
                type="radio"
                value={complexity.value}
                onChange={e => changeGameComplexity(e.target.value)}
                checked={gameSettings.complexity === complexity.value}
              />
              {complexity.label}
            </label>
          </div>
        )}
      </div>
    );
  };
}
