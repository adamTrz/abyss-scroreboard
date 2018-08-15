/* @flow */
import * as React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';

import theme from '../../theme';
import type { Category, GameData } from '../NewScores';

const { width } = Dimensions.get('window');

const images = {
  keys: require('../../assets/images/keys.png'),
  lords: require('../../assets/images/lords.png'),
  allies: require('../../assets/images/allies.png'),
  monsters: require('../../assets/images/monsters.png'),
};

type Props = GameData & {
  renderCell: (
    key: Category,
    player: string,
    index: number
  ) => React.Element<*>,
};

class Table extends React.Component<Props> {
  render() {
    const {
      players,
      playersCount,
      expKraken,
      expLeviathan,
      renderCell,
    } = this.props;
    const cellStyle = {
      width: width / (playersCount + 1),
    };
    return (
      <View style={styles.container}>
        {Object.keys(images).map((key, index) => (
          <View style={styles.tableRow} key={`playerPoints_${key}`}>
            <View style={styles.firstCellImage}>
              <Image style={styles.tableImage} source={images[key]} />
            </View>
            {players.map((player, idx) => (
              <View
                key={`player_${key}_${player}`}
                style={[styles.tableHeaderCell, cellStyle]}
              >
                {renderCell(key, player, index * playersCount + idx + 1)}
              </View>
            ))}
          </View>
        ))}
        {expKraken && (
          <View style={styles.tableRow}>
            <View style={styles.firstCellImage}>
              <Image
                style={styles.tableImage}
                source={require('../../assets/images/black_pearl.png')}
              />
            </View>
            {players.map((player, idx) => (
              <View
                key={`player_${player}_Nebulis`}
                style={[styles.tableHeaderCell, cellStyle]}
              >
                {renderCell(
                  'nebulis',
                  player,
                  (Object.keys(images).length + 1) * playersCount + idx + 1
                )}
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
                  source={require('../../assets/images/monster_l.png')}
                />
              </View>
              {players.map((player, idx) => (
                <View
                  key={`player_${player}_Leviathan`}
                  style={[styles.tableHeaderCell, cellStyle]}
                >
                  {renderCell(
                    'leviathan',
                    player,
                    (Object.keys(images).length + 2) * playersCount + (idx + 1)
                  )}
                </View>
              ))}
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.firstCellImage, { borderBottomWidth: 0 }]}>
                <Image
                  style={styles.tableImage}
                  source={require('../../assets/images/wound.png')}
                />
              </View>
              {players.map((player, idx) => (
                <View
                  key={`player_${player}_LeviathanWounds`}
                  style={[
                    styles.tableHeaderCell,
                    cellStyle,
                    { borderBottomWidth: 0 },
                  ]}
                >
                  {renderCell(
                    'wounds',
                    player,
                    (Object.keys(images).length + 3) * playersCount + idx + 1
                  )}
                </View>
              ))}
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  tableImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    backgroundColor: theme.colors.background,
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
});

export default Table;
