import {
  GET_SCORE_START,
  GET_SCORE_SUCCESS,
  GET_SCORE_FAILURE,
} from 'client/actions/highScoreActions';
import {BEGINNER} from 'client/utils/constants';

const initialState = {
  loading: false,
  items: null,
  sortBy: 'date',
  sortDirection: 'desc',
  complexity: BEGINNER,
  page: 1,
  isLimitReached: false,
};

export const highScore = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORE_START:
      return {
        ...state,
        loading: true,
        sortBy: action.payload.sortBy || state.sortBy,
        sortDirection: action.payload.sortDirection || state.sortDirection,
        complexity: action.payload.complexity,
        page: action.payload.page,
      };
    case GET_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.score,
        isLimitReached: action.payload.isLimitReached,
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
