import {combineReducers} from 'redux';
import { gameState } from './gameStateReducer.js';
import { gameSettings } from './gameSettingsReducer.js';
import { highScore } from './highScoreReducer.js';
import { congratulations } from './congratulationsReducer.js';

export default combineReducers({
    gameSettings,
    gameState,
    highScore,
    congratulations,
});