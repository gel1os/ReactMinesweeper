import {combineReducers} from 'redux';
import { gameSettings, gameState, timerState, gridState } from './minesweeperReducer.js';
import { highScore } from './highScoreReducer.js';
import { congratulations } from './congratulationsReducer.js';

export default combineReducers({
    gameSettings,
    gameState,
    timerState,
    gridState,
    highScore,
    congratulations,
})