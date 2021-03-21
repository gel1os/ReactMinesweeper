import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';

import Cell from './Cell';
import GameStatus from '../GameStatus';
import Congratulations from 'client/components/Congratulations';
import {gameStatuses} from 'client/utils/constants';
import {getIndex} from 'client/utils/game-helpers';

const GameGrid = ({
  cells,
  status,
  congratulationsOpened,
  toggleFlag,
  startGame,
  openCell,
  gameSettings,
}) => {
  const [zoom, setZoom] = useState(+localStorage.getItem('zoom') || 1);
  const [pressed, setPressed] = useState(false);
  const gridWrapper = useRef(null);

  useEffect(() => {
    const recalculateZoomableBounds = () => {
      const MARGIN = 16;
      if (gridWrapper.current) {
        const {width, height} = gridWrapper.current.getBoundingClientRect();
        gridWrapper.current.parentElement.style.width = width + MARGIN + 'px';
        gridWrapper.current.parentElement.style.height = height + MARGIN + 'px';
      }
    };
    const resizeObserver = new ResizeObserver(recalculateZoomableBounds);
    const mutationObserver = new MutationObserver(recalculateZoomableBounds);
    mutationObserver.observe(gridWrapper.current, {attributes: true, attributeFilter: ['style']});
    resizeObserver.observe(gridWrapper.current);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseDown = () => {
    if (status === gameStatuses.in_progress) {
      setPressed(true);
    }
  };

  const handleZoom = (direction) => {
    const newZoom = direction === '+' ? zoom + 0.1 : zoom - 0.1;
    localStorage.setItem('zoom', newZoom);
    setZoom(newZoom);
  };

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <>
      <div className='zoom-wrapper'>
        <button
          disabled={zoomPercentage <= 50}
          onClick={() => handleZoom('-')}
        >
          −
        </button>
        <div className="zoom">
          <img src="icons/zoom.svg" alt="zoom" />
          <span>{zoomPercentage}%</span>
        </div>
        <button disabled={zoomPercentage >= 300} onClick={() => handleZoom('+')}>+</button>
      </div>
      <div className="zoomable">
        <div
          ref={gridWrapper}
          className='game-grid-wrapper'
          onPointerDown={handleMouseDown}
          onPointerUp={() => setPressed(false)}
          onPointerMove={() => setPressed(false)}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'left top'
          }}
        >
          <GameStatus pressed={pressed}/>
          <div className='separator'></div>
          <div className={cx({
            'game-grid': true,
            'paused': status === gameStatuses.paused,
            'finished': [gameStatuses.win, gameStatuses.lose].includes(status)
          })}>
            {Array(gameSettings.height).fill().map((_, row) =>
              <div className="row" key={row}>
                {Array(gameSettings.width).fill().map((_, column) => {
                  const index = getIndex({row, column});
                  return (
                    <Cell
                      key={index}
                      cell={cells[index]}
                      status={status}
                      startGame={startGame}
                      openCell={openCell}
                      toggleFlag={toggleFlag}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {congratulationsOpened && <Congratulations />}
    </>
  );
};

export default GameGrid;