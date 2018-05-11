const initialState = {
  cached: {a: ['hi', 'bye']},
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
    case 'FILTER_TODO': {
      return {
        ...state,
        filter: action.filter,
      }
    }
    default: {
      return state;
    }
  }
}
