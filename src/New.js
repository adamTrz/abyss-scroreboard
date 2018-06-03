/* @flow */
import * as React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

type Props = NavigationProps<{}>;

// eslint-disable-next-line no-unused-vars
const NewScore = (props: Props) => (
  <SafeAreaView>
    <Text>New Game</Text>
  </SafeAreaView>
);

export default NewScore;
