export const addMinesToCells = (cells, {cell: initialCell, settings}) => {
  let { mines, height, width } = settings;
  const cellsToSkip = [initialCell, ...getAdjacentCells(initialCell, cells)];

  while (mines > 0) {
    const randomRow = getRandomNumber(height);
    const randomColumn = getRandomNumber(width);
    const cell = cells[`r${randomRow}c${randomColumn}`];

    if (!cell.hasMine && !cellsToSkip.includes(cell)) {
      cell.hasMine = true;
      const adjacentCells = getAdjacentCells(cell, cells);
      adjacentCells.forEach(cell => {
        cell.minesNearby = cell.minesNearby + 1 || 1;
      });
      mines--;
    }
  }
  return cells;
};

export const generateGrid = ({width, height}) => {
  const cells = {};

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      cells[`r${i}c${j}`] = {
        row: i,
        column: j,
        isClosed: true,
        hasFlag: false,
        hasMine: false
      };
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
    if (cells[`r${x}c${y}`]) {
      adjacent.push(cells[`r${x}c${y}`]);
    }
  });

  return adjacent;
};

/**
 * Returns cell and all it's adjacent cells which don't contain mines
 * @param {Object} initialCell - initial cell to open 
 * @param {Object} cells - map of cells
 * @returns {Array<Object>}
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