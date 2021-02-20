const palette = {
  orange400: '#F68D14',

  green700: '#2C6A2E',
  green400: '#43A246',
  green300: '#54B057',

  red700: '#AB4141',
  red400: '#EC4E4E',
  red300: '#E85F5F',

  yellow900: '#2F2711',
  yellow700: '#D8AA2D',
  yellow400: '#E4CC2F',
  yellow50: '#F5F9E0',

  blue900: '#0B3333',
  blue700: '#13B1B1',
  blue400: '#227ECF',
  blue50: '#C0EBF6',

  overlayDark: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(255,255,255,0.3)',
  backDropLight: 'rgba(255,255,255,0.1)',

  black: '#141414',
  gray900: '#0E0E0E',
  gray850: '#1F1F1F',
  gray800: '#363636',
  gray600: '#828282',
  gray400: '#C2C2C2',
  gray300: '#DFDFDF',
  gray200: '#EFEFEF',
  white: '#fff',
};

export const colors = {
  white: palette.white,
  black: palette.black,

  primary: palette.green400,
  accent: palette.orange400,
  primaryDark: palette.green700,
  activeTintColor: palette.orange400,

  appBackground: palette.white,
  appSurface: palette.gray200,

  header: palette.green400,
  statusBar: palette.green700,

  textHeader: palette.white,
  text: palette.gray800,
  textNote: palette.gray600,
  error: palette.red400,

  blue: palette.blue400,
  lightBlue: palette.blue50,
  yellow: palette.yellow700,
  lightYellow: palette.yellow50,

  chip: palette.gray300,

  darkPositive: palette.green700,
  positiveColor: palette.green400,

  darkNegative: palette.red700,
  negativeColor: palette.red400,

  overlayDark: palette.overlayLight,
  overlayLight: palette.overlayDark,

  overlayColor: palette.overlayLight,
  backDrop: palette.overlayDark,

  shadow: palette.black,
};

export const themedColors = {
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    accent: palette.green400,
    activeTintColor: palette.white,

    appBackground: palette.black,
    appSurface: palette.gray850,

    header: palette.gray850,
    statusBar: palette.gray900,

    text: palette.gray400,
    textNote: palette.gray600,

    blue: palette.blue700,
    lightBlue: palette.blue900,
    yellow: palette.yellow400,
    lightYellow: palette.yellow900,

    chip: palette.gray800,

    darkPositive: palette.green700,
    positiveColor: palette.green300,

    darkNegative: palette.red700,
    negativeColor: palette.red300,

    overlayColor: palette.overlayDark,
    backDrop: palette.backDropLight,

    shadow: palette.white,
  },
};
