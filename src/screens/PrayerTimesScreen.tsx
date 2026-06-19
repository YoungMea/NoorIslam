import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider } from '../components/IslamicPattern';
import { prayerApi } from '../services/api';
import { getCurrentLocation } from '../services/qibla';

interface PrayerTimeData {
  [key: string]: string;
}

const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const prayerKeys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function PrayerTimesScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData | null>(null);
  const [location, setLocation] = useState<string>('Loading...');
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const loadPrayerTimes = useCallback(async () => {
    try {
      const loc = await getCurrentLocation();
      if (loc && 'coords' in loc) {
        const { latitude, longitude } = loc.coords;
        const data = await prayerApi.getPrayerTimes(latitude, longitude);
        if (data?.timings) {
          setPrayerTimes(data.timings);
          setLocation(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);

          // Find next prayer
          const now = new Date();
          const currentMinutes = now.getHours() * 60 + now.getMinutes();
          const prayerTimesList = prayerKeys.map(key => {
            const [h, m] = (data.timings[key] || '00:00').split(':').map(Number);
            return { name: key, minutes: h * 60 + m };
          });
          
          const upcoming = prayerTimesList.find(p => p.minutes > currentMinutes);
          if (upcoming) {
            setNextPrayer(`${upcoming.name} - ${data.timings[upcoming.name]}`);
          } else {
            setNextPrayer(`${prayerKeys[0]} (tomorrow) - ${data.timings[prayerKeys[0]]}`);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load prayer times:', error);
    }
  }, []);

  useEffect(() => {
    loadPrayerTimes();
  }, [loadPrayerTimes]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrayerTimes();
    setRefreshing(false);
  };

  const getPrayerIcon = (name: string) => {
    const icons: Record<string, string> = {
      Fajr: '🌅',
      Sunrise: '☀️',
      Dhuhr: '🌤️',
      Asr: '🌇',
      Maghrib: '🌆',
      Isha: '🌙',
    };
    return icons[name] || '⏰';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <Text style={[styles.title, { color: colors.primary }]}>{t('prayerTimes')}</Text>
        <IslamicDivider color={colors.gold} />

        {/* Next prayer banner */}
        {nextPrayer ? (
          <View style={[styles.nextPrayerBanner, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '25' }]}>
            <Text style={[styles.nextPrayerLabel, { color: colors.textSecondary }]}>
              {t('nextPrayer')}
            </Text>
            <Text style={[styles.nextPrayerValue, { color: colors.primary }]}>
              {nextPrayer}
            </Text>
          </View>
        ) : null}

        {/* Location */}
        <Text style={[styles.location, { color: colors.textSecondary }]}>
          📍 {location}
        </Text>

        {/* Prayer times */}
        <GlassmorphicCard>
          {prayerKeys.map((key, index) => {
            const time = prayerTimes?.[key] || '--:--';
            const isNext = nextPrayer.startsWith(key);
            return (
              <View
                key={key}
                style={[
                  styles.prayerRow,
                  index < prayerKeys.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.divider },
                  isNext && { backgroundColor: colors.primary + '08', borderRadius: 8 },
                ]}
              >
                <Text style={styles.prayerIcon}>{getPrayerIcon(key)}</Text>
                <View style={styles.prayerInfo}>
                  <Text style={[styles.prayerName, { color: colors.text }]}>
                    {t((key === 'Fajr' ? 'fajr' : key === 'Sunrise' ? 'sunrise' : key === 'Dhuhr' ? 'dhuhr' : key === 'Asr' ? 'asr_prayer' : key === 'Maghrib' ? 'maghrib' : 'isha') as any)}
                  </Text>
                </View>
                <Text style={[styles.prayerTime, { color: isNext ? colors.primary : colors.text }]}>
                  {time}
                </Text>
                {isNext && (
                  <View style={[styles.nextBadge, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.nextBadgeText, { color: colors.white }]}>Next</Text>
                  </View>
                )}
              </View>
            );
          })}
        </GlassmorphicCard>

        {/* Hijri date */}
        <Text style={[styles.hijriHint, { color: colors.textSecondary }]}>
          {t('hijriCalendar')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  nextPrayerBanner: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  nextPrayerLabel: { fontSize: 12, fontWeight: '500', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  nextPrayerValue: { fontSize: 16, fontWeight: '700' },
  location: { fontSize: 12, textAlign: 'center', marginBottom: 12 },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  prayerIcon: { fontSize: 20, marginRight: 12 },
  prayerInfo: { flex: 1 },
  prayerName: { fontSize: 15, fontWeight: '500' },
  prayerTime: { fontSize: 16, fontWeight: '700', marginRight: 8 },
  nextBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  nextBadgeText: { fontSize: 10, fontWeight: '700' },
  hijriHint: { fontSize: 13, textAlign: 'center', marginTop: 16 },
});
