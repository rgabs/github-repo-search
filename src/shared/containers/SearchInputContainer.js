import {connect} from 'react-redux';
import SearchInput from 'shared/components/SearchInput';
import { fetchAndStoreRepos } from 'shared/actions/thunks'

const mapDispatchToProps = (dispatch) => ({
  onInputChange: (text) => {
    dispatch(fetchAndStoreRepos(text))
      .then((payload) => {
        payload && dispatch({ type: 'SET_VISIBLE_REPOS', payload });
      })
      .catch((e) => {
        alert('Error occured');
        dispatch({ type: 'SET_VISIBLE_REPOS', payload: [] })
      })
  },
});

export default connect(null, mapDispatchToProps)(SearchInput);