/* @flow */
import * as React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Font } from 'expo';

const { width } = Dimensions.get('window');

type Props = NavigationProps<{}>;
type State = {
  fontLoaded: boolean,
};
export default class App extends React.Component<Props, State> {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    this.loadFonts();
  }

  loadFonts = async () => {
    await Font.loadAsync({
      'lato-light': require('../assets/fonts/Lato-Light.ttf'),
    });
    this.setState({ fontLoaded: true });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        {this.state.fontLoaded && <Text style={styles.header}>MY GAMES</Text>}
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
    backgroundColor: '#000',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width,
    height: 200,
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
