import {getNearbyCells, hasMine, checkNearbyCells} from './../utils/minesweeper-helpers';

export const changeGameComplexity = (complexity) => {
    return {
        type: 'CHANGE_GAME_COMPLEXITY',
        complexity
    }
};

export const chooseGameComplexity = (complexity) => {
    return {
        type: 'CHOOSE_GAME_COMPLEXITY',
        complexity
    }
};

export const startGame = (initialCell, settings) => {
    return {
        type: 'START_GAME',
        initialCell,
        settings
    }
};

export const finishGame = (cell) => {
    return {
        type: 'FINISH_GAME',
        cell
    }
};

export const pauseGame = () => {
    return {
        type: 'PAUSE_GAME'
    }
};

export const tic = () => {
    return {
        type: 'TIC'
    }
};

export const setTimerId = (timerId) => {
    return {
        type: 'SET_TIMER_ID',
        timerId
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

const setFlag = (cell) => {
    return {
        type: 'SET_FLAG',
        cell
    }
};

const unsetFlag = (cell) => {
    return {
        type: 'UNSET_FLAG',
        cell
    }
};

export const winGame = () => {
    return {
        type: 'WIN_GAME'
    }
};

export function handleCellOpening(initialCell) {
    return function(dispatch, getState) {
        let stack = [[initialCell.rowNumber, initialCell.columnNumber]];
        let state = getState();
        let { width, height, mines } = state.gameSettings;
        let cell;
        let cells;
        let minesLeft;
        let cellCoords;

        if (!state.gameState.minesSet) {
            dispatch(startGame(initialCell, state.gameSettings))
        }

        if (hasMine(initialCell)) {
            return dispatch(finishGame(initialCell));
        }

        while (stack.length > 0) {
            cells = getState().gameState.cells;
            minesLeft = getState().gameState.minesLeft;
            cellCoords = stack.pop();
            if (cellCoords[0] < 0 || cellCoords[0] >= height) {
                continue;
            }

            if (cellCoords[1] < 0 || cellCoords[1] >= width) {
                continue;
            }

            cell = cells[cellCoords[0]][cellCoords[1]];

            if (cell.isClosed && !cell.hasMine) {
                if (minesLeft === 0) {
                    let flaggedMines = [];

                    cells.forEach(rows => rows.forEach(cell => {
                        if (cell.hasMine && cell.hasFlag) {
                            flaggedMines.push(cell);
                        }
                    }));

                    if (mines === flaggedMines.length) {
                        dispatch(winGame());
                        return;
                    }
                }

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

export function toggleFlagSetting(cell) {
    return function(dispatch, getState) {
        let gameState = getState().gameState;
        let flagsLeft = gameState.flagsLeft;
        let minesLeft = gameState.minesLeft;
        let cells = gameState.cells;

        if (cell.hasFlag) {
            dispatch(unsetFlag(cell));
        } else if (flagsLeft > 0) {
            dispatch(setFlag(cell));

            if (minesLeft === 1 && hasMine(cell)) {
                let closedCells = [];

                cells.forEach(rows => rows.forEach(cell => {
                    if (cell.isClosed && !cell.hasFlag) {
                        closedCells.push(cell);
                    }
                }));

                if (closedCells.length === 1) {
                    dispatch(winGame());
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
        mines: 10,
        flags: 10
    },
    NORMAL: {
        width: 16,
        height: 16,
        mines: 40,
        flags: 40
    },
    EXPERT: {
        width: 30,
        height: 20,
        mines: 99,
        flags: 99
    }
};