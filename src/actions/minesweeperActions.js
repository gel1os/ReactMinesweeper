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

const showNearbyMinesNumber = (cell) => {
    return {
        type: 'SHOW_NEARBY_MINES_NUMBER',
        cell
    }
};

export function handleCellOpening(initialCell) {
    return function(dispatch, getState) {
        var stack = [[initialCell.rowNumber, initialCell.columnNumber]];
        var { width, height } = getState().gameSettings;
        var cell;
        var cells;
        var cellCoords;

        if (hasMine(initialCell)) {
            return dispatch(finishGame());
        }

        while (stack.length > 0) {
            cells = getState().gameState.cells;
            cellCoords = stack.pop();
            if (cellCoords[0] < 0 || cellCoords[0] >= height) {
                continue;
            }

            if (cellCoords[1] < 0 || cellCoords[1] >= width) {
                continue;
            }

            cell = cells[cellCoords[0]][cellCoords[1]];

            if (cell.isClosed && !cell.hasMine) {
                if (cell.minesNearby) {
                    dispatch(showNearbyMinesNumber(cell))
                } else {
                    dispatch(openCell(cell));

                    stack.push(
                        // top cells
                        [cellCoords[0] - 1, cellCoords[1]],
                        [cellCoords[0] - 1, cellCoords[1] - 1],
                        [cellCoords[0] - 1, cellCoords[1] + 1],

                        // bottom cells
                        [cellCoords[0] + 1, cellCoords[1]],
                        [cellCoords[0] + 1, cellCoords[1] - 1],
                        [cellCoords[0] + 1, cellCoords[1] + 1],

                        //left cell
                        [cellCoords[0], cellCoords[1] - 1],

                        //right cell
                        [cellCoords[0], cellCoords[1] + 1]
                    );
                }
            }
        }
    }
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