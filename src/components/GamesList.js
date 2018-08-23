/* @flow */
import * as React from 'react';
import { View, Text } from 'react-native';

type Props = {
  games: Array<*>,
};

export default class GamesList extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.games, null, 2)}</Text>
      </View>
    );
  }
}
