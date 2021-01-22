import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getScore} from '../../actions/highScoreActions'
import {formatDate, formatTime, formatComplexity} from '../../utils/grid-column-helpers'
import FilterIcon from './FilterIcon';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.changeSorting = this.changeSorting.bind(this);
  }
  componentDidMount() {
    const {sortBy, sortDirection} = this.props;
    this.props.getScore({sortBy, sortDirection});
  }

  changeSorting(sortBy) {
    let sortDirection = 'asc';
    if (sortBy === this.props.sortBy) {
      sortDirection = this.props.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.props.getScore({sortBy, sortDirection});
  }

  render() {
    return (
      <div className="grid">
        <div className="grid__header-cell">
          <div className="grid__cell__content">Name</div>
          <FilterIcon
            name="name"
            sortBy={this.props.sortBy}
            sortDirection={this.props.sortDirection}
            changeSorting={this.changeSorting}
          />
        </div>
        <div className="grid__header-cell">
          <div className="grid__cell__content">Complexity</div>
          <FilterIcon
            name="complexity"
            sortBy={this.props.sortBy}
            sortDirection={this.props.sortDirection}
            changeSorting={this.changeSorting}
          />
        </div>
        <div className="grid__header-cell">
          <div className="grid__cell__content">Time</div>
          <FilterIcon
            name="time"
            sortBy={this.props.sortBy}
            sortDirection={this.props.sortDirection}
            changeSorting={this.changeSorting}
          />
        </div>
        <div className="grid__header-cell">
          <div className="grid__cell__content">Date</div>
          <FilterIcon
            name="date"
            sortBy={this.props.sortBy}
            sortDirection={this.props.sortDirection}
            changeSorting={this.changeSorting}
          />
        </div>
        {this.props.items && this.props.items.map((item, i) =>
          <div className="grid__row" key={i}>
            <div key={`${i}-name`} className="grid__cell">
              <div className="grid__cell__content">{item.name}</div>
            </div>
            <div key={`${i}-complexity`} className="grid__cell">
              <div className="grid__cell__content">{formatComplexity(item.complexity)}</div>
            </div>
            <div key={`${i}-time`} className="grid__cell">
              <div className="grid__cell__content">{formatTime(item.time)}</div>
            </div>
            <div key={`${i}-date`} className="grid__cell">
              <div className="grid__cell__content">{formatDate(item.date)}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, sortBy, sortDirection } = state.highScore;
  return { items, sortBy, sortDirection };
}

const mapDispatchToProps = dispatch => {
  return {
    getScore: ({sortBy, sortDirection}) => {
      dispatch(getScore({sortBy, sortDirection}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);