import React from 'react';
import PropTypes from 'prop-types';

import { View, ImageBackground } from 'react-native';
import MenuButton from '../MenuButton/MenuButton';

import background from '../../../assets/splash.jpg';
import styles from './styles';

const screens = [
  { title: 'Recipes', icon: 'home', navigationLink: 'Recipes Book' },
  { title: 'Add Recipe', icon: 'pluscircleo', navigationLink: 'Add Recipe' },
  { title: 'Load Recipe', icon: 'clouddownloado', navigationLink: 'Load Recipe' },
];

const Menu = ({ navigation }) => {
  return (
    <ImageBackground source={background} style={styles.bgImage}>
      <View style={styles.container}>
        {screens.map((screen) => (
          <MenuButton
            title={screen.title}
            icon={screen.icon}
            onPress={() => {
              navigation.navigate(screen.navigationLink);
              navigation.closeDrawer();
            }}
            key={screen.navigationLink}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

export default Menu;

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
};
