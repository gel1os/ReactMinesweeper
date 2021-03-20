import HighScoreService from 'client/utils/high-score-service';
import {PAGE_SIZE} from 'client/utils/constants';

export const GET_SCORE_START = 'GET_SCORE_START';
export const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS';
export const GET_SCORE_FAILURE = 'GET_SCORE_FAILURE';

const getScoreStart = ({sortBy, sortDirection, complexity, page}) => {
  return {
    type: GET_SCORE_START,
    payload: {sortBy, sortDirection, complexity, page}
  };
};

const getScoreSuccess = ({score, isLimitReached}) => {
  return {
    type: GET_SCORE_SUCCESS,
    payload: {score, isLimitReached}
  };
};

const getScoreFailure = (error) => {
  return {
    type: GET_SCORE_FAILURE,
    payload: {error},
  };
};

export const getScore = ({sortBy, sortDirection, complexity, page}) => async (dispatch) => {
  dispatch(getScoreStart({sortBy, sortDirection, complexity, page}));
  try {
    let isLimitReached = true;
    let score = await HighScoreService.getScore(sortBy, sortDirection, complexity, page);
    if (score.length > PAGE_SIZE) {
      isLimitReached = false;
      score = score.slice(0, PAGE_SIZE);
    }
    dispatch(getScoreSuccess({score, isLimitReached}));
  } catch(e) {
    dispatch(getScoreFailure(e));
  }
};