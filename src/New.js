/* @flow */
import * as React from 'react';
import {
  Headline,
  Checkbox,
  TouchableRipple,
  Paragraph,
  TextInput,
  HelperText,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { LinearGradient, Constants } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import times from 'lodash.times';

import theme from '../theme';

const { width } = Dimensions.get('window');
const inputTheme = {
  colors: {
    disabled: theme.colors.text,
    primary: theme.colors.text,
    placeholder: theme.colors.text,
  },
};

type Props = NavigationProps<{}>;
type State = {
  expKraken: boolean,
  expLeviathan: boolean,
  players: ?number,
  // TODO: type fields 'player1' and so on...
  // [string]?: string
};

export default class NewScore extends React.Component<Props, State> {
  state = {
    expKraken: false,
    expLeviathan: false,
    players: null,
  };

  playerInputs: Array<?TextInput> = [];

  renderRow = (label: string, stateKey: 'expKraken' | 'expLeviathan') => (
    <TouchableRipple
      onPress={() =>
        this.setState(state => ({
          [stateKey]: !state[stateKey],
        }))
      }
    >
      <View style={styles.row}>
        <Paragraph>{`Expansion: ${label}`}</Paragraph>
        <View pointerEvents="none">
          <Checkbox checked={this.state[stateKey]} />
        </View>
      </View>
    </TouchableRipple>
  );

  handlePlayersChange = (text: string) => {
    if (!text) {
      this.setState({ players: null });
      return;
    }
    // TODO: allow only 1,2,3,4,5 values
    const newText = text.split(/ /)[0].replace(/[^\d]/g, '');
    this.setState({ players: parseInt(newText, 10) });
  };

  createScoreboard = () => {
    this.props.navigation.navigate({
      routeName: 'NewScores',
      params: { ...this.state },
    });
  };

  handleEndEditing = (nextInputIdx: number, players: ?number) => {
    if (!players || nextInputIdx >= players) return;
    if (this.playerInputs[nextInputIdx])
      this.playerInputs[nextInputIdx].focus();
  };

  render() {
    const { expLeviathan, players } = this.state;
    const maxPlayersCount = expLeviathan ? 5 : 4;
    const inputError = !players || players > maxPlayersCount;
    const buttonDisabled =
      inputError ||
      times(players, player => this.state[`player${player}`]).some(
        playerName => !playerName
      );

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.scrollView}>
          <Image
            style={styles.image}
            source={require('../assets/images/emissaires2.jpg')}
          />
          {this.renderRow('Kraken', 'expKraken')}
          {this.renderRow('Leviathan', 'expLeviathan')}
          <View style={styles.inputContainerStyle}>
            <TextInput
              theme={inputTheme}
              style={styles.input}
              label={`Number of players (max. ${maxPlayersCount})`}
              value={players ? players.toString() : ''}
              onChangeText={this.handlePlayersChange}
              error={!!players && inputError}
              keyboardType="numeric"
            />
            <HelperText
              style={styles.errorText}
              type="error"
              visible={!!players && inputError}
            >
              {`Maximum ${maxPlayersCount} players!`}
            </HelperText>
          </View>
          {!inputError && (
            <React.Fragment>
              <Paragraph style={styles.paragraph}>Player names:</Paragraph>
              {times(players, count => (
                <TextInput
                  theme={inputTheme}
                  key={`player${count}`}
                  style={styles.input}
                  value={this.state[`player${count}`]}
                  placeholder={`Player ${count + 1} name`}
                  onChangeText={text =>
                    this.setState({ [`player${count}`]: text })
                  }
                  returnKeyType={count - 1 === players ? 'done' : 'next'}
                  onEndEditing={() => this.handleEndEditing(count + 1, players)}
                  ref={ref => {
                    this.playerInputs[count] = ref;
                  }}
                />
              ))}
            </React.Fragment>
          )}
        </KeyboardAwareScrollView>
        <Button
          dark
          style={styles.cta}
          disabled={buttonDisabled}
          raised
          onPress={this.createScoreboard}
        >
          Create
        </Button>
        <LinearGradient
          colors={[
            'rgba(9, 29, 65, 1)',
            'rgba(9, 29, 65, 0.1)',
            'rgba(9, 29, 65, 0)',
          ]}
          style={styles.titleBar}
        >
          <Headline style={{ fontFamily: 'spqr' }}>Create new game</Headline>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

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
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 10,
  },
  input: {
    width: width - 20,
    marginLeft: 10,
  },
  cta: {
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
  paragraph: {
    marginLeft: 10,
  },
  errorText: {
    marginLeft: 10,
  },
});
