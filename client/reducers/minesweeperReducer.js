import { setGameSettings, generateNewGameState, generateGrid, addMinesToCells } from 'client/utils/minesweeper-helpers.js'
import { GameSettings, BEGINNER } from 'client/utils/constants';
import {
  CHANGE_GAME_COMPLEXITY,
  START_GAME,
  OPEN_CELL,
  FINISH_GAME,
  PAUSE_GAME,
  SET_FLAG,
  UNSET_FLAG,
  WIN_GAME,
  TICK,
} from 'client/actions/minesweeperActions'

const defaultGameSettings = {
  complexity: BEGINNER,
  ...GameSettings[BEGINNER]
};

const defaultGameState = {
  started: true,
  paused: false,
  finished: false,
  win: false,
  minesSet: false,
  minesLeft: GameSettings[BEGINNER].mines,
  flagsLeft: GameSettings[BEGINNER].flags,
  untouchedCellsCount: GameSettings[BEGINNER].width * GameSettings[BEGINNER].height,
};

export const gameSettings = (state = defaultGameSettings, action) => {
  switch (action.type) {
    case CHANGE_GAME_COMPLEXITY:
      return setGameSettings(action.complexity);
    default:
      return state
  }
};

export const gameState = (state = defaultGameState, action) => {
  switch (action.type) {
    case CHANGE_GAME_COMPLEXITY:
      return generateNewGameState(action.complexity);

    case START_GAME:
      return {
        ...state,
        minesSet: true,
      };

    case OPEN_CELL:
      return {
        ...state,
        untouchedCellsCount: state.untouchedCellsCount - 1,
      };

    case FINISH_GAME:
      return {
        ...state,
        finished: true
      };

    case PAUSE_GAME:
      return {
        ...state,
        paused: !state.paused
      };

    case SET_FLAG:
      return {
        ...state,
        flagsLeft: state.flagsLeft - 1,
        minesLeft: action.cell.hasMine ? state.minesLeft - 1 : state.minesLeft,
        untouchedCellsCount: state.untouchedCellsCount - 1,
      };

    case UNSET_FLAG:
      return {
        ...state,
        flagsLeft: state.flagsLeft + 1,
        minesLeft: action.cell.hasMine ? state.minesLeft + 1 : state.minesLeft,
        untouchedCellsCount: state.untouchedCellsCount + 1,
      };

    case WIN_GAME:
      return {
        ...state,
        flagsLeft: 0,
        finished: true,
        win: true,
      };

    default:
      return state;
  }
};

export const cellState = (state = {}, action) => {
  switch (action.type) {
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
      return state
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
      return state || {seconds: 0}
  }
};


const defaultGridState = {
  rows: generateGrid(GameSettings[BEGINNER]),
}

export const gridState = (state = defaultGridState, action) => {
  switch (action.type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        rows: generateGrid(GameSettings[action.complexity])
      };

    case START_GAME:
      return {
        rows: addMinesToCells(state.rows, action.initialCell, action.settings)
      };

    case OPEN_CELL:
    case SET_FLAG:
    case UNSET_FLAG: {
      const { cell } = action;
      const { rows } = state;
      const updatedCell = cellState(cell, action);
      rows[cell.rowNumber][cell.columnNumber] = updatedCell;
      return {
        rows: [...rows]
      };
    }

    case PAUSE_GAME:
      return {
        ...state,
        paused: state.started && !state.paused,
      };

    case WIN_GAME:
      return {
        rows: state.rows.map(row => row.map(cell => ({
          ...cell,
          hasFlag: !!cell.hasMine,
          isClosed: false,
        })))
      }

    case FINISH_GAME:
      return {
        rows: state.rows.map(row => row.map(cell => ({
          ...cell,
          blownMine: cell === action.cell,
        })))
      }

    default:
      return state;
  }
};
