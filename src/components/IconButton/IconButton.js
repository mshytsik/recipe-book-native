import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const IconButton = ({ icon, color = '#ffffff', onPress, isActive }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
      <Icon name={icon} size={24} color={color} />
      {isActive && (
        <View style={styles.active}>
          <Icon name="check" size={10} color="#ffffff" style={styles.activeIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

IconButton.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  isActive: PropTypes.bool,
};
