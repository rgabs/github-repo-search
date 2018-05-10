import styled from 'styled-components';

const Text = styled.p;
const View = styled.div;

const TextInput = styled.input.attrs(({
  onChange: (props) => (e) => props.onChangeText(e.target.value)
}));

const Touchable = styled.button.attrs(({
  onClick: (props) => props.onPress,
}));

export default {
  View,
  Text,
  Touchable,
  TextInput
};
