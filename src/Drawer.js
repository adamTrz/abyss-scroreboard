/* @flow */
import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { DrawerItem } from 'react-native-paper';

import theme from '../theme';

const items = [
  { label: 'My Games', route: 'Main' },
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

  renderItem = (item: { label: string, route: string }) => (
    <DrawerItem
      theme={{ fonts: { medium: 'spqr' } }}
      key={item.label}
      label={item.label.toUpperCase()}
      onPress={() => this.navigateTo(item.route)}
      icon={require('../assets/images/perle.png')}
      style={styles.drawerItem}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/badge1.png')}
        />
        {items.map(this.renderItem)}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.drawerBackground,
    alignItems: 'center',
  },
  avatar: {
    marginVertical: 50,
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  drawerItem: {
    alignSelf: 'flex-start',
  },
});
