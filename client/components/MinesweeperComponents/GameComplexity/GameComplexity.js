import React from 'react';
import PropTypes from 'prop-types';

import {complexities} from 'client/utils/constants.js';

const GameComplexity = ({gameSettings, changeGameComplexity}) =>
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
  </div>;

GameComplexity.propTypes = {
  gameSettings: PropTypes.object.isRequired,
  changeGameComplexity: PropTypes.func.isRequired,
};

export default GameComplexity;