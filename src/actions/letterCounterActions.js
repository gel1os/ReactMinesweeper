export const changeWordInput = (text) => {
    return {
        type: 'CHANGE_WORD_INPUT',
        text
    }
};

export const changeLetterCounter = (value) => {
    return {
        type: 'CHANGE_LETTER_COUNTER',
        value
    }
};

export const LetterCounters = {
    VOWEL: 'VOWEL',
    CONSONANT: 'CONSONANT'
};