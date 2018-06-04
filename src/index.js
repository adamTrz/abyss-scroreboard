/* @flow */
import * as React from 'react';
import { Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

import theme from '../theme';

const { width, height } = Dimensions.get('window');

type Props = NavigationProps<{}>;
export default class App extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require('../assets/images/background-default.jpg')}
        >
          <Image
            style={styles.image}
            source={require('../assets/images/logo-abyss.png')}
          />
          <Text style={styles.header}>MY GAMES</Text>
          {/* $FlowFixMe we don't want to pass children to Button */}
          <Button
            icon="menu"
            onPress={this.props.navigation.toggleDrawer}
            style={styles.hamburger}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  bg: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    fontFamily: 'spqr',
    fontSize: 26,
  },
  hamburger: {
    position: 'absolute',
    top: 30,
    left: 0,
    minWidth: 40,
  },
});
