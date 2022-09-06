import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#90B127',
  transparentPrimary: '#ADCE7490',
  lightGrey: '#DDDDDD',
  transparent: 'transparent',
  safe: '#75EC78',
  warning: '#FBEB41',
  info: '#45AFFA',
  danger: '#FF8650',
  lightBlack: '#F4F4F4',
  font: '#888888',
  white: '#ffffff',
  black: '#000000',
  grey: '#707070',
  transparentBlack: 'rgba(0, 0, 0, 0.7)',
  vata: '#2156C6',
  pitta: '#E85D10',
  kapha: '#34B269',
};

export const SIZES = {
  // app dimensions
  width,
  height,

  // global sizes
  padding: height / 40,
  halfPadding: height / 100,
  margin: height / 40,
  halfMargin: height / 100,
  radius: height / 60,

  // font sizes
  logo: 30,
  h1: 26,
  h2: 22,
  h3: 18,
  subtitle: 16,
  body1: 14,
  body2: 12,
  body3: 12,
};

export const FONTS = {
  logo: { fontFamily: 'Poppins-Medium', fontSize: SIZES.logo },
  h1: { fontFamily: 'Poppins-Bold', fontSize: SIZES.h1 },
  h2: { fontFamily: 'Poppins-Semibold', fontSize: SIZES.h2 },
  h3: { fontFamily: 'Poppins-Medium', fontSize: SIZES.h3 },
  subtitle: { fontFamily: 'Poppins-Medium', fontSize: SIZES.subtitle },
  body1: { fontFamily: 'Poppins-Medium', fontSize: SIZES.body1 },
  body2: { fontFamily: 'Poppins-Light', fontSize: SIZES.body2 },
  body3: { fontFamily: 'Poppins-Regular', fontSize: SIZES.body3 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
