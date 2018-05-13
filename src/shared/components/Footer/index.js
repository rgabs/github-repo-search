import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  display: flex;
`

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.button`
  min-width: 150px;
`

const DropDown = ({ onChange, options, searchPlaceHolder }) => (
  <div className='input-field'>
    <StyledSelect onChange={(e) => onChange(e.target.value)}>
      {options.map((val, i) => <option key={i} value={val}>{searchPlaceHolder} {val}</option>)}
    </StyledSelect>
  </div>
)


const Footer = ({ onNextPress, onPreviousPress, isBackActive, isNextActive, options, onChange, searchPlaceHolder }) => (
  <StyledWrapper>
    <StyledButton className='waves-effect waves-light btn-small'  onClick={onPreviousPress} disabled={!isBackActive}>Previous</StyledButton >
    <DropDown searchPlaceHolder={searchPlaceHolder} onChange={onChange} options={options}></DropDown>
    <StyledButton className='waves-effect waves-light btn-small' onClick={onNextPress} disabled={!isNextActive}>Next</StyledButton>
  </StyledWrapper>
)

export default Footer;