/* @flow */
import * as React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text } from 'react-native-paper';

export default class Drawer extends React.Component<void> {
  render() {
    return (
      <SafeAreaView>
        <Text>hello from drawer</Text>;
      </SafeAreaView>
    );
  }
}
