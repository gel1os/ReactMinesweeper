import ProductivityService from 'client/utils/productivity-service.js';

export const SHOW_CONGRATULATIONS = 'SHOW_CONGRATULATIONS';
export const HIDE_CONGRATULATIONS = 'HIDE_CONGRATULATIONS';
export const GET_PRODUCTIVITY_SUCCESS = 'GET_PRODUCTIVITY_SUCCESS';
export const GET_PRODUCTIVITY_FAILURE = 'GET_PRODUCTIVITY_FAILURE';

export const showCongratulations = () => {
  return {
    type: SHOW_CONGRATULATIONS,
  }
};

export const hideCongratulations = () => {
  return {
    type: HIDE_CONGRATULATIONS,
  }
};

const getProductivitySuccess = (productivity) => {
  return {
    type: GET_PRODUCTIVITY_SUCCESS,
    payload: productivity,
  }
}

const getProductivityFailure = () => {
  return {
    type: GET_PRODUCTIVITY_FAILURE,
  }
}

export const getProductivity = ({time, complexity}) => async (dispatch) => {
  try {
    const {productivity} = await ProductivityService.checkProductivity({time, complexity});
    dispatch(getProductivitySuccess(productivity))
  } catch(e) {
    dispatch(getProductivityFailure())
  }
}