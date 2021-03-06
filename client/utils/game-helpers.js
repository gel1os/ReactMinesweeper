export const addMinesToCells = (cells, {cell: initialCell, settings}) => {
  let { mines, height, width } = settings;
  const cellsToSkip = [initialCell, ...getAdjacentCells(initialCell, cells)];

  while (mines > 0) {
    const randomRow = getRandomNumber(height);
    const randomColumn = getRandomNumber(width);
    const index = getIndex({row: randomRow, column: randomColumn});
    const cell = cells[index];

    if (!cell.hasMine && !cellsToSkip.includes(cell)) {
      cell.hasMine = true;
      const adjacentCells = getAdjacentCells(cell, cells);
      adjacentCells.forEach(cell => {
        cell.minesNearby += 1;
      });
      mines--;
    }
  }
  return cells;
};

export const generateGrid = ({width, height}) => {
  const cells = {};

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      const index = getIndex({row, column});
      cells[index] = new Cell({row, column});
    }
  }

  return cells;
};

const getRandomNumber = (range) => Math.floor(Math.random() * range);

export const getAdjacentCells = (initial, cells) => {
  const directions = [
    [-1, 0],  // top 
    [-1, -1], // top left
    [-1, 1],  // top right
    [0, -1],  // left
    [0, 1],   // right
    [1, 0],   // bottom
    [1, -1],  // bottom left
    [1, 1]    // bottom right
  ];
  const adjacent = [];

  directions.forEach(([x, y]) => {
    x = initial.row + x;
    y = initial.column + y;
    const index = getIndex({row: x, column: y});
    if (cells[index]) {
      adjacent.push(cells[index]);
    }
  });

  return adjacent;
};

/**
 * Returns cell and all it's adjacent cells which don't contain mines
 * @param {Cell} initialCell - initial cell to open 
 * @param {Object<Cell>} cells - map of cells
 * @returns {Array<Cell>}
 */
export const getCellsToOpen = (initialCell, cells) => {
  const stack = Array.isArray(initialCell) ? initialCell : [initialCell];
  const cellsToOpen = new Set();

  while (stack.length > 0) {
    const cell = stack.pop();

    cellsToOpen.add(cell);

    if (!cell.minesNearby) {
      const adjacentCells = getAdjacentCells(cell, cells);
      adjacentCells.forEach((cell) => {
        if (!cell.hasMine && !cellsToOpen.has(cell)) {
          stack.push(cell);
          cellsToOpen.add(cell);
        }
      });
    }
  }

  return [...cellsToOpen];
};

export const getIndex = ({row, column}) => `r${row}c${column}`;

export class Cell {
  constructor({
    row,
    column,
    isClosed = true,
    hasFlag = false,
    hasMine = false,
    minesNearby = 0,
    blownMine = false,
  }) {
    this.row = row;
    this.column = column;
    this.isClosed = isClosed;
    this.hasFlag = hasFlag;
    this.hasMine = hasMine;
    this.minesNearby = minesNearby;
    this.blownMine = blownMine;
  }
}