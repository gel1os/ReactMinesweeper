import { setGameSettings, generateNewGameState, generateGrid, addMinesToCells } from 'client/utils/minesweeper-helpers.js';
import { GameSettings, BEGINNER, gameStatuses } from 'client/utils/constants';
import {
  CHANGE_GAME_COMPLEXITY,
  START_GAME,
  OPEN_CELL,
  FINISH_GAME,
  SET_STATUS,
  SET_FLAG,
  UNSET_FLAG,
  WIN_GAME,
  TICK,
} from 'client/actions/minesweeperActions';

const defaultGameSettings = {
  complexity: BEGINNER,
  ...GameSettings[BEGINNER]
};

const defaultGameState = {
  status: gameStatuses.not_started,
  minesLeft: defaultGameSettings.mines,
  flagsLeft: defaultGameSettings.flags,
  untouchedCellsCount: defaultGameSettings.width * defaultGameSettings.height,
};

export const gameSettings = (state = defaultGameSettings, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return setGameSettings(payload);
    default:
      return state;
  }
};

export const gameState = (state = defaultGameState, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return generateNewGameState(payload);

    case START_GAME:
      return {
        ...state,
        status: gameStatuses.in_progress,
      };

    case OPEN_CELL:
      return {
        ...state,
        untouchedCellsCount: state.untouchedCellsCount - 1,
      };

    case FINISH_GAME:
      return {
        ...state,
        status: gameStatuses.lose
      };

    case SET_STATUS: 
      return {
        ...state,
        status: payload,
      };

    case SET_FLAG:
      return {
        ...state,
        flagsLeft: state.flagsLeft - 1,
        minesLeft: payload.hasMine ? state.minesLeft - 1 : state.minesLeft,
        untouchedCellsCount: state.untouchedCellsCount - 1,
      };

    case UNSET_FLAG:
      return {
        ...state,
        flagsLeft: state.flagsLeft + 1,
        minesLeft: payload.hasMine ? state.minesLeft + 1 : state.minesLeft,
        untouchedCellsCount: state.untouchedCellsCount + 1,
      };

    case WIN_GAME:
      return {
        ...state,
        flagsLeft: 0,
        status: gameStatuses.win,
      };

    default:
      return state;
  }
};

export const cellState = (state = {}, type) => {
  switch (type) {
    case OPEN_CELL:
      return {
        ...state,
        isClosed: false,
      };

    case SET_FLAG:
    case UNSET_FLAG:
      return {
        ...state,
        hasFlag: !state.hasFlag,
      };

    default:
      return state;
  }
};

export const timerState = (state, action) => {
  switch (action.type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        seconds: 0,
      };

    case TICK:
      return {
        seconds: state.seconds + 1,
      };

    default:
      return state || {seconds: 0};
  }
};

const defaultGridState = {
  rows: generateGrid(GameSettings[BEGINNER]),
};

export const gridState = (state = defaultGridState, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        rows: generateGrid(GameSettings[payload])
      };

    case START_GAME:
      return {
        rows: addMinesToCells(state.rows, payload)
      };

    case OPEN_CELL:
    case SET_FLAG:
    case UNSET_FLAG: {
      const { rows } = state;
      const updatedCell = cellState(payload, type);
      rows[payload.rowNumber][payload.columnNumber] = updatedCell;
      return {
        rows: [...rows]
      };
    }

    case WIN_GAME:
      return {
        rows: state.rows.map(row => row.map(cell => ({
          ...cell,
          hasFlag: !!cell.hasMine,
          isClosed: false,
        })))
      };

    case FINISH_GAME:
      return {
        rows: state.rows.map(row => row.map(cell => ({
          ...cell,
          blownMine: cell === payload,
        })))
      };

    default:
      return state;
  }
};
