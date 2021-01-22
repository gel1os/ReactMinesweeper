import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideDialog } from '../../actions/dialogActions';
import HighScoreService from '../../utils/high-score-service';

class Dialog extends Component {
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
    const {complexity, time} = this.props;
    const {productivity} = await HighScoreService.checkProductivity({time, complexity});
    this.setState({
      productivity: productivity === null ? 100 : productivity,
    });
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
    this.props.hideDialog();
  }

  render() {
    return (
      <div className="dialog">
        <div className="dialog__backdrop" onClick={this.props.hideDialog}></div>
        <div className="dialog__content">
          <h3>Congratulations!</h3>
          <div>
            You've completed the game faster than <span className="productivity">{this.state.productivity}%</span> of people.
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
          <div className="dialog__buttons">
            <button type="button" onClick={this.props.hideDialog}>Cancel</button>
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
  return { complexity, time: seconds };
}

const mapDispatchToProps = dispatch => {
  return {
    hideDialog: () => {
      dispatch(hideDialog());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);