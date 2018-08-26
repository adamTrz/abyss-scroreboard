/* @flow */
import * as React from 'react';
import { Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

import theme from '../theme';
import Hamburger from './components/Hamburger';
import GamesList from './components/GamesList';
import { fetchGames } from './firebase';
import type { Game } from './types';

const { width, height } = Dimensions.get('window');

type Props = NavigationProps<{}>;

type State = {
  games: Array<?{ [id: string]: Game }>,
};
export default class App extends React.Component<Props, State> {
  state = {
    games: [],
  };

  componentDidMount() {
    this.fetchGames();
  }

  fetchGames = async () => {
    const games = await fetchGames();
    this.setState({ games });
  };

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
          <Hamburger navigation={this.props.navigation} />
          <GamesList games={this.state.games} />
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
