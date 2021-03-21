import { setGameSettings, generateGrid, addMinesToCells } from 'client/utils/minesweeper-helpers.js';
import { gameSettings, BEGINNER, gameStatuses } from 'client/utils/constants';
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
  ...gameSettings[BEGINNER]
};

const defaultGameState = {
  status: gameStatuses.not_started,
  flagsLeft: defaultGameSettings.mines,
};

export const settings = (state = defaultGameSettings, {type, payload}) => {
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
      return {
        status: gameStatuses.not_started,
        flagsLeft: gameSettings[payload].mines,
      };

    case START_GAME:
      return {
        ...state,
        status: gameStatuses.in_progress,
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
      };

    case UNSET_FLAG:
      return {
        ...state,
        flagsLeft: state.flagsLeft + 1,
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

export const timerState = (state = {seconds: 0}, action) => {
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
      return state;
  }
};

const defaultGridState = {
  rows: generateGrid(gameSettings[BEGINNER]),
};

export const gridState = (state = defaultGridState, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        rows: generateGrid(gameSettings[payload])
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
      rows[payload.row][payload.column] = updatedCell;
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
