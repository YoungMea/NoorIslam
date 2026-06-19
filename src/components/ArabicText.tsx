import React from 'react';
import { Text, StyleSheet, TextStyle, Platform } from 'react-native';

interface ArabicTextProps {
  text: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
  style?: TextStyle;
  align?: 'center' | 'left' | 'right' | 'auto';
  lineHeight?: number;
}

const fontSizeMap = {
  small: 18,
  medium: 24,
  large: 30,
  xlarge: 36,
};

export function ArabicText({
  text,
  size = 'medium',
  color,
  style,
  align = 'center',
  lineHeight,
}: ArabicTextProps) {
  const fontSize = fontSizeMap[size];

  return (
    <Text
      style={[
        styles.arabic,
        {
          fontSize,
          color: color || '#1A1A2E',
          textAlign: align === 'auto' ? undefined : align,
          lineHeight: lineHeight || fontSize * 1.8,
          writingDirection: 'rtl',
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  arabic: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'System',
    }),
    fontWeight: '400',
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    textAlign: 'center',
  },
  translation: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
});

// Bismillah component
export function Bismillah({ size = 'medium', color }: { size?: 'small' | 'medium' | 'large' | 'xlarge'; color?: string }) {
  return (
    <ArabicText
      text="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
      size={size}
      color={color}
    />
  );
}

// Transliteration text
export function TransliterationText({
  text,
  color,
}: {
  text: string;
  color?: string;
}) {
  return (
    <Text style={[styles.transliteration, { color: color || '#6B7280' }]}>
      {text}
    </Text>
  );
}

// Translation text
export function TranslationText({
  text,
  color,
}: {
  text: string;
  color?: string;
}) {
  return (
    <Text style={[styles.translation, { color: color || '#4B5563' }]}>
      {text}
    </Text>
  );
}
