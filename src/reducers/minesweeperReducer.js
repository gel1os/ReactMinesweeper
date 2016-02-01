import { setGameSettings, generateNewGameState } from '../utils/minesweeper-helpers.js'
export const gameSettings = (state = {}, action) => {

    switch (action.type) {
        case 'CHANGE_GAME_COMPLEXITY':
            return setGameSettings(action.complexity);
        default:
            return state
    }
};

export const gameState = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_GAME_COMPLEXITY':
            return generateNewGameState(action.complexity);
        default:
            return state
    }
};