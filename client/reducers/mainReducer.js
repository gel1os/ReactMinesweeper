import {combineReducers} from 'redux';
import { settings, gameState } from './minesweeperReducer.js';
import { highScore } from './highScoreReducer.js';
import { congratulations } from './congratulationsReducer.js';

export default combineReducers({
    gameSettings: settings,
    gameState,
    highScore,
    congratulations,
});