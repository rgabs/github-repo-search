import React from 'react';
import {SearchBar} from 'react-native-elements';

const SearchInput = ({onInputChange}) => <SearchBar
  round
  onChangeText={onInputChange}
  placeholder='Type Here...' />;

export default SearchInput;