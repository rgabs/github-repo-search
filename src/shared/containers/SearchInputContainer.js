import SearchInput from 'shared/components/SearchInput';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {fetchAndStoreRepos} from 'shared/actions/thunks';

const mapDispatchToProps = (dispatch) => ({
  onInputChange: debounce((text) => {
    dispatch(fetchAndStoreRepos(text)).
      then((payload) => {
        dispatch({type: 'SET_VISIBLE_REPOS', payload});
      }).
      catch((e) => {
        console.log('Error occured. Error: ', e.message);
        dispatch({type: 'SET_VISIBLE_REPOS', payload: []});
      });
  }, 500),
});

export default connect(null, mapDispatchToProps)(SearchInput);