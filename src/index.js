/* @flow */
import * as React from 'react';
import { Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import theme from '../theme';
import Hamburger from './components/Hamburger';
import ResultsList from './components/ResultsList';
import { fetchGameResults } from './store/games/actions';

const { width, height } = Dimensions.get('window');

type Score = {
  id: string,
  total: { [player: string]: number },
  timestamp: number,
};

type Props = NavigationProps<{}> & {
  fetchGameResults: typeof fetchGameResults,
  results: Array<Score>,
  gamesLoading: boolean,
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchGameResults();
  }

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
          <Hamburger navigation={this.props.navigation} />
          <ResultsList
            loading={this.props.gamesLoading}
            results={this.props.results}
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
  hamburger: {
    position: 'absolute',
    top: 30,
    left: 0,
    minWidth: 40,
  },
});

const mapStateToProps = state => ({
  results: state.games.games,
  gamesLoading: state.games.gamesLoading,
});

export default connect(
  mapStateToProps,
  { fetchGameResults }
)(App);
