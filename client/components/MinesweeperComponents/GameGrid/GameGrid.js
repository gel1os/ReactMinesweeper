import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import Cell from './Cell';
import GameStatus from './GameStatus';
import {hasTouchScreen} from 'client/utils/minesweeper-helpers';
import Congratulations from 'client/components/Congratulations/Congratulations';

const GameGrid = ({
  rows,
  gameState,
  complexity,
  congratulationsOpened,
  toggleFlag,
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
    }
    const resizeObserver = new ResizeObserver(recalculateZoomableBounds);
    const mutationObserver = new MutationObserver(recalculateZoomableBounds);
    mutationObserver.observe(gridWrapper.current, {attributes: true, attributeFilter: ['style']});
    resizeObserver.observe(gridWrapper.current);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const gameInProgress = gameState.started && !gameState.paused && !gameState.finished;

  const handleClick = (e) => {
    const cell = getCell(e);
    if (!cell || !gameInProgress || cell.hasFlag) {
      return;
    }

    if (cell.isClosed) {
      handleCellOpening(cell);
    } else if (cell.minesNearby) {
      handleClickOnOpenedCell(cell, rows)
    }
  }

  const handleContextMenu = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    if (!gameInProgress || !gameState.minesSet) {
      return;
    }
    const cell = getCell(e);
    if (cell && cell.isClosed) {
      toggleFlag(cell);
    }
  }

  const getCell = (e) => {
    const cellElement = e.target.classList.contains('mines-number') ? e.target.parentElement : e.target;
    const row = cellElement.getAttribute('data-row');
    const column = cellElement.getAttribute('data-col');

    if (row === null || column === null) {
      return;
    }

    return rows[row][column];
  }

  const handleButtonPress = (e) => {
    e.persist();
    setIsLongPress(false);
    setLongPressTimeout(setTimeout(() => {
      handleContextMenu(e);
      setIsLongPress(true);
    }, 300));
  }

  const handleButtonRelease = (e) => {
    if (!longPressTimeout) {
      return;
    }
    clearLongPressTimeout();
    if (!isLongPress) {
      handleClick(e);
    }
  }

  const handleTouchMove = () => {
    if (longPressTimeout) {
      clearLongPressTimeout();
    }
  };

  const clearLongPressTimeout = () => {
    clearTimeout(longPressTimeout);
    setLongPressTimeout(null);
  }

  const handleMouseDown = (e) => {
    if (!gameInProgress) {
      return;
    }
    const {classList} = e.target;
    if (classList.contains('cell') || classList.contains('mines-number')) {
      setPressed(true)
    }
  }

  const handleZoom = (direction) => {
    const newZoom = direction === '+' ? zoom + 0.1 : zoom - 0.1;
    localStorage.setItem('zoom', newZoom);
    setZoom(newZoom);
  }

  const zoomPercentage = Math.round(zoom * 100);
  const gridClasses = classNames({
    'game-grid': true,
    'paused': gameState.paused,
    'finished': gameState.finished,
    [`grid-${complexity.toLowerCase()}`]: true,
  })

  const gridWrapperHandlers = hasTouchScreen() ? {
    onTouchStart: handleMouseDown,
    onTouchEnd: () => setPressed(false),
    onTouchMove: () => setPressed(false),
  } : {
    onMouseDown: handleMouseDown,
    onMouseUp: () => setPressed(false),
    onMouseMove: () => setPressed(false)
  }

  const gridHandlers = hasTouchScreen() ? {
    onContextMenu: e => e.preventDefault(),
    onTouchStart: handleButtonPress,
    onTouchEnd: handleButtonRelease,
    onTouchMove: handleTouchMove,
  } : {
    onClick: handleClick,
    onContextMenu: handleContextMenu,
  }

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
          className={classNames({'game-grid-wrapper': true, pressed})}
          {...gridWrapperHandlers}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'left top'
          }}
        >
          <GameStatus />
          <div className='separator'></div>
          <div className={gridClasses} {...gridHandlers}>
            {rows.flatMap(cell => cell).map((cell, cellIndex) =>
              <Cell
                key={cellIndex}
                cell={cell}
                gameState={gameState}
              />
            )}
          </div>
        </div>
      </div>
      {congratulationsOpened && <Congratulations />}
    </>
  );
}

export default GameGrid;