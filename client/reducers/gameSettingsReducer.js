import { gameSettings as settings, BEGINNER } from 'client/utils/constants';
import { CHANGE_GAME_COMPLEXITY } from 'client/actions/minesweeperActions';

export const gameSettings = (state = settings[BEGINNER], {type, payload}) => {
  switch (type) {
    case CHANGE_GAME_COMPLEXITY:
      return {
        ...settings[payload]
      };
    default:
      return state;
  }
};