/* @flow */
import * as React from 'react';
import { Headline, Paragraph, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { LinearGradient, Constants } from 'expo';

import theme from '../theme';
import BackButton from './components/BackButton';

const { width } = Dimensions.get('window');

const inputTheme = {
  colors: {
    disabled: theme.colors.text,
    primary: theme.colors.text,
    placeholder: theme.colors.text,
    accent: theme.colors.accent,
  },
};

const images = {
  keys: require('../assets/images/keys.png'),
  lords: require('../assets/images/lords.png'),
  allies: require('../assets/images/allies.png'),
  monsters: require('../assets/images/monsters.png'),
};

type GameData = {
  state: {
    params: {
      expKraken: boolean,
      expLeviathan: boolean,
      playersCount: number,
      players: Array<string>,
    },
  },
};
type Props = NavigationProps<GameData>;

type Categories =
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

  handleInputChange = (text: string, key: Categories, player: string) => {
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

  getScoreForPlayer = (player: string, key: Categories): string => {
    const playerScores = this.state.scores[player];
    return playerScores && playerScores[key] ? playerScores[key] : '';
  };

  saveScores = () => {
    console.log(this.state);
  };

  render() {
    const {
      navigation: {
        state: {
          params: { expKraken, expLeviathan, players, playersCount },
        },
      },
    } = this.props;
    const cellStyle = {
      width: width / (playersCount + 1),
    };
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.scrollView}>
          {/* TODO: Animate header */}
          <Image
            style={styles.image}
            source={require('../assets/images/politiciens.jpg')}
          />
          <View style={styles.tableRow}>
            <View style={styles.firstCellImage}>
              <View style={styles.empty} />
            </View>
            {/* TODO: Refactor to TableHeader component */}
            {players.map(player => (
              <View
                key={`player${player}`}
                style={[styles.tableHeaderCell, cellStyle]}
              >
                <Paragraph numberOfLines={1} style={{ fontFamily: 'spqr' }}>
                  {player}
                </Paragraph>
              </View>
            ))}
          </View>
          {Object.keys(images).map(key => (
            // Row
            <View style={styles.tableRow} key={`playerPoints_${key}`}>
              <View style={styles.firstCellImage}>
                <Image style={styles.tableImage} source={images[key]} />
              </View>
              {players.map(player => {
                const playerScore = this.getScoreForPlayer(player, key);
                return (
                  <View
                    key={`player_${key}_${player}`}
                    style={[styles.tableHeaderCell, cellStyle]}
                  >
                    <TextInput
                      theme={inputTheme}
                      style={styles.input}
                      value={playerScore}
                      onChangeText={text =>
                        this.handleInputChange(text, key, player)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                );
              })}
            </View>
          ))}
          {expKraken && (
            <View style={styles.tableRow}>
              <View style={styles.firstCellImage}>
                <Image
                  style={styles.tableImage}
                  source={require('../assets/images/black_pearl.png')}
                />
              </View>
              {players.map(player => {
                const playerScore = this.getScoreForPlayer(player, 'nebulis');
                return (
                  <View
                    key={`player_${player}_Nebulis`}
                    style={[styles.tableHeaderCell, cellStyle]}
                  >
                    <TextInput
                      theme={inputTheme}
                      style={styles.input}
                      value={playerScore}
                      onChangeText={text =>
                        this.handleInputChange(text, 'nebulis', player)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                );
              })}
            </View>
          )}
          {expLeviathan && (
            <React.Fragment>
              <View style={styles.tableRow}>
                <View style={styles.firstCellImage}>
                  <Image
                    style={styles.tableImage}
                    source={require('../assets/images/monster_l.png')}
                  />
                </View>
                {players.map(player => {
                  const playerScore = this.getScoreForPlayer(
                    player,
                    'leviathan'
                  );
                  return (
                    <View
                      key={`player_${player}_Leviathan`}
                      style={[styles.tableHeaderCell, cellStyle]}
                    >
                      <TextInput
                        theme={inputTheme}
                        style={styles.input}
                        value={playerScore}
                        onChangeText={text =>
                          this.handleInputChange(text, 'leviathan', player)
                        }
                        keyboardType="numeric"
                      />
                    </View>
                  );
                })}
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.firstCellImage, { borderBottomWidth: 0 }]}>
                  <Image
                    style={styles.tableImage}
                    source={require('../assets/images/wound.png')}
                  />
                </View>
                {players.map(player => {
                  const playerScore = this.getScoreForPlayer(player, 'wounds');
                  return (
                    <View
                      key={`player_${player}_LeviathanWounds`}
                      style={[
                        styles.tableHeaderCell,
                        cellStyle,
                        { borderBottomWidth: 0 },
                      ]}
                    >
                      <TextInput
                        theme={inputTheme}
                        style={styles.input}
                        value={playerScore}
                        onChangeText={text =>
                          this.handleInputChange(text, 'wounds', player)
                        }
                        keyboardType="numeric"
                      />
                    </View>
                  );
                })}
              </View>
            </React.Fragment>
          )}
          <Image
            source={require('../assets/images/separator.png')}
            style={styles.separator}
          />
          <Button style={styles.cta} raised onPress={this.saveScores}>
            hakuna matata
          </Button>
        </KeyboardAwareScrollView>
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
  tableImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    backgroundColor: theme.colors.background,
  },
  empty: {
    width: 50,
  },
  tableRow: {
    flexDirection: 'row',
  },
  firstCellImage: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
  },
  tableHeaderCell: {
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  input: {
    flex: 1,
  },
  separator: {
    width: width - 20,
    resizeMode: 'contain',
    marginTop: 20,
    marginHorizontal: 10,
  },
  cta: {
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
});
