import {
  GET_SCORE_START,
  GET_SCORE_SUCCESS,
  GET_SCORE_FAILURE,
  GET_PRODUCTIVITY_SUCCESS,
} from '../actions/highScoreActions';
import {
  CHANGE_GAME_COMPLEXITY,
} from '../actions/minesweeperActions'
import {BEGINNER} from '../utils/constants';

const initialState = {
  loading: false,
  items: null,
  productivity: null,
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
    case GET_PRODUCTIVITY_SUCCESS: {
      return {
        ...state,
        productivity: action.payload,
      }
    }
    case CHANGE_GAME_COMPLEXITY: {
      return {
        ...state,
        productivity: null,
      }
    }
    default:
      return state
  }
};
