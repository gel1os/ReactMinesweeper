import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../actions/dialogActions';
import {
  CHANGE_GAME_COMPLEXITY,
} from '../actions/minesweeperActions'

const initialState = {
  opened: false,
};

export const dialog = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        ...state,
        opened: true,
      };
    case HIDE_DIALOG:
    case CHANGE_GAME_COMPLEXITY:
      return {
        ...state,
        opened: false,
      };
    default:
      return state
  }
};
