import React from 'react';

const DropDown = ({ onChange, options }) => <select onChange={(e) => onChange(e.target.value)}>
  {options.map((val, i) => <option key={i} value={val}>{val}</option>)}
</select>

const Footer = ({ onNextPress, onPreviousPress, isBackActive, isNextActive, options, onChange }) => (
  <div>
    <button onClick={onPreviousPress} disabled={!isBackActive}>previous {!isBackActive}</button>
    <DropDown onChange={onChange} options={options}></DropDown>
    <button onClick={onNextPress} disabled={!isNextActive}>next {String(!isNextActive)}</button>
  </div>
)

export default Footer;