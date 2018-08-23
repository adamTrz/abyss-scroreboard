/* @flow */
import * as React from 'react';
import { View, Text } from 'react-native';

import type { Game } from '../types';

type Props = {
  games: Array<?{ [id: string]: Game }>,
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
