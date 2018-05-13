import React from 'react';
import styled from 'styled-primitives';

const Input = styled.TextInput``;

const SearchInput = ({onInputChange}) => <Input placeholder='Search for repos..' onChangeText={onInputChange} />;

export default SearchInput;
