/* @flow */
import * as React from 'react';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

type Props = NavigationProps<{}>;

export default class Notifications extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <Text>kupa</Text>
        <Button raised onPress={this.props.navigation.toggleDrawer}>
          Press me
        </Button>
      </SafeAreaView>
    );
  }
}
