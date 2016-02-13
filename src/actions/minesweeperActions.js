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

export const openCell = (cell) => {
    return {
        type: 'OPEN_CELL',
        cell
    }
};

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