/* @flow */
import * as React from 'react';
import { Text, ScrollView } from 'react-native';

type Score = Array<{ [player: string]: number }>;
type Props = {
  results: Array<Score>,
};

export default class ResultsList extends React.Component<Props> {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{JSON.stringify(this.props.results, null, 2)}</Text>
      </ScrollView>
    );
  }
}
