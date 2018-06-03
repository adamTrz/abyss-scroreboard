/* @flow */
import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

type Props = NavigationProps<{}>;

export default class App extends React.Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: <Text>My Games</Text>,
    headerLeft: (
      <Text onPress={navigation.toggleDrawer}>
        <MaterialIcons name="menu" size={18} marginLeft={10} />
      </Text>
    ),
  });

  render() {
    return (
      <SafeAreaView>
        <Text>MY GAMES</Text>
        <Button
          raised
          onPress={() => this.props.navigation.navigate('Notifications')}
        >
          Press me
        </Button>
      </SafeAreaView>
    );
  }
}
