import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { storage } from '../services/storage';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width * 0.65;

const dhikrOptions = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah', meaning: 'Glory be to Allah', default: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', meaning: 'Praise be to Allah', default: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar', meaning: 'Allah is the Greatest', default: 34 },
];

export function TasbihScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const [activeDhikr, setActiveDhikr] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    const saved = await storage.getTasbihCounts();
    setCounts(saved);
    const total = Object.values(saved).reduce((sum, c) => sum + c, 0);
    setTotalCount(total);
  };

  const handleCount = () => {
    const dhikr = dhikrOptions[activeDhikr];
    const newCount = (counts[dhikr.id] || 0) + 1;
    const newCounts = { ...counts, [dhikr.id]: newCount };
    setCounts(newCounts);
    setTotalCount(prev => prev + 1);
    storage.saveTasbihCounts(newCounts);

    // Animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Haptic feedback
    try {
      Vibration.vibrate(10);
    } catch {}
  };

  const handleReset = () => {
    const dhikr = dhikrOptions[activeDhikr];
    const newCounts = { ...counts, [dhikr.id]: 0 };
    setCounts(newCounts);
    storage.saveTasbihCounts(newCounts);
    setTotalCount(prev => {
      const dhikrCount = counts[dhikr.id] || 0;
      return prev - dhikrCount;
    });
  };

  const handleDhikrChange = (index: number) => {
    setActiveDhikr(index);
    Animated.spring(rotateAnim, {
      toValue: index,
      tension: 50,
      friction: 10,
      useNativeDriver: false,
    }).start();
  };

  const dhikr = dhikrOptions[activeDhikr];
  const currentCount = counts[dhikr.id] || 0;
  const targetCount = dhikr.default;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('tasbihCounter')}</Text>
        <IslamicDivider color={colors.gold} />
      </View>

      {/* Dhikr selector */}
      <View style={styles.dhikrSelector}>
        {dhikrOptions.map((d, i) => (
          <TouchableOpacity
            key={d.id}
            style={[
              styles.dhikrBtn,
              activeDhikr === i && { backgroundColor: colors.primary, borderColor: colors.primary },
              { borderColor: colors.border },
            ]}
            onPress={() => handleDhikrChange(i)}
          >
            <Text
              style={[
                styles.dhikrBtnText,
                { color: activeDhikr === i ? colors.white : colors.textSecondary },
              ]}
            >
              {d.latin.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main counter */}
      <View style={styles.counterContainer}>
        <Text style={[styles.dhikrArabic, { color: colors.primary }]}>
          {dhikr.arabic}
        </Text>
        <Text style={[styles.dhikrLatin, { color: colors.textSecondary }]}>
          {dhikr.latin}
        </Text>

        <Animated.View
          style={[
            styles.countButton,
            {
              backgroundColor: colors.primary + '10',
              borderColor: colors.primary + '30',
              transform: [{ scale: scaleAnim }],
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              borderRadius: BUTTON_SIZE / 2,
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleCount}
            activeOpacity={0.7}
            style={styles.countTouchable}
          >
            <Text style={[styles.countText, { color: colors.primary }]}>
              {currentCount}
            </Text>
            <Text style={[styles.targetText, { color: colors.textSecondary }]}>
              / {targetCount}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Progress rings */}
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                width: `${Math.min((currentCount / targetCount) * 100, 100)}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlBtn, { backgroundColor: colors.error + '15' }]}
          onPress={handleReset}
        >
          <Text style={[styles.controlBtnText, { color: colors.error }]}>
            {t('reset')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <GlassmorphicCard style={styles.statsCard}>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {t('total')}
          </Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {totalCount.toLocaleString()}
          </Text>
        </View>
        {dhikrOptions.map(d => (
          <View key={d.id} style={[styles.statRow, { borderTopWidth: 1, borderTopColor: colors.divider }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {d.latin}
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {(counts[d.id] || 0).toLocaleString()}
            </Text>
          </View>
        ))}
      </GlassmorphicCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  dhikrSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  dhikrBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  dhikrBtnText: { fontSize: 13, fontWeight: '600' },
  counterContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dhikrArabic: { fontSize: 24, fontWeight: '500', marginBottom: 6 },
  dhikrLatin: { fontSize: 14, fontStyle: 'italic', marginBottom: 24 },
  countButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 16,
  },
  countTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: { fontSize: 56, fontWeight: '700' },
  targetText: { fontSize: 16, marginTop: -4 },
  progressBar: {
    width: width * 0.6,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  controlBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  controlBtnText: { fontSize: 15, fontWeight: '600' },
  statsCard: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statLabel: { fontSize: 13 },
  statValue: { fontSize: 13, fontWeight: '600' },
});
