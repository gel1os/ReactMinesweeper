import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getScore} from 'client/actions/highScoreActions'
import {formatDate, formatTime} from 'client/utils/grid-column-helpers'
import FilterIcon from './FilterIcon';
import {BEGINNER, NORMAL, EXPERT, PAGE_SIZE} from 'client/utils/constants';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.changeSorting = this.changeSorting.bind(this);
    this.changeComplexity = this.changeComplexity.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const {sortBy, sortDirection, complexity} = this.props;
    this.props.getScore({sortBy, sortDirection, complexity, page: 1});
  }

  changeSorting(sortBy) {
    let sortDirection = 'asc';
    if (sortBy === this.props.sortBy) {
      sortDirection = this.props.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    this.props.getScore({
      sortBy,
      sortDirection,
      complexity: this.props.complexity,
      page: 1,
    });
  }

  changeComplexity(newComplexity) {
    const {sortBy, sortDirection, complexity} = this.props;
    if (complexity === newComplexity) {
      return;
    }
    this.props.getScore({
      sortBy,
      sortDirection,
      complexity: newComplexity,
      page: 1,
    });
  }

  changePage(page) {
    let {sortBy, sortDirection, complexity} = this.props;
    this.props.getScore({
      sortBy,
      sortDirection,
      complexity,
      page,
    });
  }

  render() {
    const pageString = this.props.page.toString().padStart(2, '0')
    const itemsFrom = (this.props.page * PAGE_SIZE - PAGE_SIZE + 1).toString().padStart(2, '0');
    const itemsTo = this.props.page * PAGE_SIZE;
    return (
      <React.Fragment>
        <div className="complexity">
          <div
            className={`complexity__item ${this.props.complexity === BEGINNER ? 'selected' : ''}`}
            onClick={() => this.changeComplexity(BEGINNER)}
          >
            Beginner
          </div>
          <div
            className={`complexity__item ${this.props.complexity === NORMAL ? 'selected' : ''}`}
            onClick={() => this.changeComplexity(NORMAL)}
          >
            Normal
          </div>
          <div
            className={`complexity__item ${this.props.complexity === EXPERT ? 'selected' : ''}`}
            onClick={() => this.changeComplexity(EXPERT)}
          >
            Expert
          </div>
        </div>
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
              <div key={`${i}-time`} className="grid__cell">
                <div className="grid__cell__content">{formatTime(item.time)}</div>
              </div>
              <div key={`${i}-date`} className="grid__cell">
                <div className="grid__cell__content">{formatDate(item.date)}</div>
              </div>
            </div>
          )}
        </div>
        <div
          className='pagination'
          hidden={this.props.page === 1 && this.props.isLimitReached}
        >
          <button
            disabled={this.props.page === 1}
            onClick={() => this.changePage(this.props.page - 1)}
          >
            Here
          </button>
          <div>
            Page {pageString}: {itemsFrom}-{itemsTo}</div>
          <button
            disabled={this.props.isLimitReached}
            onClick={() => this.changePage(this.props.page + 1)}
          >
            There
          </button>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const {
    items,
    sortBy,
    sortDirection,
    complexity,
    page,
    isLimitReached,
  } = state.highScore;
  return { items, sortBy, sortDirection, complexity, page, isLimitReached };
}

const mapDispatchToProps = dispatch => {
  return {
    getScore: ({complexity, sortBy, sortDirection, page}) => {
      dispatch(getScore({complexity, sortBy, sortDirection, page}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);