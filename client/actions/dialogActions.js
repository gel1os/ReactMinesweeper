export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';


export const showDialog = () => {
  return {
    type: SHOW_DIALOG,
  }
};

export const hideDialog = () => {
  return {
    type: HIDE_DIALOG,
  }
};