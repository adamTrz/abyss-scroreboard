/* @flow */
import React from 'react';
import { DefaultTheme, Provider, Text } from 'react-native-paper';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Font, AppLoading, Asset } from 'expo';
import { StatusBar } from 'react-native';

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

const Router = createStackNavigator({
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
    navigationOptions: { header: null },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: <Text>SETTINGS</Text>,
    },
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
  }
);

type State = {
  fontsLoaded: boolean,
};

export default class Abyss extends React.Component<void, State> {
  state = {
    fontsLoaded: false,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  loadAssets = async () => {
    await this.loadImages();
    await this.loadFonts();
  };

  loadImages = async () => {
    const images = [
      require('./assets/images/logo-abyss.png'),
      require('./assets/images/background-artbook.jpg'),
    ];
    const cacheImages = images.map(image =>
      Asset.fromModule(image).downloadAsync()
    );
    return Promise.all(cacheImages);
  };

  loadFonts = async () => {
    await Font.loadAsync({
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      spqr: require('./assets/fonts/spqr.ttf'),
    });
  };

  render() {
    return !this.state.fontsLoaded ? (
      <AppLoading
        startAsync={this.loadAssets}
        onFinish={() => this.setState({ fontsLoaded: true })}
      />
    ) : (
      <Provider theme={appTheme}>
        <App />
      </Provider>
    );
  }
}
