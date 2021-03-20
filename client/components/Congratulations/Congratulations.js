import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import HighScoreService from 'client/utils/high-score-service';
import {complexityPropType} from 'client/utils/prop-types';

const Congratulations = ({
  complexity,
  time,
  productivity,
  getProductivity,
  hideCongratulations,
}) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');

  useEffect(() => {
    if (productivity === null) {
      getProductivity({complexity, time});
    }
  }, []);

  const saveResult = async () => {
    await HighScoreService.saveScore({complexity, time, name});
    localStorage.setItem('name', name);
    hideCongratulations();
  };

  return (
    <div className="congratulations">
      <div className="congratulations__content">
        <h3>Congratulations!</h3>
        <div>
          You&apos;ve completed the game faster than <span className="productivity">{productivity}%</span> of people.
        </div>
        <div>
          Would you like to save the result?
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="congratulations__buttons">
          <button type="button" onClick={hideCongratulations}>Cancel</button>
          <button type="button" onClick={saveResult} disabled={!name.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
};

Congratulations.propTypes = {
  complexity: complexityPropType,
  time: PropTypes.number.isRequired,
  productivity: PropTypes.number,
  getProductivity: PropTypes.func.isRequired,
  hideCongratulations: PropTypes.func.isRequired,
};

export default Congratulations;