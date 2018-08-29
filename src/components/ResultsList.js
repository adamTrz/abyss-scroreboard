/* @flow */
import * as React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import TableRow from './TableRow';
import theme from '../../theme';

const { width } = Dimensions.get('window');
type Score = {
  id: string,
  total: { [player: string]: number },
  timestamp: number,
};
type Props = {
  results: Array<Score>,
  loading: boolean,
};

export default class ResultsList extends React.Component<Props> {
  renderItem = (itemData: { item: Score }) => {
    const players = Object.keys(itemData.item.total);
    const scores = Object.values(itemData.item.total);
    return (
      <TouchableOpacity
        key={itemData.item.id}
        onPress={() => console.log('itemData.item', itemData.item)}
      >
        <TableRow rowData={players} renderEmpty />
        <TableRow
          // $FlowFixMe I'm pretty sure this will be an array of numbers!
          rowData={scores}
          renderEmpty
          fontFamily={theme.fonts.medium}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { results, loading } = this.props;
    return (
      <View style={styles.container}>
        {loading && !results.length ? (
          <ActivityIndicator size="large" color={theme.colors.accent} />
        ) : (
          <FlatList
            data={results}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => <ListHeader />}
          />
        )}
      </View>
    );
  }
}

const Separator = () => <View style={styles.separator} />;

const ListHeader = () => <Text style={styles.header}>MY GAMES</Text>;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width,
    flexGrow: 1,
  },
  header: {
    fontFamily: theme.fonts.spqr,
    fontSize: 26,
    // alignSelf: 'center',
    textAlign: 'center',
  },
  separator: {
    width,
    height: 1,
    backgroundColor: theme.colors.text,
  },
});
