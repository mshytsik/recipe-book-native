import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const TextButton = ({ children, onPress, btnStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { ...btnStyle }]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

TextButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  btnStyle: PropTypes.object,
};
