import {combineReducers} from 'redux';
import { settings, gameState, timerState, gridState } from './minesweeperReducer.js';
import { highScore } from './highScoreReducer.js';
import { congratulations } from './congratulationsReducer.js';

export default combineReducers({
    gameSettings: settings,
    gameState,
    timerState,
    gridState,
    highScore,
    congratulations,
});