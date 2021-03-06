import { generateGrid, addMinesToCells } from 'client/utils/game-helpers.js';
import { gameSettings, BEGINNER, gameStatuses } from 'client/utils/constants';
import {
  CHANGE_GAME_COMPLEXITY,
  START_GAME,
  OPEN_CELLS,
  LOSE_GAME,
  SET_STATUS,
  SET_FLAG,
  UNSET_FLAG,
  WIN_GAME,
  TICK,
} from 'client/actions/gameActions';
import {getIndex, Cell} from 'client/utils/game-helpers';

const defaultGameState = {
  status: gameStatuses.not_started,
  flagsLeft: gameSettings[BEGINNER].mines,
  seconds: 0,
  cells: generateGrid({
    width: gameSettings[BEGINNER].width,
    height: gameSettings[BEGINNER].height
  })
};

export const gameState = (state = defaultGameState, {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY: {
      const {width, height, mines} = gameSettings[payload];
      return {
        status: gameStatuses.not_started,
        flagsLeft: mines,
        seconds: 0,
        cells: generateGrid({width, height})
      };
    }

    case START_GAME: {
      const {cell, settings} = payload;
      return {
        ...state,
        status: gameStatuses.in_progress,
        cells: addMinesToCells(state.cells, {cell, settings})
      };
    }

    case OPEN_CELLS: {
      const cells = Object.assign({}, state.cells);
      payload.forEach(cell => {
        const index = getIndex(cell);
        cells[index] = new Cell({
          ...cells[index],
          isClosed: false,
        });
      });

      return {
        ...state,
        cells,
      };
    }

    case SET_STATUS: 
      return {
        ...state,
        status: payload,
      };

    case SET_FLAG:
    case UNSET_FLAG: {
      const cells = Object.assign({}, state.cells);
      const index = getIndex(payload);
      cells[index] = new Cell({
        ...cells[index],
        hasFlag: !payload.hasFlag
      });

      const flagsLeft = payload.hasFlag ?
        state.flagsLeft + 1 :
        state.flagsLeft - 1;

      return {
        ...state,
        cells,
        flagsLeft,
      };
    }

    case WIN_GAME: {
      const cells = Object.assign({}, state.cells);
      Object.values(cells).forEach((cell) => {
        const index = getIndex(cell);
        cells[index] = new Cell({
          ...cell,
          hasFlag: cell.hasMine,
          isClosed: false,
        });
      });

      return {
        ...state,
        cells,
        flagsLeft: 0,
        status: gameStatuses.win,
      };
    }

    case LOSE_GAME: {
      const cells = Object.assign({}, state.cells);
      Object.values(cells).forEach((cell) => {
        const index = getIndex(cell);
        cells[index] = new Cell({
          ...cell,
          blownMine: cell === payload,
        });
      });

      return {
        ...state,
        cells,
        status: gameStatuses.lose
      };
    }

    case TICK:
      return {
        ...state,
        seconds: state.seconds + 1,
      };

    default:
      return state;
  }
};