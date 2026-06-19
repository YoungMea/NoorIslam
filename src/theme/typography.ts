import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const arabicFontFamily = Platform.select({
  ios: 'System',
  android: 'Noto Naskh Arabic',
  default: 'System',
});

export const Typography = {
  // Headings
  h1: {
    fontFamily,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  } as TextStyle,
  h2: {
    fontFamily,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.3,
  } as TextStyle,
  h3: {
    fontFamily,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
  } as TextStyle,
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  } as TextStyle,

  // Body
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,
  body: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,
  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,

  // Arabic text - larger for Quran
  arabicLarge: {
    fontFamily: arabicFontFamily,
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 48,
    writingDirection: 'rtl',
  } as TextStyle,
  arabicMedium: {
    fontFamily: arabicFontFamily,
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 40,
    writingDirection: 'rtl',
  } as TextStyle,
  arabicSmall: {
    fontFamily: arabicFontFamily,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 32,
    writingDirection: 'rtl',
  } as TextStyle,

  // Transliteration
  transliteration: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'italic',
    color: '#6B7280',
  } as TextStyle,

  // Button
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,
  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,

  // Caption
  caption: {
    fontFamily,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,
};

export const Fonts = {
  regular: fontFamily,
  bold: fontFamily,
  arabic: arabicFontFamily,
};
