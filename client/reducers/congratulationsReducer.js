import {
  SHOW_CONGRATULATIONS,
  HIDE_CONGRATULATIONS,
  GET_PRODUCTIVITY_SUCCESS,
} from 'client/actions/congratulationsActions';
import {
  CHANGE_GAME_COMPLEXITY,
} from 'client/actions/gameActions';

const initialState = {
  opened: false,
  productivity: null,
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
        productivity: null,
        opened: false,
      };
      case GET_PRODUCTIVITY_SUCCESS: {
        return {
          ...state,
          productivity: action.payload,
        };
      }
    default:
      return state;
  }
};
