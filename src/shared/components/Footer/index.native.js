import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './styles.native';

const getOptions = (value) => ({ label: String(value), value: String(value) });

const DropDown = ({ onChange, options = [], ...extraProps }) => (
  <RNPickerSelect items={options.map(getOptions)} 
    onValueChange={onChange} style={styles.dropDown} 
    {...extraProps}
  />
);

const Footer = ({ onNextPress, onPreviousPress, isBackActive, isNextActive, searchPlaceHolder, options, onChange }) => (
  <View style={styles.footerWrapper}>
    <Icon raised disabled={!isBackActive} name='chevron-left'
      color='#f50' component={TouchableOpacity}
      onPress={onPreviousPress} />
    <View useNativeDriver animation='fadeIn' style={styles.dropDownContainer}>
      <DropDown placeholder={{ label: searchPlaceHolder }} options={options} onChange={onChange} />
    </View>
    <Icon raised disabled={!isNextActive}
      name='chevron-right'
      color='#f50' component={TouchableOpacity}
      onPress={onNextPress} />
  </View>
);

export default Footer;