/* @flow */
import * as React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import TableRow from './TableRow';
import theme from '../../theme';

const { width } = Dimensions.get('window');

const makeDateString = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString();

type Score = {
  id: string,
  total: { [player: string]: number },
  timestamp: number,
};
type Props = {
  results: Array<Score>,
  loading: boolean,
};
type SectionData = { section: { title: string } };
export default class ResultsList extends React.Component<Props> {
  renderHeader = (sectionData: SectionData) => (
    <Text style={styles.sectionHeader}>{sectionData.section.title}</Text>
  );

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
    const dates = results.map(r => makeDateString(r.timestamp));
    const uniqueDates = Array.from(new Set(dates));
    const sections = uniqueDates.map(d => ({
      title: d,
      data: results.filter(r => makeDateString(r.timestamp) === d),
    }));
    return (
      <View style={styles.container}>
        {loading || !results.length ? (
          <ActivityIndicator size="large" color={theme.colors.accent} />
        ) : (
          <SectionList
            sections={sections}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            SectionSeparatorComponent={() => <Separator />}
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
    textAlign: 'center',
  },
  sectionHeader: {
    fontFamily: theme.fonts.thin,
    paddingVertical: 3,
  },
  separator: {
    width,
    height: 1,
    backgroundColor: theme.colors.accent,
    opacity: 0.5,
  },
});
