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
        finished: false,
        win: false,
        minesLeft: GameSettings[complexity].mines,
        flagsLeft: GameSettings[complexity].flags
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

    let minesArray = generateMineCoordinates(mines, height, width);

    addMines(cells, minesArray);
    addNearbyMinesCount(cells, minesArray);

    return cells;
};

const addMines = (cells, minesArray) => {
    minesArray.forEach(mineCoord => {
        let cell = cells[mineCoord[0]][mineCoord[1]];
        cell.hasMine = true;
    })
};

const generateMineCoordinates = (mines, height, width) => {
    let arr = [];
    let mineCoordinates;
    while (mines > 0) {
        mineCoordinates = [
            getRandomNumber(height),
            getRandomNumber(width)
        ];

        if (!arr.some(coords => coords[0] === mineCoordinates[0] && coords[1] === mineCoordinates[1])) {
            arr.push(mineCoordinates);
            mines--;
        }
    }

    return arr;
};

const addNearbyMinesCount = (cells, minesArray) => {
    minesArray.forEach(mineCoord => {
        let cellWithMine = cells[mineCoord[0]][mineCoord[1]];
        let surroundingCells = getNearbyCells(cellWithMine, cells);

        surroundingCells.forEach(cell => {
            if (cell && !hasMine(cell)) {
                cell.minesNearby = cell.minesNearby ? cell.minesNearby+1 : 1;
            }
        });
    })

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

const getRandomNumber = (range) => Math.floor(Math.random() * range);

export const isCorrectCell = (currentCell, correctCell) => {
    return (currentCell.rowNumber === correctCell.rowNumber)
        && (currentCell.columnNumber === correctCell.columnNumber);
};

export const getNearbyCells = (cell, allCells) => {
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
    ];

};

const getCell = (row, column, allCells) => {
    return (allCells[row] && allCells[row][column]) ? allCells[row][column] : ''
};

export const hasMine = cell => cell.hasMine;