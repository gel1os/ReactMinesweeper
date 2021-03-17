import { GameSettings, BEGINNER } from 'client/utils/constants.js'

export const setGameSettings = (complexity) => {
  return {
    complexity,
    ...GameSettings[complexity]
  };
};

export const generateNewGameState = (complexity = BEGINNER) => {
  return {
    started: true,
    paused: false,
    finished: false,
    win: false,
    minesSet: false,
    minesLeft: GameSettings[complexity].mines,
    flagsLeft: GameSettings[complexity].flags,
    untouchedCellsCount: GameSettings[complexity].width * GameSettings[complexity].height,
  }
};

export const addMinesToCells = (rows, {initialCell, settings}) => {
  let { mines, height, width } = settings;
  const cellsToSkip = [initialCell, ...getSurroundingCells(initialCell, rows)];

  while (mines > 0) {
    const randomRow = getRandomNumber(height);
    const randomColumn = getRandomNumber(width);
    const cell = rows[randomRow][randomColumn];

    if (!cell.hasMine && !cellsToSkip.includes(cell)) {
      cell.hasMine = true;
      const surroundingCells = getSurroundingCells(cell, rows);
      surroundingCells.forEach(cell => {
        cell.minesNearby = cell.minesNearby + 1 || 1;
      })
      mines--;
    }
  }
  return rows;
};

export const generateGrid = (settings) => {
  const { width, height } = settings;
  const rows = [];

  for (var i = 0; i < height; i++) {
    const row = [];
    for (var j = 0; j < width; j++) {
      row.push({
        rowNumber: i,
        columnNumber: j,
        isClosed: true,
        hasFlag: false,
        hasMine: false
      })
    }
    rows.push(row);
  }

  return rows;
};

const getRandomNumber = (range) => Math.floor(Math.random() * range);

export const getSurroundingCells = (initialCell, rows, filter) => {
  const positions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const cells = [];

  positions.forEach(([x, y]) => {
    x = initialCell.rowNumber + x;
    y = initialCell.columnNumber + y;
    if (rows[x] && rows[x][y]) {
      const cell = rows[x][y];
      if (filter) {
        if (Object.keys(filter).every(key => filter[key] === cell[key])) {
          cells.push(cell);
        }
      } else {
        cells.push(cell);
      }
    }
  })

  return cells;
}

/**
 * Detect touch screen, taken from here
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 */
export const hasTouchScreen = () => {
  if (typeof Window === 'undefined') {
    return false;
  }
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    var mQ = window.matchMedia && matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }
  return hasTouchScreen;
}