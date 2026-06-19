import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { IslamicStar } from './IslamicPattern';

interface AnimatedCardProps {
  title: string;
  titleArabic?: string;
  icon: string;
  color?: string;
  onPress: () => void;
  index?: number;
  style?: ViewStyle;
  subtitle?: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 56) / 2;

export function AnimatedCard({
  title,
  titleArabic,
  icon,
  color,
  onPress,
  index = 0,
  style,
  subtitle,
}: AnimatedCardProps) {
  const { colors, isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100;
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const cardColor = color || colors.primary;
  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <Animated.View
      style={[
        {
          transform: [
            { scale: scaleAnim },
            { scale },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
        style={[
          styles.card,
          {
            width: CARD_WIDTH,
            backgroundColor: isDark ? colors.card : colors.white,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
          style,
        ]}
      >
        {/* Islamic corner decorations */}
        <View style={[styles.corner, styles.cornerTopLeft]}>
          <IslamicStar size={12} color={cardColor} opacity={0.3} />
        </View>
        <View style={[styles.corner, styles.cornerTopRight]}>
          <IslamicStar size={12} color={cardColor} opacity={0.3} />
        </View>

        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: cardColor + '15' }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>

        {titleArabic && (
          <Text style={[styles.titleArabic, { color: cardColor }]}>{titleArabic}</Text>
        )}

        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        )}

        {/* Bottom accent line */}
        <View style={[styles.accentLine, { backgroundColor: cardColor }]} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    paddingTop: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    minHeight: 140,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    flex: 1,
  },
  titleArabic: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 4,
  },
  accentLine: {
    height: 3,
    width: 30,
    borderRadius: 2,
    marginTop: 8,
  },
  corner: {
    position: 'absolute',
    padding: 4,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
  },
});
