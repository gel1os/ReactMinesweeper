import {GameSettings} from './../actions/minesweeperActions';

export const setGameSettings = (complexity) => {
    return {
        complexity: complexity,
        ...GameSettings[complexity]
    };

};

export const generateNewGameState = (complexity) => {
    return {
        cells: generateCells(GameSettings[complexity]),
        started: true,
        paused: false,
        finished: false
    }
};

// description is here http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
export const createArray = (n) => Array.apply(null, {length: n}).map(Number.call, Number);

const generateCells = (settings) => {
    let {width, height, mines} = settings;

    let cells = [];

    for (var i = 0; i < height; i++) {
        let row = [];
        for (var j = 0; j < width; j++) {
            row.push(createNewCell(i, j))
        }
        cells.push(row);
    }

    addMines(cells, mines, height, width);

    return cells;
};

const addMines = (cells, mines, height, width) => {
    while (mines > 0) {
        let randomCell = getRandomCell(cells, height, width);
        randomCell.hasMine = true;
        mines--;
    }
};

const createNewCell = (rowNumber, columnNumber) => {
    return {
        rowNumber: rowNumber,
        columnNumber: columnNumber,
        isClosed: true,
        hasFlag: false,
        hasMine: false
    }
};

const getRandomCell = (cells, gridHeight, gridWidth) => {
    let randomRow = getRandomNumber(gridHeight);
    let randomColumn = getRandomNumber(gridWidth);

    return cells[randomRow][randomColumn];

};

const getRandomNumber = (range) => Math.floor(Math.random() * range);

export const isCorrectCell = (currentCell, correctCell) => {
    return (currentCell.rowNumber === correctCell.rowNumber)
        && (currentCell.columnNumber === correctCell.columnNumber);
};

export const getNearbyCells = (cell, allCells, touchedCells) => {
    let {rowNumber, columnNumber} = cell;

    let previousRow = rowNumber - 1;
    let nextRow = rowNumber + 1;
    let previousColumn = columnNumber - 1;
    let nextColumn = columnNumber + 1;

    return [
        // top cells
        getCell(previousRow, columnNumber, allCells),
        getCell(previousRow, previousColumn, allCells),
        getCell(previousRow, nextColumn, allCells),

        // bottom cells
        getCell(nextRow, columnNumber, allCells),
        getCell(nextRow, previousColumn, allCells),
        getCell(nextRow, nextColumn, allCells),

        // left and right
        getCell(rowNumber, previousColumn, allCells),
        getCell(rowNumber, nextColumn, allCells)
    ].filter(cell => cell && touchedCells.indexOf(cell) === -1);

};

const getCell = (row, column, allCells) => {
    return (allCells[row] && allCells[row][column]) ? allCells[row][column] : ''
};

export const hasMine = cell => cell.hasMine;

export const checkNearbyCells = (cell, allCells, emptyCells, closeToMines, touchedCells) => {
    let nearbyCells = getNearbyCells(cell, allCells, touchedCells);
    let nearbyMines = nearbyCells.filter(hasMine).length;

    if (touchedCells.indexOf(cell) === -1) {
        touchedCells.push(cell);
    }

    if (!nearbyCells.length) {
        return;
    }

    if (nearbyMines) {
        closeToMines.push([cell, nearbyMines]);
    } else {
        emptyCells.push(cell);
        nearbyCells.forEach(cell => checkNearbyCells(cell, allCells, emptyCells, closeToMines, touchedCells));
    }
};