import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { IslamicStar } from './IslamicPattern';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  showCornerDecoration?: boolean;
  color?: string;
}

export function GlassmorphicCard({
  children,
  style,
  showCornerDecoration = true,
  color,
}: GlassmorphicCardProps) {
  const { colors, isDark } = useTheme();
  const accentColor = color || colors.accent;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? 'rgba(30, 48, 80, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          borderColor: isDark ? 'rgba(201, 168, 76, 0.2)' : 'rgba(255, 255, 255, 0.5)',
        },
        style,
      ]}
    >
      {showCornerDecoration && (
        <>
          <View style={[styles.corner, styles.topLeft]}>
            <IslamicStar size={10} color={accentColor} opacity={0.25} />
          </View>
          <View style={[styles.corner, styles.topRight]}>
            <IslamicStar size={10} color={accentColor} opacity={0.25} />
          </View>
          <View style={[styles.corner, styles.bottomLeft]}>
            <IslamicStar size={10} color={accentColor} opacity={0.25} />
          </View>
          <View style={[styles.corner, styles.bottomRight]}>
            <IslamicStar size={10} color={accentColor} opacity={0.25} />
          </View>
        </>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    padding: 6,
  },
  topLeft: { top: 0, left: 0 },
  topRight: { top: 0, right: 0 },
  bottomLeft: { bottom: 0, left: 0 },
  bottomRight: { bottom: 0, right: 0 },
});
