const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADER': {
      return state + 1;
    }
    case 'HIDE_LOADER': {
      return state - 1;
    }
    default: {
      return state;
    }
  }
}
