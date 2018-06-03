/* @flow */
import * as React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

const { width } = Dimensions.get('window');

type Props = NavigationProps<{}>;
export default class App extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/logo-abyss.png')}
        />
        <Text style={styles.header}>MY GAMES</Text>
        <Button
          icon="menu"
          onPress={this.props.navigation.toggleDrawer}
          style={styles.hamburger}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091c20',
    alignItems: 'center',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    fontFamily: 'lato-light',
    fontSize: 26,
  },
  hamburger: {
    position: 'absolute',
    top: 30,
    left: 0,
    minWidth: 40,
  },
});
