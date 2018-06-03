/* @flow */
import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Main from './src';
import Notifications from './src/Notifications';
import Drawer from './src/Drawer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const Router = createStackNavigator({
  Main: {
    screen: Main,
  },
  Notifications: {
    screen: Notifications,
  },
});

const App = createDrawerNavigator(
  {
    Router: {
      screen: Router,
    },
  },
  {
    contentComponent: Drawer,
    headerMode: 'screen',
  }
);

export default function Abyss() {
  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
}
