import {
  GET_SCORE_START,
  GET_SCORE_SUCCESS,
  GET_SCORE_FAILURE,
} from '../actions/highScoreActions';

const initialState = {
  loading: false,
  items: null,
  sortBy: 'date',
  sortDirection: 'desc'
};

export const highScore = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORE_START:
      return {
        ...state,
        loading: true,
        sortBy: action.payload.sortBy || state.sortBy,
        sortDirection: action.payload.sortDirection || state.sortDirection,
      };
    case GET_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case GET_SCORE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state
  }
};
