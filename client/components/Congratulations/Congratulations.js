import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { hideCongratulations, getProductivity } from 'client/actions/congratulationsActions';
import HighScoreService from 'client/utils/high-score-service';

const Congratulations = ({
  complexity,
  time,
  productivity,
  getProductivity,
  hideCongratulations,
}) => {
  const [name, setName] = useState(localStorage.getItem('name') || '')

  useEffect(() => {
    if (productivity === null) {
      getProductivity({complexity, time});
    }
  }, [])

  const saveResult = async () => {
    await HighScoreService.saveScore({complexity, time, name});
    localStorage.setItem('name', name);
    hideCongratulations();
  }

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
}

function mapStateToProps(state) {
  const {complexity} = state.gameSettings;
  const {seconds} = state.timerState;
  const {productivity} = state.congratulations;
  return { complexity, time: seconds, productivity };
}

const mapDispatchToProps = dispatch => {
  return {
    hideCongratulations: () => {
      dispatch(hideCongratulations());
    },
    getProductivity: ({time, complexity}) => {
      dispatch(getProductivity({time, complexity}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Congratulations);