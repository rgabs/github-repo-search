const initialState = {
  cached: {},
  visible: [],
  userRepos: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_VISIBLE_REPOS': {
      return {
        ...state,
        visible: action.payload,
      };
    }
    case 'ADD_CACHE': {
      return {
        ...state,
        cached: {...state.cached, [action.payload.inputString]: action.payload.repos}
      }
    }
    case 'SET_CACHE': {
      return {
        ...state,
        cached: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}
