/* @flow */
import * as React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

type Props = NavigationProps<{}>;

export default class Settings extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Text>Settings </Text>
      </SafeAreaView>
    );
  }
}
