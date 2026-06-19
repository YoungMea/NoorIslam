import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { hadithApi } from '../services/api';

export function DailyHadithScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [hadith, setHadith] = useState<{ text: string; narrator: string; reference: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const loadHadith = async () => {
    setLoading(true);
    const data = await hadithApi.getDailyHadith();
    if (data) {
      setHadith(data);
    } else {
      setHadith(hadithApi.getFallbackHadith());
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHadith();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('hadithOfTheDay')}</Text>
        <IslamicDivider color={colors.gold} />

        {hadith && (
          <GlassmorphicCard>
            <View style={styles.hadithHeader}>
              <IslamicStar size={16} color={colors.gold} opacity={0.4} />
              <Text style={[styles.hadithLabel, { color: colors.primary }]}>Hadith</Text>
              <IslamicStar size={16} color={colors.gold} opacity={0.4} />
            </View>

            <IslamicDivider color={colors.gold} />

            <Text style={[styles.hadithText, { color: colors.text }]}>
              {hadith.text}
            </Text>

            <View style={[styles.hadithFooter, { borderTopColor: colors.divider }]}>
              <Text style={[styles.narrator, { color: colors.primary }]}>
                — {hadith.narrator}
              </Text>
              <Text style={[styles.reference, { color: colors.textSecondary }]}>
                {hadith.reference}
              </Text>
            </View>
          </GlassmorphicCard>
        )}

        <TouchableOpacity
          style={[styles.refreshBtn, { backgroundColor: colors.primary }]}
          onPress={loadHadith}
        >
          <Text style={[styles.refreshBtnText, { color: colors.white }]}>
            New Hadith
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  hadithHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  hadithLabel: { fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  hadithText: { fontSize: 16, lineHeight: 28, textAlign: 'center', paddingVertical: 16 },
  hadithFooter: {
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 12,
    alignItems: 'center',
  },
  narrator: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  reference: { fontSize: 12, fontStyle: 'italic' },
  refreshBtn: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshBtnText: { fontSize: 16, fontWeight: '600' },
});
