import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

import Navigation from './src/navigation/Navigation';
import Menu from './src/components/Menu/Menu';

const MenuDrawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuDrawer.Navigator
          screenOptions={{
            swipeEdgeWidth: 0,
            headerShown: false,
            drawerStyle: {
              width: 280,
            },
          }}
          drawerContent={({ navigation }) => <Menu navigation={navigation} />}
        >
          <MenuDrawer.Screen name="Navigation" component={Navigation} />
        </MenuDrawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
