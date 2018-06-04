/* @flow */
import * as React from 'react';
import { Headline, TouchableRipple } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

type Props = NavigationProps<{}> & { style?: * };

const Hamburger = (props: Props) => (
  <TouchableRipple
    onPress={() => props.navigation.toggleDrawer()}
    style={[styles.burger, props.style]}
  >
    <Headline style={{ fontFamily: 'spqr' }}>{`3`}</Headline>
  </TouchableRipple>
);

export default Hamburger;

const styles = StyleSheet.create({
  burger: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    left: 20,
    top: Constants.statusBarHeight,
  },
});
