import { getAdjacentCells, getCellsToOpen } from 'client/utils/minesweeper-helpers';
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
const open = (cell) => {
  return {
    type: OPEN_CELL,
    payload: cell,
  };
};

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

/**
 * Trigger opening of cell
 * @param {Object} cell
 */
export const openCell = (cell) => (dispatch, getState) => {
  if (cell.isClosed) {
    triggerOpen(cell, dispatch, getState);
  } else if (cell.minesNearby) {
    openAdjacentCells(cell, dispatch, getState);
  }
};

/**
 * Open cell together with it's adjacent cells
 * @param {*} cell 
 * @param {*} dispatch 
 * @param {*} getState 
 */
const openAdjacentCells = (cell, dispatch, getState) => {
  const {cells} = getState().gridState;
  const adjacentCells = getAdjacentCells(cell, cells);
  const flaggedCells = adjacentCells.filter(cell => cell.hasFlag);

  if (cell.minesNearby === flaggedCells.length) {
    const cells = adjacentCells.filter(cell => cell.isClosed && !cell.hasFlag);
    triggerOpen(cells, dispatch, getState);
  }
};

/**
 * Open cell(s)
 * @param {Object|Array<Object>} initial - initial cell or array of cells to open
 * @param {Function} dispatch
 * @param {Function} getState
 */
const triggerOpen = (initial, dispatch, getState) => {
  const {cells} = getState().gridState;

  if (initial.hasMine) {
    dispatch(finishGame(initial));
    return;
  }

  const cellsToOpen = getCellsToOpen(initial, cells);

  cellsToOpen.forEach((cell) => {
    if (cell.hasMine) {
      dispatch(finishGame(cell));
      return;
    }
    dispatch(open(cell));
  });

  checkWin(dispatch, getState);
};

const checkWin = (dispatch, getState) => {
  const state = getState();
  const {cells} = state.gridState;
  const {mines} = getState().gameSettings;
  const cellsArr = Object.values(cells);
  const flaggedMines = cellsArr.filter((cell) => cell.hasMine && cell.hasFlag);
  const closedCells = cellsArr.filter((cell) => cell.isClosed);

  if (flaggedMines.length === mines || closedCells.every(cell => cell.hasMine)) {
    dispatch(winGame());
    dispatch(showCongratulations());
  }
};

export const toggleFlag = (cell) => (dispatch) => {
  cell.hasFlag ?
    dispatch(unsetFlag(cell)) :
    dispatch(setFlag(cell));
};