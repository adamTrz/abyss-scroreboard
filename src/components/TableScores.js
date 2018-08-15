/* @flow */
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Paragraph } from 'react-native-paper';

import theme from '../../theme';

const { width } = Dimensions.get('window');

type Props = {
  scores: Array<number>,
};

const TableScores = ({ scores }: Props) => {
  const cellStyle = {
    width: width / (scores.length + 1),
  };
  return (
    <View style={styles.tableRow}>
      <View style={styles.firstCellImage}>
        <View style={styles.empty} />
      </View>
      {scores.map((score, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`score_${idx}`} style={[styles.tableHeaderCell, cellStyle]}>
          <Paragraph numberOfLines={1}>{score}</Paragraph>
        </View>
      ))}
    </View>
  );
};

export default TableScores;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
  },
  firstCellImage: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  empty: {
    width: 50,
  },
  tableHeaderCell: {
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
