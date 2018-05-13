const initialState = {
  cached: {
    searchStringsMap: {},
    allRepos: {}
  },
  visible: [],
  userRepos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SET_VISIBLE_REPOS': {
    return {
      ...state,
      visible: action.payload.map((repo) => repo.id),
    };
  }
  case 'ADD_CACHE': {
    return {
      ...state,
      cached: action.payload
    };
  }
  case 'SET_CACHE': {
    return {
      ...state,
      cached: action.payload,
    };
  }
  default: {
    return state;
  }
  }
};
