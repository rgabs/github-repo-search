const initialState = {
  cached: {
    searchStringsMap: {},
    allRepos: {}
  },
  visible: [],
  userRepos: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_VISIBLE_REPOS': {
      return {
        ...state,
        visible: action.payload.map(repo => repo.id),
      };
    }
    case 'ADD_CACHE': {
      const { inputString, repos=[]} = action.payload;
      return {
        ...state,
        cached: {
          allRepos: { // contains all repos data in format:: {[repoid]: {<repo data>}}
            ...state.cached.allRepos,
            ...repos.reduce((acc, curr) => {
              return acc[curr.id] ? acc : { ...acc, [curr.id]: curr }
            }, {})
          },
          searchStringsMap: { // contains which search string corresponds to which repo ids
            ...state.cached.searchStringsMap,
            [inputString.toLowerCase()]: repos.map(repo => repo.id)
          }
        }
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
