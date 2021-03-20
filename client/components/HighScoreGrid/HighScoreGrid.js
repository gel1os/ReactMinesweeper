import React, { useEffect } from 'react';
import {formatDate, formatTime} from 'client/utils/grid-column-helpers';
import {PAGE_SIZE} from 'client/utils/constants';
import FilterIcon from './FilterIcon';
import ComplexityTabs from './ComplexityTabs';

const HighScoreGrid = ({getScore, highScore}) => {

  useEffect(() => {
    const {sortBy, sortDirection, complexity} = highScore;
    getScore({sortBy, sortDirection, complexity, page: 1});
  }, []);

  const changeSorting = (sortBy) => {
    let sortDirection = 'asc';
    if (sortBy === highScore.sortBy) {
      sortDirection = highScore.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    getScore({
      sortBy,
      sortDirection,
      complexity: highScore.complexity,
      page: 1,
    });
  };

  const changeComplexity = (newComplexity) => {
    const {sortBy, sortDirection, complexity} = highScore;

    if (complexity === newComplexity) {
      return;
    }

    getScore({
      sortBy,
      sortDirection,
      complexity: newComplexity,
      page: 1,
    });
  };

  const changePage = (page) => {
    let {sortBy, sortDirection, complexity} = highScore;
    getScore({
      sortBy,
      sortDirection,
      complexity,
      page,
    });
  };

  const pageString = highScore.page.toString().padStart(2, '0');
  const itemsFrom = (highScore.page * PAGE_SIZE - PAGE_SIZE + 1).toString().padStart(2, '0');
  const itemsTo = highScore.page * PAGE_SIZE;
  return (
    <>
      <ComplexityTabs
        complexity={highScore.complexity}
        changeComplexity={changeComplexity}
      />
      <div className="grid">
        <div className="grid__header-cell">
          <div className="grid__cell__content">Name</div>
          <FilterIcon
            name="name"
            sortBy={highScore.sortBy}
            sortDirection={highScore.sortDirection}
            changeSorting={changeSorting}
          />
        </div>
        <div className="grid__header-cell">
          <div className="grid__cell__content">Time</div>
          <FilterIcon
            name="time"
            sortBy={highScore.sortBy}
            sortDirection={highScore.sortDirection}
            changeSorting={changeSorting}
          />
        </div>
        <div className="grid__header-cell">
          <div className="grid__cell__content">Date</div>
          <FilterIcon
            name="date"
            sortBy={highScore.sortBy}
            sortDirection={highScore.sortDirection}
            changeSorting={changeSorting}
          />
        </div>
        {highScore.items && highScore.items.map((item, i) =>
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
        hidden={highScore.page === 1 && highScore.isLimitReached}
      >
        <button
          disabled={highScore.page === 1}
          onClick={() => changePage(highScore.page - 1)}
        >
          Here
        </button>
        <div>
          Page {pageString}: {itemsFrom}-{itemsTo}</div>
        <button
          disabled={highScore.isLimitReached}
          onClick={() => changePage(highScore.page + 1)}
        >
          There
        </button>
      </div>
    </>
  );
};

export default HighScoreGrid;