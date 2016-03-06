import {combineReducers} from 'redux';
import { gameSettings, gameState, timerState } from './minesweeperReducer.js';

export default combineReducers({
    gameSettings,
    gameState,
    timerState
})