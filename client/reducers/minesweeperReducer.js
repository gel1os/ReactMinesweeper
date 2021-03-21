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
  seconds: 0,
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
        seconds: 0,
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

    case TICK:
      return {
        ...state,
        seconds: state.seconds + 1,
      };

    default:
      return state;
  }
};

const defaultGridState = {
  cells: generateGrid(gameSettings[BEGINNER]),
};

export const gridState = (state = defaultGridState, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        cells: generateGrid(gameSettings[payload])
      };

    case START_GAME:
      return {
        cells: addMinesToCells(state.cells, payload)
      };

    case OPEN_CELL: {
      const cells = Object.assign({}, state.cells);
      const index = `r${payload.row}c${payload.column}`;

      cells[index] = {
        ...cells[index],
        isClosed: false
      };

      return {
        ...state,
        cells,
      };
    }

    case SET_FLAG:
    case UNSET_FLAG: {
      const cells = Object.assign({}, state.cells);
      const index = `r${payload.row}c${payload.column}`;
      cells[index] = {
        ...cells[index],
        hasFlag: !payload.hasFlag,
      };
      return {
        cells,
      };
    }

    case WIN_GAME: {
      const cells = Object.assign({}, state.cells);
      Object.values(cells).forEach((cell) => {
        const index = `r${cell.row}c${cell.column}`;
        cells[index] = {
          ...cell,
          hasFlag: cell.hasMine,
          isClosed: false,
        };
      });

      return {
        cells
      };
    }

    case FINISH_GAME: {
      const cells = Object.assign({}, state.cells);

      Object.values(cells).forEach((cell) => {
        const index = `r${cell.row}c${cell.column}`;
        cells[index] = {
          ...cell,
          blownMine: cell === payload,
        };
      });

      return {
        cells
      };
    }

    default:
      return state;
  }
};
