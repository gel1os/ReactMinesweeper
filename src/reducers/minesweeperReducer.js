import { setGameSettings, generateNewGameState, isCorrectCell } from '../utils/minesweeper-helpers.js'
import {GameSettings, GameComplexities} from '../actions/minesweeperActions';

let defaultGameSettings = {
    complexity: GameComplexities.BEGINNER,
    ...GameSettings[GameComplexities.BEGINNER]
};

let defaultGameState = {
    started: false,
    paused: false,
    finished: false,
    win: false,
    minesLeft: GameSettings[GameComplexities.BEGINNER].mines,
    flagsLeft:GameSettings[GameComplexities.BEGINNER].flags,
    cells: []
};

export const gameSettings = (state = defaultGameSettings, action) => {
    switch (action.type) {
        case 'CHANGE_GAME_COMPLEXITY':
            return setGameSettings(action.complexity);
        default:
            return state
    }
};

export const gameState = (state = defaultGameState, action) => {
    switch (action.type) {
        case 'START_GAME':
            return generateNewGameState(action.complexity);

        case 'FINISH_GAME':
            return {
                ...state,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action))),
                finished: true
            };

        case 'OPEN_CELL':
            return {
                ...state,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action)))
            };

        case 'SHOW_NEARBY_MINES_NUMBER':
            return {
                ...state,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action)))
            };

        case 'SET_FLAG':
            let minesLeft = action.cell.hasMine ? (state.minesLeft - 1) : state.minesLeft;

            return {
                ...state,
                flagsLeft: state.flagsLeft - 1,
                minesLeft: minesLeft,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action)))
            };

        case 'UNSET_FLAG':
            return {
                ...state,
                flagsLeft: state.flagsLeft + 1,
                minesLeft: action.cell.hasMine ? (state.minesLeft + 1) : state.minesLeft,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action)))
            };

        case 'WIN_GAME':
            return {
                ...state,
                win: true,
                cells: state.cells.map(rows => rows.map(cell => cellState(cell, action)))
            };

        default:
            return defaultGameState;
    }
};

export const cellState = (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_CELL':
            if (!isCorrectCell(state, action.cell)) {
                return state;
            }
            return {
                ...state,
                isClosed: false
            };

        case 'SHOW_NEARBY_MINES_NUMBER':
            if (!isCorrectCell(state, action.cell)) {
                return state;
            }

            return {
                ...state,
                isClosed: false,
                minesNearby: action.cell.minesNearby
            };

        case 'SET_FLAG':
            if (!isCorrectCell(state, action.cell)) {
                return state;
            }

            return {
                ...state,
                hasFlag: !state.hasFlag
            };

        case 'UNSET_FLAG':
            if (!isCorrectCell(state, action.cell)) {
                return state;
            }
            return {
                ...state,
                hasFlag: !state.hasFlag
            };

        case 'WIN_GAME':
            return {
                ...state,
                hasFlag: !!state.hasMine,
                isClosed: false
            };

        case 'FINISH_GAME':
            return {
                ...state,
                isClosed: false,
                blownMine: action.cell && isCorrectCell(state, action.cell)
            };

        default:
            return state
    }
};
