import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { gameStatuses } from 'client/utils/constants';
import { gameStatusPropType } from 'client/utils/prop-types';
import {hasTouchScreen} from 'client/utils/minesweeper-helpers';

const Cell = ({cell, status, startGame, openCell, toggleFlag}) => {  
  const [isLongPress, setIsLongPress] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState(null);

  if (status === gameStatuses.paused) {
    return <div className="cell"></div>;
  }

  const classes = status === gameStatuses.lose ? {
    flag: cell.hasFlag && cell.hasMine,
    mine: cell.hasMine && !cell.hasFlag,
    cross: cell.hasFlag && !cell.hasMine,
    red: cell.blownMine,
  } : {
    flag: cell.hasFlag,
  };

  const opened = !cell.isClosed && !cell.hasFlag;
  const cellClasses = cx('cell', {opened, ...classes});

  const showMinesNearby = opened && cell.minesNearby && !cell.hasMine;

  const handleClick = () => {
    if (![gameStatuses.not_started, gameStatuses.in_progress].includes(status)) {
      return;
    }

    if (status === gameStatuses.not_started) {
      startGame(cell);
    }

    if (cell.hasFlag) {
      return;
    }

    openCell(cell);
  };

  const handleContextMenu = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (status === gameStatuses.in_progress) {
      if (cell.isClosed) {
        toggleFlag(cell);
      }
    }
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

  const cellHandlers = hasTouchScreen() ? {
    onContextMenu: e => e.preventDefault(),
    onTouchStart: handleButtonPress,
    onTouchEnd: handleButtonRelease,
    onTouchMove: handleTouchMove,
  } : {
    onClick: handleClick,
    onContextMenu: handleContextMenu,
  };

  return (
    <div
      {...cellHandlers}
      className={cellClasses}
      data-mines={cell.minesNearby}
    >
      {showMinesNearby ? cell.minesNearby : ''}
    </div>
  );
};

Cell.propTypes = {
  cell: PropTypes.object.isRequired,
  status: gameStatusPropType,
  startGame: PropTypes.func.isRequired,
  openCell: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

export default Cell;