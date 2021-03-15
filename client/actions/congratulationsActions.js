export const SHOW_CONGRATULATIONS = 'SHOW_CONGRATULATIONS';
export const HIDE_CONGRATULATIONS = 'HIDE_CONGRATULATIONS';


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