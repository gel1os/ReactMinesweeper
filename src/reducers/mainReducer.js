import {combineReducers} from 'redux';

import { wordInputValue, letterCounter } from './letterCounterReducer';
import { todos, todo, visibilityFilter } from './todoListReducer';
import { gameSettings, gameState, cellState } from './minesweeperReducer.js';

export default combineReducers({
    todos,
    todo,
    visibilityFilter,
    wordInputValue,
    letterCounter,
    gameSettings,
    gameState,
    cellState
})