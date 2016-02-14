import {getNearbyCells, hasMine, checkNearbyCells} from './../utils/minesweeper-helpers';

export const changeGameComplexity = (complexity) => {
    return {
        type: 'CHANGE_GAME_COMPLEXITY',
        complexity
    }
};

export const startGame = (complexity) => {
    return {
        type: 'START_GAME',
        complexity
    }
};

export const finishGame = () => {
    return {
        type: 'FINISH_GAME'
    }
};

const openCell = (cell) => {
    return {
        type: 'OPEN_CELL',
        cell
    }
};

const showNearbyMinesNumber = (cell, minesNearby) => {
    return {
        type: 'SHOW_NEARBY_MINES_NUMBER',
        cell,
        minesNearby
    }
};

export function handleCellOpening(cell) {
    return function(dispatch, getState) {

        if (hasMine(cell)) {
            return dispatch(finishGame());
        }

        let touchedCells = [];
        let emptyCells = [];
        let closeToMines = [];

        let cells = getState().gameState.cells;
        let nearbyCells = getNearbyCells(cell, cells, touchedCells);
        let minesNearby = nearbyCells.filter(hasMine).length;

        if (minesNearby) {
            return dispatch(showNearbyMinesNumber(cell, minesNearby));
        }

        dispatch(openCell(cell));
        touchedCells.push(cell);

        nearbyCells.forEach(cell => {
            checkNearbyCells(cell, cells, emptyCells, closeToMines, touchedCells);
        });

        window.emptyCells = emptyCells;

        emptyCells.forEach(cell => dispatch(openCell(cell)));
        closeToMines.forEach(cell => dispatch(showNearbyMinesNumber(cell[0], cell[1])))
    };

}

export const GameComplexities = {
    BEGINNER: 'BEGINNER',
    NORMAL: 'NORMAL',
    EXPERT: 'EXPERT'
};

export const GameSettings = {
    BEGINNER: {
        width: 9,
        height: 9,
        mines: 10
    },
    NORMAL: {
        width: 16,
        height: 16,
        mines: 40
    },
    EXPERT: {
        width: 30,
        height: 20,
        mines: 99
    }
};