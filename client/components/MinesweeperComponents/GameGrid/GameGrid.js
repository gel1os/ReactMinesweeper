import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import Cell from './Cell';
import GameStatus from '../GameStatus';
import {hasTouchScreen} from 'client/utils/minesweeper-helpers';
import Congratulations from 'client/components/Congratulations/Congratulations';
import {gameStatuses} from 'client/utils/constants';

const GameGrid = ({
  rows,
  gameState,
  gameStatus,
  complexity,
  congratulationsOpened,
  toggleFlag,
  startGame,
  handleCellOpening,
  handleClickOnOpenedCell,
}) => {
  const [zoom, setZoom] = useState(+localStorage.getItem('zoom') || 1);
  const [pressed, setPressed] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState(null);
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

  const handleClick = (e) => {
    if (![gameStatuses.not_started, gameStatuses.in_progress].includes(gameStatus)) {
      return;
    }

    const cell = getCell(e);

    if (gameStatus === gameStatuses.not_started) {
      startGame(cell);
    }

    if (cell.hasFlag) {
      return;
    }

    if (cell.isClosed) {
      handleCellOpening(cell);
    } else if (cell.minesNearby) {
      handleClickOnOpenedCell(cell, rows);
    }
  };

  const handleContextMenu = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (gameStatus === gameStatuses.in_progress) {
      const cell = getCell(e);
      if (cell.isClosed) {
        toggleFlag(cell);
      }
    }
  };

  const getCell = ({target}) => {
    const row = target.getAttribute('data-row');
    const column = target.getAttribute('data-col');
    return rows[row][column];
  };

  const handleButtonPress = (e) => {
    e.persist();
    setIsLongPress(false);
    setLongPressTimeout(setTimeout(() => {
      handleContextMenu(e);
      setIsLongPress(true);
    }, 300));
  };

  const handleButtonRelease = (e) => {
    if (!longPressTimeout) {
      return;
    }
    clearLongPressTimeout();
    if (!isLongPress) {
      handleClick(e);
    }
  };

  const handleTouchMove = () => {
    if (longPressTimeout) {
      clearLongPressTimeout();
    }
  };

  const clearLongPressTimeout = () => {
    clearTimeout(longPressTimeout);
    setLongPressTimeout(null);
  };

  const handleMouseDown = () => {
    if (gameStatus === gameStatuses.in_progress) {
      setPressed(true);
    }
  };

  const handleZoom = (direction) => {
    const newZoom = direction === '+' ? zoom + 0.1 : zoom - 0.1;
    localStorage.setItem('zoom', newZoom);
    setZoom(newZoom);
  };

  const zoomPercentage = Math.round(zoom * 100);
  const gridClasses = classNames('game-grid',
  `grid-${complexity.toLowerCase()}`, {
    'paused': gameStatus === gameStatuses.paused,
  });

  const gridHandlers = hasTouchScreen() ? {
    onContextMenu: e => e.preventDefault(),
    onTouchStart: handleButtonPress,
    onTouchEnd: handleButtonRelease,
    onTouchMove: handleTouchMove,
  } : {
    onClick: handleClick,
    onContextMenu: handleContextMenu,
  };

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
          <div className={gridClasses} {...gridHandlers}>
            {rows.flatMap(cell => cell).map((cell) =>
              <Cell
                key={`r${cell.rowNumber}.c${cell.columnNumber}`}
                cell={cell}
                gameStatus={gameState.status}
              />
            )}
          </div>
        </div>
      </div>
      {congratulationsOpened && <Congratulations />}
    </>
  );
};

export default GameGrid;