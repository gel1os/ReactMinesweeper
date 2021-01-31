import HighScoreService from '../utils/high-score-service';

export const GET_SCORE_START = 'GET_SCORE_START';
export const GET_SCORE_SUCCESS = 'GET_SCORE_SUCCESS';
export const GET_SCORE_FAILURE = 'GET_SCORE_FAILURE';

export const GET_PRODUCTIVITY_SUCCESS = 'GET_PRODUCTIVITY_SUCCESS';

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

const getProductivitySuccess = (productivity) => {
  return {
    type: GET_PRODUCTIVITY_SUCCESS,
    payload: productivity,
  }
}

export const getScore = ({sortBy, sortDirection}) => async (dispatch) => {
  dispatch(getScoreStart({sortBy, sortDirection}));
  try {
    const score = await HighScoreService.getScore(sortBy, sortDirection);
    dispatch(getScoreSuccess(score))
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