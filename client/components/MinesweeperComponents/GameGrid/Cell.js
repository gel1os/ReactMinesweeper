import React from 'react';
import classNames from 'classnames';

const Cell = ({cell, gameState}) => {
  if (gameState.paused) {
    return <div className="cell"></div>
  }

  const classes = gameState.finished ? {
    flag: cell.hasFlag && cell.hasMine,
    mine: cell.hasMine && !cell.hasFlag,
    cross: cell.hasFlag && !cell.hasMine,
    red: cell.blownMine,
  } : {
    flag: cell.hasFlag,
  }

  const cellClasses = classNames('cell', {
    opened: !cell.isClosed && !cell.hasFlag,
    ...classes,
  });

  return (
    <div
      className={cellClasses}
      data-col={cell.columnNumber}
      data-row={cell.rowNumber}
    >
      {!cell.isClosed && !cell.hasFlag && cell.minesNearby
        ? <div className={`mines-number m${cell.minesNearby}`}>
            {cell.minesNearby}
          </div>
        : ''
      }
    </div>
  )
}

export default Cell;