import { getSurroundingCells } from './../utils/minesweeper-helpers';

export const changeGameComplexity = (complexity) => {
  return {
    type: 'CHANGE_GAME_COMPLEXITY',
    complexity
  }
};

export const chooseGameComplexity = (complexity) => {
  return {
    type: 'CHOOSE_GAME_COMPLEXITY',
    complexity
  }
};

export const startGame = (initialCell, settings) => {
  return {
    type: 'START_GAME',
    initialCell,
    settings
  }
};

export const finishGame = (cell) => {
  return {
    type: 'FINISH_GAME',
    cell
  }
};

export const pauseGame = () => {
  return {
    type: 'PAUSE_GAME'
  }
};

export const cancelGame = () => {
  return {
    type: 'CANCEL_GAME'
  }
};

export const tick = () => {
  return {
    type: 'TICK'
  }
};

export const setTimerId = (timerId) => {
  return {
    type: 'SET_TIMER_ID',
    timerId
  }
};

const openCell = (cell) => {
  return {
    type: 'OPEN_CELL',
    cell
  }
};

const setFlag = (cell) => {
  return {
    type: 'SET_FLAG',
    cell
  }
};

const unsetFlag = (cell) => {
  return {
    type: 'UNSET_FLAG',
    cell
  }
};

export const winGame = () => {
  return {
    type: 'WIN_GAME'
  }
};

export function handleCellOpening(initialCell) {
  return function (dispatch, getState) {
    const state = getState();
    if (!state.gameState.minesSet) {
      dispatch(startGame(initialCell, state.gameSettings))
    }
    open(initialCell, dispatch, getState);
  }
}

export function handleClickOnOpenedCell(cell, rows) {
  return function (dispatch, getState) {
    const flaggedCells = getSurroundingCells(cell, rows, {hasFlag: true});
    if (cell.minesNearby === flaggedCells.length) {
      const notFlaggedCells = getSurroundingCells(cell, rows, {isClosed: true, hasFlag: false});
      open(notFlaggedCells, dispatch, getState);
    }
  }
}

/**
 * Open cell(s)
 * @param {Object|Array<Object>} initial - cell or array of cells to open
 * @param {Function} dispatch
 * @param {Function} getState
 */
function open(initial, dispatch, getState) {
  const stack = initial.constructor === Array ? initial : [initial];

  while (stack.length > 0) {
    const cell = stack.pop();

    if (cell.hasMine) {
      return dispatch(finishGame(cell));
    }

    dispatch(openCell(cell));

    if (!cell.minesNearby) {
      const { rows } = getState().gridState;
      const surroundingCells = getSurroundingCells(cell, rows, {isClosed: true});
      surroundingCells.forEach(cell => {
        if (!stack.includes(cell)) {
          stack.push(cell);
        }
      })
    }
  }

  const { minesLeft, flagsLeft, untouchedCellsCount } = getState().gameState;
  if (flagsLeft === minesLeft && minesLeft === untouchedCellsCount) {
    return dispatch(winGame());
  }
}

export function toggleFlag(cell) {
  return function (dispatch, getState) {
    const {flagsLeft} = getState().gameState;
    if (cell.hasFlag) {
      dispatch(unsetFlag(cell));
    } else if (flagsLeft > 0) {
      dispatch(setFlag(cell));
    }
  }
}