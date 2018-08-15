/* @flow */
import React from 'react';
import { DefaultTheme, Provider, Text } from 'react-native-paper';
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Font, AppLoading, Asset } from 'expo';
import { StatusBar } from 'react-native';
import * as firebase from 'firebase';

import Main from './src';
import New from './src/New';
import NewScores from './src/NewScores';
import SplashScreen from './src/SplashScreen';
import Login from './src/Login';
import Settings from './src/Settings';
import Drawer from './src/Drawer';
import theme from './theme';

type Props = NavigationProps<{}>;

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

// TODO: Drawer for Android, TabNavigator for iOS
const AppStack = createDrawerNavigator(
  {
    Router: {
      screen: Router,
    },
  },
  {
    contentComponent: Drawer,
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    navigationOptions: { header: null },
  }
);

type State = {
  assetsLoaded: boolean,
  user: ?*,
};

// eslint-disable-next-line react/no-multi-comp
class App extends React.Component<Props, State> {
  state = {
    assetsLoaded: false,
    user: null,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    this.initFirebase();
  }

  initFirebase = () => {
    const config = {
      apiKey: 'AIzaSyCVIyTocX9_Xh-rkHYlJ0UsbytauqV_3ds',
      authDomain: 'abyss-16d0f.firebaseapp.com',
      databaseURL: 'https://abyss-16d0f.firebaseio.com',
      projectId: 'abyss-16d0f',
      storageBucket: 'abyss-16d0f.appspot.com',
      messagingSenderId: '361042150852',
    };
    firebase.initializeApp(config);
  };

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
    return !this.state.assetsLoaded ? (
      <AppLoading
        startAsync={this.loadAssets}
        onFinish={() => this.setState({ assetsLoaded: true })}
      />
    ) : (
      <Provider theme={appTheme}>
        <Switch />
      </Provider>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class Loading extends React.Component<Props> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.navigation.navigate('App');
      else this.props.navigation.navigate('Login');
    });
  }

  render() {
    return <SplashScreen />;
  }
}

const Switch = createSwitchNavigator(
  {
    Loading,
    App: AppStack,
    Login: LoginStack,
  },
  {
    initialRouteName: 'Loading',
  }
);

export default App;
