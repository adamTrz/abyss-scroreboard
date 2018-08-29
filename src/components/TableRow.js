/* @flow */
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Paragraph } from 'react-native-paper';

import theme from '../../theme';

const { width } = Dimensions.get('window');

type Props = {
  rowData: Array<string | number>,
  renderEmpty?: boolean,
  fontFamily?: $Values<typeof theme.fonts>,
};

const TableRow = ({
  rowData,
  renderEmpty,
  fontFamily = theme.fonts.spqr,
}: Props) => {
  const numberOfCells = renderEmpty ? rowData.length + 1 : rowData.length;
  const cellStyle = {
    width: width / numberOfCells,
  };
  return (
    <View style={styles.tableRow}>
      {!renderEmpty && (
        <View style={styles.firstCellImage}>
          <View style={styles.empty} />
        </View>
      )}
      {rowData.map(data => (
        <View
          key={`cell_${Math.random()}_${data}`}
          style={[styles.TableRowCell, cellStyle]}
        >
          <Paragraph numberOfLines={1} style={{ fontFamily }}>
            {data}
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
  TableRowCell: {
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default TableRow;
