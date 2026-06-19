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
import { IslamicDivider } from '../components/IslamicPattern';
import { ArabicText, TransliterationText, TranslationText } from '../components/ArabicText';
import { duas, Dua, DuaCategory, duaCategories, getDuasByCategory } from '../data/duas';
import { storage } from '../services/storage';

interface DuasScreenProps {
  navigation: any;
}

export function DuasScreen({ navigation }: DuasScreenProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.screenTitle, { color: colors.primary }]}>{t('duas')}</Text>
        <IslamicDivider color={colors.gold} />
        
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {t('duaCategories')}
        </Text>

        <View style={styles.categoriesGrid}>
          {duaCategories.map(cat => (
            <TouchableOpacity
              key={cat.key}
              style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate('DuaCategory', { category: cat.key })}
              activeOpacity={0.7}
            >
              <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                <Text style={styles.categoryIconText}>{cat.icon}</Text>
              </View>
              <Text style={[styles.categoryName, { color: colors.text }]}>
                {t((cat.titleKey === 'morningDuas' ? 'morningDuas' : cat.titleKey === 'eveningDuas' ? 'eveningDuas' : cat.titleKey) as any)}
              </Text>
              <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
                {getDuasByCategory(cat.key).length} du'a
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function DuaCategoryScreen({ route, navigation }: any) {
  const { category } = route.params;
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<string[]>([]);

  const categoryDuas = getDuasByCategory(category as DuaCategory);
  const catInfo = duaCategories.find(c => c.key === category);

  useEffect(() => {
    storage.getFavoriteDuas().then(setFavorites);
  }, []);

  const toggleFavorite = async (duaId: string) => {
    const isFav = await storage.toggleFavoriteDua(duaId);
    if (isFav) {
      setFavorites(prev => [...prev, duaId]);
    } else {
      setFavorites(prev => prev.filter(id => id !== duaId));
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backBtn, { color: colors.primary }]}>‹ {t('previous')}</Text>
        </TouchableOpacity>
        <Text style={[styles.detailTitle, { color: colors.text }]}>
          {catInfo?.icon} {t((catInfo?.titleKey || 'dailyDuas') as any)}
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {categoryDuas.map(dua => (
          <GlassmorphicCard key={dua.id} style={styles.duaCard}>
            <View style={styles.duaHeader}>
              <Text style={[styles.duaTitle, { color: colors.primary }]}>
                {dua.titleArabic}
              </Text>
              <TouchableOpacity onPress={() => toggleFavorite(dua.id)}>
                <Text style={{ fontSize: 20 }}>
                  {favorites.includes(dua.id) ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.duaTitleTrans, { color: colors.text }]}>
              {dua.title}
            </Text>

            <IslamicDivider color={colors.gold} />

            <ArabicText text={dua.arabicText} size="medium" color={colors.text} />

            <TransliterationText text={dua.transliteration} color={colors.textSecondary} />

            <View style={[styles.translationBox, { backgroundColor: colors.background }]}>
              <Text style={[styles.translationLabel, { color: colors.primary }]}>Uzbek</Text>
              <Text style={[styles.translationText, { color: colors.text }]}>
                {dua.translationUzbek}
              </Text>
              <View style={[styles.transDivider, { backgroundColor: colors.divider }]} />
              <Text style={[styles.translationLabel, { color: colors.primary }]}>English</Text>
              <Text style={[styles.translationText, { color: colors.textSecondary }]}>
                {dua.translation}
              </Text>
            </View>

            <Text style={[styles.reference, { color: colors.textSecondary }]}>
              📖 {dua.reference}
            </Text>
          </GlassmorphicCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  description: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%', // approx 2 columns
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconText: { fontSize: 22 },
  categoryName: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  categoryCount: { fontSize: 11 },

  // Detail
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: { fontSize: 16, fontWeight: '500' },
  detailTitle: { fontSize: 16, fontWeight: '600' },
  duaCard: { marginBottom: 14 },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  duaTitle: { fontSize: 18, fontWeight: '600' },
  duaTitleTrans: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  translationBox: {
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  translationLabel: { fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  translationText: { fontSize: 14, lineHeight: 22 },
  transDivider: { height: 1, marginVertical: 8 },
  reference: { fontSize: 12, marginTop: 10, textAlign: 'right' },
});
