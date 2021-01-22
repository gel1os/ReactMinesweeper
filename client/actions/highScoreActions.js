import HighScoreService from '../utils/high-score-service';

export const GET_SCORE_START = 'GET_SCORE_START';
export const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS';
export const GET_SCORE_FAILURE = 'GET_SCORE_FAILURE';

const getScoreStart = ({sortBy, sortDirection}) => {
  return {
    type: GET_SCORE_START,
    payload: {sortBy, sortDirection}
  }
};

const getScoreSuccess = (score) => {
  return {
    type: GET_SCORE_SUCCESS,
    payload: score,
  }
};

const getScoreFailure = (error) => {
  return {
    type: GET_SCORE_FAILURE,
    payload: {error},
  }
};

export const getScore = ({sortBy, sortDirection}) => async (dispatch) => {
  dispatch(getScoreStart({sortBy, sortDirection}));
  try {
    const score = await HighScoreService.getScore(sortBy, sortDirection);
    dispatch(getScoreSuccess(score))
  } catch(e) {
    dispatch(getScoreFailure(e))
  }
}