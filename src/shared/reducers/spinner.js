const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SPINNER': {
      return true;
    }
    case 'HIDE_SPINNER': {
      return false;
    }
    default: {
      return state;
    }
  }
}
