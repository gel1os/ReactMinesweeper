import {combineReducers} from 'redux';
import { settings, gameState, gridState } from './minesweeperReducer.js';
import { highScore } from './highScoreReducer.js';
import { congratulations } from './congratulationsReducer.js';

export default combineReducers({
    gameSettings: settings,
    gameState,
    gridState,
    highScore,
    congratulations,
});