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
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#123849',
    text: '#fff',
    background: '#091c20',
  },
  fonts: {
    ...DefaultTheme.fonts,
    light: 'lato-light',
  },
};

const Router = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
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
      headerLeft: (
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
