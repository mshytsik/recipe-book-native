import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const MenuButton = ({ title, icon, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.buttonContainer}
      underlayColor="rgba(214, 52, 84, 0.3)"
    >
      <View style={styles.button}>
        <Icon name={icon} size={30} color="#ba0f30" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuButton;

MenuButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};
