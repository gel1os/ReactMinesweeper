import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideCongratulations } from 'client/actions/congratulationsActions';
import { getProductivity } from 'client/actions/highScoreActions';
import HighScoreService from 'client/utils/high-score-service';

class Congratulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productivity: null,
      name: localStorage.getItem('name') || '',
    };

    this.onChange = this.onChange.bind(this);
    this.saveResult = this.saveResult.bind(this);
  }

  async componentDidMount() {
    const {complexity, time, getProductivity, productivity} = this.props;
    if (productivity === null) {
      getProductivity({complexity, time});
    }
  }

  onChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  async saveResult() {
    const data = {
      complexity: this.props.complexity,
      time: this.props.time,
      name: this.state.name,
    }
    await HighScoreService.saveScore(data);
    localStorage.setItem('name', this.state.name);
    this.props.hideCongratulations();
  }

  render() {
    return (
      <div className="congratulations">
        <div className="congratulations__content">
          <h3>Congratulations!</h3>
          <div>
            You've completed the game faster than <span className="productivity">{this.props.productivity}%</span> of people.
          </div>
          <div>
            Would you like to save the result?
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <div className="congratulations__buttons">
            <button type="button" onClick={this.props.hideCongratulations}>Cancel</button>
            <button type="button" onClick={this.saveResult} disabled={!this.state.name}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {complexity} = state.gameSettings;
  const {seconds} = state.timerState;
  const {productivity} = state.highScore;
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