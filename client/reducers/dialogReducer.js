import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../actions/dialogActions';

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
      return {
        ...state,
        opened: false,
      };
    default:
      return state
  }
};
