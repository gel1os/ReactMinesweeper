import { LetterCounters } from '../actions/letterCounterActions';

export const countLetters = (wordInputValue, letterCounter) => {
    switch (letterCounter) {
        case LetterCounters.VOWEL:
            return countVowels(wordInputValue);

        case LetterCounters.CONSONANT:
            return countConsonant(wordInputValue);
    }
};

export const countVowels = (word) => {
    var result = word.match(/[aeiou]/gi);
    return result === null ? 0 : result.length;
};

export const countConsonant = (word) => {
    var result = word.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    return result === null ? 0 : result.length;
};