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

    for (var i=0; i<height; i++) {
        let row = [];
        for (var j=0; j<width; j++) {
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