export const setGameSettings = (complexity) => {
    switch (complexity) {
        case 'BEGINNER':
            return {
                complexity: 'BEGINNER',
                width: 9,
                height: 9,
                mines: 10
            };

        case 'NORMAL':
            return {
                complexity: 'NORMAL',
                width: 16,
                height: 16,
                mines: 40
            };

        case 'EXPERT':
            return {
                complexity: 'EXPERT',
                width: 30,
                height: 20,
                mines: 99
            };
    }
};

export const generateNewGameState = (complexity) => {
    return {

    }
};

// description is here http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
export const createArray = (n) => Array.apply(null, {length: n}).map(Number.call, Number);