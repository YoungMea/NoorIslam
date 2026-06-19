import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { surahs, Surah, getSurahsByJuz } from '../data/surahs';
import { api } from '../services/api';
import { storage } from '../services/storage';

interface QuranScreenProps {
  navigation: any;
}

export function QuranScreen({ navigation }: QuranScreenProps) {
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz' | 'bookmarks'>('surahs');
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarks, setBookmarks] = useState<{ surahId: number; verseNumber: number; surahName: string }[]>([]);
  const [lastRead, setLastRead] = useState<{ surahId: number; verseNumber: number } | null>(null);

  const loadData = useCallback(async () => {
    setBookmarks(await storage.getBookmarks());
    setLastRead(await storage.getReadingProgress());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const tabs = [
    { key: 'surahs', label: t('surahList') },
    { key: 'juz', label: t('juzList') },
    { key: 'bookmarks', label: t('bookmarks') },
  ] as const;

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={[styles.surahItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => navigation.navigate('SurahDetail', { surahId: item.id, surah: item })}
      activeOpacity={0.7}
    >
      <View style={[styles.surahNumber, { backgroundColor: colors.primary + '15' }]}>
        <Text style={[styles.surahNumberText, { color: colors.primary }]}>
          {String(item.id).padStart(3, '0')}
        </Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={[styles.surahName, { color: colors.text }]}>
          {language === 'en' ? item.nameEnglish : item.nameUzbek}
        </Text>
        <Text style={[styles.surahEnglish, { color: colors.textSecondary }]}>
          {item.nameEnglish}
        </Text>
        <Text style={[styles.surahVerses, { color: colors.textSecondary }]}>
          {item.versesCount} {t('verses')} · {item.revelationType}
        </Text>
      </View>
      <Text style={[styles.surahArabic, { color: colors.primary }]}>
        {item.nameArabic}
      </Text>
    </TouchableOpacity>
  );

  const renderJuzItem = (juzNum: number) => {
    const juzSurahs = getSurahsByJuz(juzNum);
    return (
      <TouchableOpacity
        key={juzNum}
        style={[styles.juzItem, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => navigation.navigate('JuzDetail', { juzNumber: juzNum })}
      >
        <View style={[styles.juzIcon, { backgroundColor: colors.gold + '20', borderColor: colors.gold + '40' }]}>
          <Text style={[styles.juzIconText, { color: colors.gold }]}>{juzNum}</Text>
        </View>
        <View style={styles.juzInfo}>
          <Text style={[styles.juzTitle, { color: colors.text }]}>
            {t('juz')} {juzNum}
          </Text>
          <Text style={[styles.juzSurahs, { color: colors.textSecondary }]}>
            {juzSurahs.length} {t('surahList')}
          </Text>
        </View>
        <Text style={[styles.juzArrow, { color: colors.textSecondary }]}>›</Text>
      </TouchableOpacity>
    );
  };

  const renderBookmarkItem = (bookmark: typeof bookmarks[0], index: number) => {
    const surah = surahs.find(s => s.id === bookmark.surahId);
    return (
      <TouchableOpacity
        key={index}
        style={[styles.bookmarkItem, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => navigation.navigate('SurahDetail', { surahId: bookmark.surahId, verseNumber: bookmark.verseNumber })}
      >
        <View style={[styles.bookmarkIcon, { backgroundColor: colors.gold + '20' }]}>
          <Text style={styles.bookmarkIconText}>🔖</Text>
        </View>
        <View style={styles.bookmarkInfo}>
          <Text style={[styles.bookmarkSurah, { color: colors.text }]}>
            {surah?.nameArabic} - {surah?.nameUzbek || surah?.nameEnglish}
          </Text>
          <Text style={[styles.bookmarkVerse, { color: colors.textSecondary }]}>
            {t('verses')} {bookmark.verseNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'surahs':
        return (
          <FlatList
            data={surahs}
            renderItem={renderSurahItem}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
            }
            ListHeaderComponent={
              lastRead ? (
                <TouchableOpacity
                  style={[styles.continueCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '20' }]}
                  onPress={() => navigation.navigate('SurahDetail', { surahId: lastRead.surahId, verseNumber: lastRead.verseNumber })}
                >
                  <Text style={[styles.continueIcon]}>📖</Text>
                  <View>
                    <Text style={[styles.continueTitle, { color: colors.primary }]}>
                      {t('continueReading')}
                    </Text>
                    <Text style={[styles.continueInfo, { color: colors.textSecondary }]}>
                      {surahs.find(s => s.id === lastRead.surahId)?.nameArabic} - {t('verses')} {lastRead.verseNumber}
                    </Text>
                  </View>
                  <Text style={[styles.continueArrow, { color: colors.primary }]}>›</Text>
                </TouchableOpacity>
              ) : null
            }
          />
        );
      case 'juz':
        return (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map(renderJuzItem)}
          </ScrollView>
        );
      case 'bookmarks':
        return (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
            {bookmarks.length > 0 ? (
              bookmarks.map((b, i) => renderBookmarkItem(b, i))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔖</Text>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{t('noBookmarks')}</Text>
              </View>
            )}
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>Qur'oni Karim</Text>
        <IslamicDivider color={colors.gold} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab.key ? colors.primary : colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 14, fontWeight: '600' },
  listContent: { padding: 16, paddingBottom: 40 },
  
  // Surah item
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  surahNumberText: { fontSize: 13, fontWeight: '700' },
  surahInfo: { flex: 1 },
  surahName: { fontSize: 15, fontWeight: '600' },
  surahEnglish: { fontSize: 12, marginTop: 1 },
  surahVerses: { fontSize: 11, marginTop: 2 },
  surahArabic: { fontSize: 18, fontWeight: '500' },

  // Juz item
  juzItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  juzIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  juzIconText: { fontSize: 18, fontWeight: '700' },
  juzInfo: { flex: 1 },
  juzTitle: { fontSize: 16, fontWeight: '600' },
  juzSurahs: { fontSize: 12, marginTop: 2 },
  juzArrow: { fontSize: 24, fontWeight: '300' },

  // Bookmark
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  bookmarkIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookmarkIconText: { fontSize: 18 },
  bookmarkInfo: { flex: 1 },
  bookmarkSurah: { fontSize: 14, fontWeight: '600' },
  bookmarkVerse: { fontSize: 12, marginTop: 2 },

  // Continue reading
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
  },
  continueIcon: { fontSize: 24, marginRight: 12 },
  continueTitle: { fontSize: 15, fontWeight: '600' },
  continueInfo: { fontSize: 12, marginTop: 2 },
  continueArrow: { fontSize: 24, marginLeft: 'auto' },

  // Empty state
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '500' },
});
