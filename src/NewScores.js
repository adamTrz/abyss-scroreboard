/* @flow */
import * as React from 'react';
import { Headline, TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient, Constants } from 'expo';

import theme, { inputTheme } from '../theme';
import BackButton from './components/BackButton';
import TableHeader from './components/TableHeader';
import TableScores from './components/TableScores';
import Table from './components/Table';
import { createGame } from './firebase';

const { width } = Dimensions.get('window');

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
  message: string,
};

class NewScores extends React.Component<Props, State> {
  state = {
    scores: this.props.navigation.state.params.players.reduce(
      (prev, curr) => ({ ...prev, [curr]: {} }),
      {}
    ),
    message: '',
  };

  inputRefs: Array<?TextInput> = [];

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

  focusNextInput = (index: number) => {
    if (this.inputRefs[index + 1]) {
      // $FlowFixMe
      this.inputRefs[index + 1].focus();
    }
  };

  getScoreForPlayer = (player: string, key: Category): string => {
    const playerScores = this.state.scores[player];
    return playerScores && playerScores[key] ? playerScores[key] : '';
  };

  calculateScores = () => {
    const {
      navigation: {
        state: {
          params: { players },
        },
      },
    } = this.props;
    const scores = players.map(player => {
      const playerScores = this.state.scores[player];
      if (!playerScores || !Object.values(playerScores).length) return 0;
      return Object.entries(playerScores).reduce(
        (prev, curr) =>
          curr[0] === 'nebulis' || curr[0] === 'wounds'
            ? prev - parseInt(curr[1], 10)
            : prev + parseInt(curr[1], 10),
        0
      );
    });
    return scores;
  };

  saveScores = () => {
    const { scores } = this.state;
    const playersTotal = this.calculateScores();
    const wholeScores = Object.keys(scores).map((player, idx) => ({
      [player]: { ...scores[player], total: playersTotal[idx] },
    }));
    createGame(wholeScores)
      .then(_ => {
        this.setState({
          message: 'Game saved',
          scores: this.props.navigation.state.params.players.reduce(
            (prev, curr) => ({ ...prev, [curr]: {} }),
            {}
          ),
        });
        this.props.navigation.popToTop();
      })
      .catch(e => this.setState({ message: e.message }));
  };

  renderCell = (key: Category, player: string, index: number) => {
    const playerScore = this.getScoreForPlayer(player, key);
    return (
      <TextInput
        ref={ref => {
          this.inputRefs[index] = ref;
        }}
        theme={inputTheme}
        style={styles.input}
        value={playerScore}
        onChangeText={text => this.handleInputChange(text, key, player)}
        onSubmitEditing={() => this.focusNextInput(index)}
        keyboardType="numeric"
        maxLength={2}
        returnKeyType="next"
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
    const scores = this.calculateScores();
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.scrollView}>
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
          <TableScores scores={scores} />
          <Button style={styles.cta} raised onPress={this.saveScores}>
            Save
          </Button>
        </KeyboardAwareScrollView>
        <LinearGradient
          colors={['rgba(9, 29, 65, 1)', 'rgba(9, 29, 65, 0.3)']}
          style={styles.titleBar}
        >
          <BackButton navigation={this.props.navigation} />
          <Headline style={{ fontFamily: 'spqr' }}>Scores</Headline>
        </LinearGradient>
        <Snackbar
          onDismiss={() => this.setState({ message: '' })}
          visible={!!this.state.message}
        >
          {this.state.message}
        </Snackbar>
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
    paddingBottom: 20,
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
    alignSelf: 'center',
    width: width - 40,
    marginVertical: 20,
  },
});
