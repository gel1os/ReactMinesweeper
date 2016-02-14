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
            return defaultGameState;

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
                minesNearby: action.minesNearby
            };

        default:
            return state
    }
};
