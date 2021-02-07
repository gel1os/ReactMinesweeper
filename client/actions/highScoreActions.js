import HighScoreService from '../utils/high-score-service';
import {PAGE_SIZE} from '../utils/constants';

export const GET_SCORE_START = 'GET_SCORE_START';
export const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS';
export const GET_SCORE_FAILURE = 'GET_SCORE_FAILURE';

export const GET_PRODUCTIVITY_SUCCESS = 'GET_PRODUCTIVITY_SUCCESS';

const getScoreStart = ({sortBy, sortDirection, complexity, page}) => {
  return {
    type: GET_SCORE_START,
    payload: {sortBy, sortDirection, complexity, page}
  }
};

const getScoreSuccess = ({score, isLimitReached}) => {
  return {
    type: GET_SCORE_SUCCESS,
    payload: {score, isLimitReached}
  }
};

const getScoreFailure = (error) => {
  return {
    type: GET_SCORE_FAILURE,
    payload: {error},
  }
};

const getProductivitySuccess = (productivity) => {
  return {
    type: GET_PRODUCTIVITY_SUCCESS,
    payload: productivity,
  }
}

export const getScore = ({sortBy, sortDirection, complexity, page}) => async (dispatch) => {
  dispatch(getScoreStart({sortBy, sortDirection, complexity, page}));
  try {
    let isLimitReached = true;
    let score = await HighScoreService.getScore(sortBy, sortDirection, complexity, page);
    if (score.length > PAGE_SIZE) {
      isLimitReached = false;
      score = score.slice(0, PAGE_SIZE);
    }
    dispatch(getScoreSuccess({score, isLimitReached}))
  } catch(e) {
    dispatch(getScoreFailure(e))
  }
}

export const getProductivity = ({time, complexity}) => async (dispatch) => {
  try {
    const {productivity} = await HighScoreService.checkProductivity({time, complexity});
    dispatch(getProductivitySuccess(productivity))
  } catch(e) {}
}