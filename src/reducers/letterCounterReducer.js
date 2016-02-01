export const wordInputValue = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_WORD_INPUT':
            return action.text;
        default:
            return state
    }
};

export const letterCounter = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_LETTER_COUNTER':
            return action.value;
        default:
            return state
    }
};
