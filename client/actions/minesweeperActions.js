import { getSurroundingCells, getCellsToOpen } from 'client/utils/minesweeper-helpers';
import {showCongratulations} from './congratulationsActions';

export const CHANGE_GAME_COMPLEXITY = 'CHANGE_GAME_COMPLEXITY';
export const changeGameComplexity = (complexity) => {
  return {
    type: CHANGE_GAME_COMPLEXITY,
    payload: complexity,
  };
};

export const START_GAME = 'START_GAME';
export const startGame = (cell) => (dispatch, getState) => {
  const settings = getState().gameSettings;
  return dispatch({
    type: START_GAME,
    payload: {cell, settings},
  });
};

export const SET_STATUS = 'SET_STATUS';
export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});

export const FINISH_GAME = 'FINISH_GAME';
export const finishGame = (cell) => {
  return {
    type: FINISH_GAME,
    payload: cell,
  };
};

export const TICK = 'TICK';
export const tick = () => {
  return {
    type: TICK
  };
};

export const OPEN_CELL = 'OPEN_CELL';

export const SET_FLAG = 'SET_FLAG';
const setFlag = (cell) => {
  return {
    type: SET_FLAG,
    payload: cell,
  };
};

export const UNSET_FLAG = 'UNSET_FLAG';
const unsetFlag = (cell) => {
  return {
    type: UNSET_FLAG,
    payload: cell,
  };
};

export const WIN_GAME = 'WIN_GAME';
export const winGame = () => {
  return {
    type: WIN_GAME,
  };
};

export function handleClickOnOpenedCell(cell, dispatch, getState) {
  const {rows} = getState().gridState;
  const flaggedCells = getSurroundingCells(cell, rows, {hasFlag: true});
  if (cell.minesNearby === flaggedCells.length) {
    const notFlaggedCells = getSurroundingCells(cell, rows, {isClosed: true, hasFlag: false});
    open(notFlaggedCells, dispatch, getState);
  }
}

export const openCell = (cell) => (dispatch, getState) => {
  if (cell.isClosed) {
    open(cell, dispatch, getState);
  } else if (cell.minesNearby) {
    handleClickOnOpenedCell(cell, dispatch, getState);
  }
};

/**
 * Open cell(s)
 * @param {Object|Array<Object>} cell - initial cell to open
 * @param {Function} dispatch
 * @param {Function} getState
 */
function open(cell, dispatch, getState) {
  const {rows} = getState().gridState;

  if (cell.hasMine) {
    dispatch(finishGame(cell));
    return;
  }

  const cellsToOpen = getCellsToOpen(cell, rows);

  cellsToOpen.forEach((cell) => {
    if (cell.hasMine) {
      dispatch(finishGame(cell));
      return;
    }

    dispatch({type: OPEN_CELL, payload: cell});
  });

  const { minesLeft, flagsLeft, untouchedCellsCount } = getState().gameState;
  if (flagsLeft === minesLeft && minesLeft === untouchedCellsCount) {
    dispatch(winGame());
    dispatch(showCongratulations());
    return;
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
  };
}