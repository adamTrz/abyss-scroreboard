/* @flow */
import * as React from 'react';
import { Headline, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { LinearGradient, Constants } from 'expo';

import theme from '../theme';
import BackButton from './components/BackButton';

const { width } = Dimensions.get('window');

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
      height: width / (playersCount + 1),
    };
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.scrollView}>
          <Image
            style={styles.image}
            source={require('../assets/images/emissaires2.jpg')}
          />
          <View style={styles.tableHeader}>
            <View style={[styles.tableHeaderCell, cellStyle]}>
              <Image
                style={styles.tableImage}
                source={require('../assets/images/badge1.png')}
              />
            </View>
            {players.map(player => (
              <View
                key={`player${player}`}
                style={[styles.tableHeaderCell, cellStyle]}
              >
                <Paragraph style={{ fontFamily: 'spqr' }}>{player}</Paragraph>
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>
        <LinearGradient
          colors={[
            'rgba(9, 29, 65, 1)',
            'rgba(9, 29, 65, 0.1)',
            'rgba(9, 29, 65, 0)',
          ]}
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
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
