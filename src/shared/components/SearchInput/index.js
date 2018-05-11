import React from 'react';
import styled from 'styled-primitives';

const Input = styled.TextInput``;

const SearchInput = ({ onInputChange, searchString}) => <Input onChangeText={onInputChange} value={searchString} />

export default SearchInput;
