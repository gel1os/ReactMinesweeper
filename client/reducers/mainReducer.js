import {combineReducers} from 'redux';
import { gameSettings, gameState, timerState, gridState } from './minesweeperReducer.js';

export default combineReducers({
    gameSettings,
    gameState,
    timerState,
    gridState,
})