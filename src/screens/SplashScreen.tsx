import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { IslamicBackgroundPattern } from '../components/IslamicPattern';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;
  const moonAnim = useRef(new Animated.Value(0)).current;
  const starAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in the background
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Scale in the greeting
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Moon animation
      Animated.timing(moonAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ]).start();

    // Star twinkle
    Animated.loop(
      Animated.sequence([
        Animated.timing(starAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Navigate to dashboard after delay
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const moonInterpolation = moonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const starScale = starAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background pattern */}
      <IslamicBackgroundPattern opacity={0.08} />

      {/* Stars */}
      <Animated.View
        style={[
          styles.star,
          styles.star1,
          { opacity: moonAnim, transform: [{ scale: starScale }] },
        ]}
      >
        <Text style={styles.starText}>✦</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.star,
          styles.star2,
          { opacity: moonAnim, transform: [{ scale: starScale }] },
        ]}
      >
        <Text style={[styles.starText, styles.starTextSmall]}>✧</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.star,
          styles.star3,
          { opacity: Animated.subtract(1, moonAnim), transform: [{ scale: starScale }] },
        ]}
      >
        <Text style={styles.starText}>✦</Text>
      </Animated.View>

      {/* Moon */}
      <Animated.View
        style={[
          styles.moonContainer,
          { transform: [{ translateY: moonInterpolation }] },
        ]}
      >
        <View style={[styles.moon, { backgroundColor: colors.gold }]} />
        <View style={[styles.moonShadow, { backgroundColor: colors.background }]} />
      </Animated.View>

      {/* Main greeting */}
      <Animated.View
        style={[
          styles.greetingContainer,
          {
            opacity: titleFade,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[styles.greetingArabic, { color: colors.primary }]}>
          ٱلسَّلَامُ عَلَيْكُمْ
        </Text>
        <Text style={[styles.greetingExt, { color: colors.primary }]}>
          وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ
        </Text>
      </Animated.View>

      {/* App name */}
      <Animated.View
        style={[
          styles.appNameContainer,
          { opacity: subtitleFade },
        ]}
      >
        <View style={[styles.divider, { backgroundColor: colors.gold }]} />
        <Text style={[styles.appName, { color: colors.primary }]}>
          {t('appName')}
        </Text>
        <Text style={[styles.tagline, { color: colors.gold }]}>
          {t('tagline')}
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.gold }]} />
      </Animated.View>

      {/* Progress bar */}
      <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
        <Animated.View
          style={[
            styles.progressBar,
            { backgroundColor: colors.gold, width: progressWidth },
          ]}
        />
      </View>

      <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
        {t('loading')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moonContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  moon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
  },
  moonShadow: {
    width: 50,
    height: 55,
    borderRadius: 28,
    position: 'absolute',
    right: -5,
    top: -2,
  },
  greetingContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  greetingArabic: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 8,
  },
  greetingExt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
  },
  appNameContainer: {
    alignItems: 'center',
  },
  divider: {
    width: 80,
    height: 2,
    marginVertical: 12,
    opacity: 0.6,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  progressContainer: {
    width: 200,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 60,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    marginTop: 12,
    letterSpacing: 1,
  },
  star: {
    position: 'absolute',
  },
  star1: { top: height * 0.12, right: width * 0.2 },
  star2: { top: height * 0.2, left: width * 0.15 },
  star3: { top: height * 0.08, left: width * 0.3 },
  starText: {
    fontSize: 24,
    color: '#C9A84C',
  },
  starTextSmall: {
    fontSize: 18,
  },
});
