import {
  SHOW_CONGRATULATIONS,
  HIDE_CONGRATULATIONS,
} from '../actions/congratulationsActions';
import {
  CHANGE_GAME_COMPLEXITY,
} from '../actions/minesweeperActions'

const initialState = {
  opened: false,
};

export const congratulations = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONGRATULATIONS:
      return {
        ...state,
        opened: true,
      };
    case HIDE_CONGRATULATIONS:
    case CHANGE_GAME_COMPLEXITY:
      return {
        ...state,
        opened: false,
      };
    default:
      return state
  }
};
