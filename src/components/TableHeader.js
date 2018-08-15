/* @flow */
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Paragraph } from 'react-native-paper';

import theme from '../../theme';

const { width } = Dimensions.get('window');

type Props = {
  players: Array<string>,
  playersCount: number,
};

const TableHeader = ({ players, playersCount }: Props) => {
  const cellStyle = {
    width: width / (playersCount + 1),
  };
  return (
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
  );
};

const styles = StyleSheet.create({
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
  empty: {
    width: 50,
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

export default TableHeader;
