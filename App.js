/* @flow */
import React from 'react';
import { DefaultTheme, Provider, Text, Button } from 'react-native-paper';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Main from './src';
import New from './src/New';
import NewScores from './src/NewScores';
import Settings from './src/Settings';
import Drawer from './src/Drawer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const Router = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        headerTitle: <Text>MY GAMES</Text>,
      },
    },
    New: {
      screen: New,
      navigationOptions: {
        headerTitle: <Text>NEW GAME</Text>,
      },
    },
    NewScores: {
      screen: NewScores,
      navigationOptions: {
        headerTitle: <Text>NEW GAME</Text>,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerTitle: <Text>SETTINGS</Text>,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button compact icon="menu" flat onPress={navigation.toggleDrawer} />
      ),
    }),
  }
);

const App = createDrawerNavigator(
  {
    Router: {
      screen: Router,
    },
  },
  {
    contentComponent: Drawer,
  }
);

export default function Abyss() {
  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
}
