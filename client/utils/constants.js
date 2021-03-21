export const BEGINNER = 'beginner';
export const NORMAL = 'normal';
export const EXPERT = 'expert';

export const complexities = [{
  label: 'Beginner',
  value: BEGINNER,
}, {
  label: 'Normal',
  value: NORMAL,
}, {
  label: 'Expert',
  value: EXPERT,
}];

export const gameSettings = {
  [BEGINNER]: {
    complexity: BEGINNER,
    width: 9,
    height: 9,
    mines: 10,
  },
  [NORMAL]: {
    complexity: NORMAL,
    width: 16,
    height: 16,
    mines: 40,
  },
  [EXPERT]: {
    complexity: EXPERT,
    width: 30,
    height: 20,
    mines: 99,
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
  9: 'nine',
  '-': 'minus',
};

export const gameStatuses = {
  not_started: 'not_started',
  in_progress: 'in_progress',
  paused: 'paused',
  win: 'win',
  lose: 'lose',
};

export const PAGE_SIZE = 10;