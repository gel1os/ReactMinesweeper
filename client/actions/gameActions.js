import { getAdjacentCells, getCellsToOpen } from 'client/utils/game-helpers';
import {showCongratulations} from './congratulationsActions';

export const START_GAME = 'START_GAME';
export const startGame = (cell) => (dispatch, getState) => {
  const settings = getState().gameSettings;
  return dispatch({
    type: START_GAME,
    payload: {cell, settings},
  });
};

export const WIN_GAME = 'WIN_GAME';
export const winGame = () => {
  return {
    type: WIN_GAME,
  };
};

export const LOSE_GAME = 'LOSE_GAME';
export const finishGame = (cell) => {
  return {
    type: LOSE_GAME,
    payload: cell,
  };
};

export const OPEN_CELLS = 'OPEN_CELLS';
const open = (cells) => {
  cells = Array.isArray(cells) ? cells : [cells];
  return {
    type: OPEN_CELLS,
    payload: cells,
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

export const CHANGE_GAME_COMPLEXITY = 'CHANGE_GAME_COMPLEXITY';
export const changeGameComplexity = (complexity) => {
  return {
    type: CHANGE_GAME_COMPLEXITY,
    payload: complexity,
  };
};

export const SET_STATUS = 'SET_STATUS';
export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});

export const TICK = 'TICK';
export const tick = () => {
  return {
    type: TICK
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
  const {cells} = getState().gameState;
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
  const {cells} = getState().gameState;

  if (initial.hasMine) {
    dispatch(finishGame(initial));
    return;
  }

  const cellsToOpen = getCellsToOpen(initial, cells);
  const cellsWithMines = cellsToOpen.filter(cell => cell.hasMine);

  if (cellsWithMines.length) {
    dispatch(finishGame(cellsWithMines[0]));
    return;
  }

  dispatch(open(cellsToOpen));
  checkWin(dispatch, getState);
};

const checkWin = (dispatch, getState) => {
  const {cells} = getState().gameState;
  const cellsArr = Object.values(cells);
  const closedCells = cellsArr.filter((cell) => cell.isClosed);

  if (closedCells.every((cell) => cell.hasMine)) {
    dispatch(winGame());
    dispatch(showCongratulations());
  }
};

export const toggleFlag = (cell) => (dispatch) => {
  cell.hasFlag ?
    dispatch(unsetFlag(cell)) :
    dispatch(setFlag(cell));
};