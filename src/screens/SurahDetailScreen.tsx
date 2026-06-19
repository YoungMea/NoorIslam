import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { ArabicText, Bismillah } from '../components/ArabicText';
import { surahs, getSurahById } from '../data/surahs';
import { api } from '../services/api';
import { storage } from '../services/storage';

const { width } = Dimensions.get('window');

interface SurahDetailScreenProps {
  route: any;
  navigation: any;
}

interface VerseDisplay {
  arabicText: string;
  uzbekTranslation: string;
  englishTranslation: string;
  number: number;
}

export function SurahDetailScreen({ route, navigation }: SurahDetailScreenProps) {
  const { surahId } = route.params;
  const initialVerse = route.params?.verseNumber || 1;
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();
  const scrollRef = useRef<ScrollView>(null);
  const [verses, setVerses] = useState<VerseDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const surah = getSurahById(surahId)!;
  const surahName = language === 'en' ? surah.nameEnglish : surah.nameUzbek;

  useEffect(() => {
    loadSurah();
    checkBookmark();
  }, [surahId]);

  const loadSurah = async () => {
    setLoading(true);
    try {
      const data = await api.getSurahWithTranslations(surahId);
      if (data?.arabic?.ayahs && data?.uzbek?.ayahs && data?.english?.ayahs) {
        const combined: VerseDisplay[] = data.arabic.ayahs.map((ayah, idx) => ({
          arabicText: ayah.text,
          uzbekTranslation: data.uzbek!.ayahs[idx]?.text || '',
          englishTranslation: data.english!.ayahs[idx]?.text || '',
          number: ayah.numberInSurah,
        }));
        setVerses(combined);
      }
    } catch (error) {
      // Fallback to showing at least the surah name
      console.error('Failed to load surah:', error);
    }
    setLoading(false);
  };

  const checkBookmark = async () => {
    const bookmarked = await storage.isBookmarked(surahId, initialVerse);
    setIsBookmarked(bookmarked);
  };

  const handleBookmark = async () => {
    if (isBookmarked) {
      await storage.removeBookmark(surahId, initialVerse);
      setIsBookmarked(false);
    } else {
      await storage.addBookmark({
        surahId,
        verseNumber: initialVerse,
        surahName: surah.nameArabic,
      });
      setIsBookmarked(true);
    }
  };

  const handleProgress = async (verseNum: number) => {
    await storage.saveReadingProgress({ surahId, verseNumber: verseNum });
  };

  // Generate placeholder verses if API fails
  const displayVerses = verses.length > 0 ? verses : 
    Array.from({ length: Math.min(surah.versesCount, 10) }, (_, i) => ({
      arabicText: '',
      uzbekTranslation: `Oyat ${i + 1}`,
      englishTranslation: `Verse ${i + 1}`,
      number: i + 1,
    }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Text style={[styles.headerBtnText, { color: colors.text }]}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.surahNameArabic, { color: colors.primary }]}>
            {surah.nameArabic}
          </Text>
          <Text style={[styles.surahName, { color: colors.textSecondary }]}>
            {surahName}
          </Text>
        </View>
        <TouchableOpacity onPress={handleBookmark} style={styles.headerBtn}>
          <Text style={{ fontSize: 22 }}>{isBookmarked ? '🔖' : '🏷️'}</Text>
        </TouchableOpacity>
      </View>

      <IslamicDivider color={colors.gold} />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.versesContent}
      >
        {/* Bismillah */}
        <View style={styles.bismillahContainer}>
          <Text style={[styles.bismillah, { color: colors.primary }]}>
            ﷽
          </Text>
        </View>

        {/* Verses */}
        {displayVerses.map((verse, index) => (
          <TouchableOpacity
            key={verse.number}
            style={[
              styles.verseBlock,
              { borderBottomColor: colors.divider },
            ]}
            onLongPress={() => handleBookmark()}
            onPress={() => handleProgress(verse.number)}
          >
            {/* Verse number */}
            <View style={[styles.verseNumber, { backgroundColor: colors.gold + '15' }]}>
              <IslamicStar size={10} color={colors.gold} opacity={0.3} />
              <Text style={[styles.verseNumberText, { color: colors.gold }]}>
                {String(verse.number).padStart(3, '0')}
              </Text>
            </View>

            {/* Arabic text */}
            {verse.arabicText ? (
              <ArabicText
                text={verse.arabicText}
                size="large"
                color={colors.text}
                align="right"
              />
            ) : (
              <View style={styles.placeholderText}>
                <Text style={[styles.placeholderTextContent, { color: colors.textSecondary }]}>
                  {t('loading')}
                </Text>
              </View>
            )}

            {/* Translation */}
            {language === 'uz' || language === 'uz_cyrillic' ? (
              <Text style={[styles.translation, { color: colors.textSecondary }]}>
                {verse.uzbekTranslation}
              </Text>
            ) : (
              <Text style={[styles.translation, { color: colors.textSecondary }]}>
                {verse.englishTranslation}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerBtn: { padding: 6 },
  headerBtnText: { fontSize: 16, fontWeight: '500' },
  headerCenter: { flex: 1, alignItems: 'center' },
  surahNameArabic: { fontSize: 22, fontWeight: '600' },
  surahName: { fontSize: 13, marginTop: 2 },
  versesContent: { padding: 16, paddingBottom: 60 },
  bismillahContainer: { alignItems: 'center', marginVertical: 20 },
  bismillah: { fontSize: 42, lineHeight: 60 },
  verseBlock: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  verseNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  verseNumberText: { fontSize: 12, fontWeight: '600' },
  translation: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'right',
    marginTop: 8,
    fontStyle: 'italic',
  },
  placeholderText: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  placeholderTextContent: { fontSize: 14 },
});
