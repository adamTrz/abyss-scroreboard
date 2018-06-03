/* @flow */
import React from 'react';
import { DefaultTheme, Provider, Text, Button } from 'react-native-paper';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Font, AppLoading } from 'expo';

import Main from './src';
import New from './src/New';
import NewScores from './src/NewScores';
import Settings from './src/Settings';
import Drawer from './src/Drawer';
import theme from './theme';

const appTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...theme.fonts,
  },
};

const Router = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: { header: null },
    },
    New: {
      screen: New,
      navigationOptions: { header: null },
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
    initialRouteName: 'New',
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

type State = {
  fontsLoaded: boolean,
};

export default class Abyss extends React.Component<void, State> {
  state = {
    fontsLoaded: false,
  };

  loadFonts = async () => {
    await Font.loadAsync({
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      spqr: require('./assets/fonts/spqr.ttf'),
    });
    this.setState({ fontsLoaded: true });
  };

  render() {
    return !this.state.fontsLoaded ? (
      <AppLoading
        startAsync={this.loadFonts}
        onFinish={() => this.setState({ fontsLoaded: true })}
      />
    ) : (
      <Provider theme={appTheme}>
        <App />
      </Provider>
    );
  }
}
