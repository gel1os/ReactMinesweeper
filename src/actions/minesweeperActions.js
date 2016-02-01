export const changeGameComplexity = (complexity) => {
    return {
        type: 'CHANGE_GAME_COMPLEXITY',
        complexity
    }
};

export const createNewGame = (complexity) => {
    return {
        type: 'CREATE_NEW_GAME',
        complexity
    }
};