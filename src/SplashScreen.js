/* @flow */
import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import theme from '../theme';

const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      style={styles.bg}
      source={require('../assets/images/splash.png')}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SplashScreen;
