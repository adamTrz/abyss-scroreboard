/* @flow */
import * as React from 'react';
import { Headline, TouchableRipple } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

import theme from '../../theme';

type Props = NavigationProps<{}> & { style?: * };

const BackButton = (props: Props) => (
  <TouchableRipple
    onPress={() => props.navigation.goBack()}
    style={[styles.btn, props.style]}
  >
    <Headline style={{ fontFamily: theme.fonts.spqr }}>{`<`}</Headline>
  </TouchableRipple>
);

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    left: 20,
    top: Constants.statusBarHeight,
  },
});
