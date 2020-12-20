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