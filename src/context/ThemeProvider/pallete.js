const palette = {
  orange400: '#F68D14',

  greenMoss: 'rgba(49, 216, 67, 0.5)',
  greenMossHover: 'rgba(49, 230, 67, 0.7)',

  red300: '#CA191B',
  red300Hover: '#CA301B',

  yellowCPEPrimary: '#E4CC2F',
  yellowMustard: 'rgba(255, 209, 7, 0.5)',
  yellowMustardHover: 'rgba(255, 215, 7, 0.7)',

  blue400: '#227ECF',
  blueSky: '#0085FF',

  overlayDark: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(255,255,255,0.3)',
  backDropLight: 'rgba(255,255,255,0.1)',

  black: '#000',
  gray900: '#141414',
  gray800: '#1D1D1D',
  grayDescription: '#5C5C5C',
  white: '#fff',
};

export const colors = {
  white: palette.white,
  black: palette.black,

  primary: palette.gray900 ,
  accent: palette.gray800,

  header: palette.black,
  statusBar: palette.gray800,

  textHeader: palette.white,
  text: palette.gray800,
  textNote: palette.gray600,
  error: palette.red400,

  blue: palette.blueSky,
  blueOk: palette.blue400,

  yellowCPE: palette.yellowMustard,
  yellow: palette.yellowMustard,
  yellowHover: palette.yellowMustardHover,

  red: palette.red300,
  redHover: palette.red300Hover,

  green: palette.greenMoss,
  greenHover: palette.greenMossHover,

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
