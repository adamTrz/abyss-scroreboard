/* @flow */
import * as React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

type Props = NavigationProps<{}>;

export default class New extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Text>New Game </Text>
      </SafeAreaView>
    );
  }
}
