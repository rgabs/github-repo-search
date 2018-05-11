const initialState = {
  accessToken: '',
  isLoggedIn: false,
  repoIDs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        accessToken: action.payload,
        isLoggedIn: true
      };
    }
    case 'REPOS_FETCHED': {
      return {
        ...state,
        repoIDs: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
