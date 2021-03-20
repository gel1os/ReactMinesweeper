import React from 'react';
import classNames from 'classnames';
import { gameStatuses } from 'client/utils/constants';

const Cell = ({cell, status}) => {  
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
  const cellClasses = classNames('cell', {
    opened,
    ...classes,
  });

  const showMinesNearby = opened && cell.minesNearby;
  return (
    <div
      className={cellClasses}
      data-col={cell.columnNumber}
      data-row={cell.rowNumber}
      data-mines={cell.minesNearby}
    >
      {showMinesNearby ? cell.minesNearby : ''}
    </div>
  );
};

export default Cell;