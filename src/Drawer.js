/* @flow */
import * as React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { DrawerItem } from 'react-native-paper';

const items = [
  { label: 'My games', route: 'Main' },
  { label: 'New Game', route: 'New' },
  { label: 'Settings', route: 'Settings' },
  { label: 'Disclaimer', route: 'Disclaimer' },
];

type Props = NavigationProps<{}>;

export default class Drawer extends React.Component<Props> {
  navigateTo = (route: string) => {
    this.props.navigation.navigate(route);
    // $FlowFixMe bad typing of DrawerActions.closeDrawer()
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  render() {
    return (
      <SafeAreaView>
        {items.map(item => (
          <DrawerItem
            key={item.label}
            label={item.label}
            onPress={() => this.navigateTo(item.route)}
          />
        ))}
      </SafeAreaView>
    );
  }
}
