// @flow
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#123849',
    text: '#fff',
    background: '#091c20',
    accent: '#3fb8b2',
  },
  fonts: {
    light: 'lato-light',
    thin: 'lato-light',
    medium: 'lato-regular',
    regular: 'lato-regular',
  },
};

export default theme;
