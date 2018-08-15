/* @flow */
import * as React from 'react';
import { Headline, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient, Constants } from 'expo';

import theme from '../theme';
import BackButton from './components/BackButton';
import TableHeader from './components/TableHeader';
import Table from './components/Table';

const { width } = Dimensions.get('window');

const inputTheme = {
  colors: {
    disabled: theme.colors.text,
    primary: theme.colors.text,
    placeholder: theme.colors.text,
    accent: theme.colors.accent,
  },
};

export type GameData = {
  expKraken: boolean,
  expLeviathan: boolean,
  playersCount: number,
  players: Array<string>,
};
type Props = NavigationProps<{ state: { params: GameData } }>;

export type Category =
  | 'keys'
  | 'lords'
  | 'allies'
  | 'monsters'
  | 'nebulis'
  | 'leviathan'
  | 'wounds';

type Score = {
  keys: string,
  lords: string,
  allies: string,
  monsters: string,
  nebulis?: string,
  leviathan?: string,
  wounds?: string,
};
type State = {
  scores: {
    [key: string]: Score,
  },
};

class NewScores extends React.Component<Props, State> {
  state = {
    scores: {},
  };

  handleInputChange = (text: string, key: Category, player: string) => {
    this.setState(state => ({
      scores: {
        ...state.scores,
        [player]: {
          ...state.scores[player],
          [key]: text,
        },
      },
    }));
  };

  getScoreForPlayer = (player: string, key: Category): string => {
    const playerScores = this.state.scores[player];
    return playerScores && playerScores[key] ? playerScores[key] : '';
  };

  saveScores = () => {
    console.log(this.state);
  };

  renderCell = (key: Category, player: string) => {
    const playerScore = this.getScoreForPlayer(player, key);
    return (
      <TextInput
        theme={inputTheme}
        style={styles.input}
        value={playerScore}
        onChangeText={text => this.handleInputChange(text, key, player)}
        keyboardType="numeric"
      />
    );
  };

  render() {
    const {
      navigation: {
        state: {
          params: { expKraken, expLeviathan, players, playersCount },
        },
      },
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.scrollView}>
          {/* TODO: Animate header */}
          <Image
            style={styles.image}
            source={require('../assets/images/politiciens.jpg')}
          />

          <TableHeader players={players} playersCount={playersCount} />
          <Table
            players={players}
            playersCount={playersCount}
            expKraken={expKraken}
            expLeviathan={expLeviathan}
            renderCell={this.renderCell}
          />
        </KeyboardAwareScrollView>
        <Button style={styles.cta} raised onPress={this.saveScores}>
          hakuna matata
        </Button>
        {/* TODO: Animate header */}
        <LinearGradient
          colors={['rgba(9, 29, 65, 1)', 'rgba(9, 29, 65, 0.3)']}
          style={styles.titleBar}
        >
          <BackButton navigation={this.props.navigation} />
          <Headline style={{ fontFamily: 'spqr' }}>Scores</Headline>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default NewScores;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  titleBar: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    flex: 1,
  },
  cta: {
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
});
