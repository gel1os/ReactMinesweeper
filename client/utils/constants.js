// complexities
export const BEGINNER = 'BEGINNER';
export const NORMAL = 'NORMAL';
export const EXPERT = 'EXPERT';

export const complexities = [{
  label: 'Beginner',
  value: BEGINNER,
}, {
  label: 'Normal',
  value: NORMAL,
}, {
  label: 'Expert',
  value: EXPERT,
}]

export const GameSettings = {
  [BEGINNER]: {
    width: 9,
    height: 9,
    mines: 10,
    flags: 10,
  },
  [NORMAL]: {
    width: 16,
    height: 16,
    mines: 40,
    flags: 40,
  },
  [EXPERT]: {
    width: 30,
    height: 20,
    mines: 99,
    flags: 99,
  }
};

export const digitsToWordsMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
}

export const PAGE_SIZE = 10;