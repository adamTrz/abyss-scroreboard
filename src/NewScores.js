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

class NewScores extends React.Component<Props> {
  handleInputChange = (text: string, key: string, player: string) => {
    console.log(text, key, player);
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
          <Image
            style={styles.image}
            source={require('../assets/images/politiciens.jpg')}
          />
          <View style={styles.tableRow}>
            <View style={styles.firstCellImage}>
              <View style={styles.empty} />
            </View>
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
            <View style={styles.tableRow} key={`playerPoints_${key}`}>
              <View style={styles.firstCellImage}>
                <Image style={styles.tableImage} source={images[key]} />
              </View>
              {players.map(player => (
                <View
                  key={`player_${key}_${player}`}
                  style={[styles.tableHeaderCell, cellStyle]}
                >
                  <TextInput
                    theme={inputTheme}
                    style={styles.input}
                    // value={0}
                    onChangeText={text =>
                      this.handleInputChange(text, key, player)
                    }
                    keyboardType="numeric"
                  />
                </View>
              ))}
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
              {players.map(player => (
                <View
                  key={`player_${player}_Nebulis`}
                  style={[styles.tableHeaderCell, cellStyle]}
                >
                  <TextInput
                    theme={inputTheme}
                    style={styles.input}
                    // value={0}
                    onChangeText={text =>
                      this.handleInputChange(text, 'nebulis', player)
                    }
                    keyboardType="numeric"
                  />
                </View>
              ))}
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
                {players.map(player => (
                  <View
                    key={`player_${player}_Leviathan`}
                    style={[styles.tableHeaderCell, cellStyle]}
                  >
                    <TextInput
                      theme={inputTheme}
                      style={styles.input}
                      // value={0}
                      onChangeText={text =>
                        this.handleInputChange(text, 'leviathan', player)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                ))}
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.firstCellImage, { borderBottomWidth: 0 }]}>
                  <Image
                    style={styles.tableImage}
                    source={require('../assets/images/wound.png')}
                  />
                </View>
                {players.map(player => (
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
                      // value={0}
                      onChangeText={text =>
                        this.handleInputChange(text, 'wounds', player)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                ))}
              </View>
            </React.Fragment>
          )}
          <Image
            source={require('../assets/images/separator.png')}
            style={styles.separator}
          />
          <Button>hakuna matata</Button>
        </KeyboardAwareScrollView>
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
});
