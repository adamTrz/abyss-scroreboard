/* @flow */
import * as React from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as firebase from 'firebase';
import { TextInput, Button, Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import theme from '../theme';

const { width } = Dimensions.get('window');
const inputTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    disabled: theme.colors.text,
    primary: theme.colors.text,
    placeholder: theme.colors.text,
    accent: theme.colors.accent,
  },
};

type Props = NavigationProps<{}>;

type State = {
  email: string,
  password: string,
};

export default class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
  };

  passwordInput: ?TextInput;

  signInWithUserAndPass = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          this.logInWithUserAndPass();
          return;
        }
        const errorMessage = error.message;
        Alert.alert('Oops. Something went wrong.', errorMessage);
      });
  };

  logInWithUserAndPass = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        const errorMessage = error.message;
        Alert.alert('Oops. Something went wrong.', errorMessage);
      });
  };

  focusPaswordInput = () => {
    if (this.passwordInput) this.passwordInput.focus();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require('../assets/images/background-default.jpg')}
        >
          <KeyboardAwareScrollView
            enableOnAndroid
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
          >
            <Image
              style={styles.image}
              source={require('../assets/images/logo-abyss.png')}
            />
            <Text style={styles.header}>Log In</Text>
            <TextInput
              theme={inputTheme}
              style={styles.input}
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={this.focusPaswordInput}
            />
            <TextInput
              ref={ref => {
                this.passwordInput = ref;
              }}
              theme={inputTheme}
              style={styles.input}
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={this.signInWithUserAndPass}
            />
          </KeyboardAwareScrollView>
          <Button
            style={styles.cta}
            raised
            onPress={this.signInWithUserAndPass}
            disabled={!this.state.email || !this.state.password}
          >
            Log In
          </Button>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'contain',
  },
  header: {
    fontFamily: 'spqr',
    fontSize: 26,
  },
  input: {
    width: width - 20,
    marginLeft: 10,
  },
  cta: {
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
});
