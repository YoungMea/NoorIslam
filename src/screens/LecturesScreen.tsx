import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider } from '../components/IslamicPattern';
import { lectures, lectureCategories, getLectureById } from '../data/lectures';

interface LecturesScreenProps {
  navigation: any;
}

export function LecturesScreen({ navigation }: LecturesScreenProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'audio'>('all');

  const filteredLectures = lectures.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.scholar.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeFilter === 'all' || l.type === activeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('lectures')}</Text>
        <IslamicDivider color={colors.gold} />
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['all', 'video', 'audio'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterBtn,
              activeFilter === filter && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === filter ? colors.white : colors.textSecondary },
              ]}
            >
              {filter === 'all' ? t('categories') : filter === 'video' ? t('videoLectures') : t('audioLectures')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredLectures.map(lecture => (
          <TouchableOpacity
            key={lecture.id}
            style={[styles.lectureCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('LectureDetail', { lectureId: lecture.id })}
          >
            <View style={styles.lectureThumb}>
              <View style={[styles.lectureIcon, { backgroundColor: lecture.type === 'video' ? '#3B82F6' : '#10B981' }]}>
                <Text style={styles.lectureIconText}>{lecture.type === 'video' ? '▶️' : '🎵'}</Text>
              </View>
              <View style={[styles.lectureBadge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.lectureBadgeText, { color: colors.white }]}>
                  {lecture.type === 'video' ? 'HD' : '🎧'}
                </Text>
              </View>
            </View>
            <View style={styles.lectureInfo}>
              <Text style={[styles.lectureTitle, { color: colors.text }]} numberOfLines={2}>
                {lecture.titleUzbek}
              </Text>
              <Text style={[styles.lectureScholar, { color: colors.primary }]}>
                {lecture.scholar}
              </Text>
              <View style={styles.lectureMeta}>
                <Text style={[styles.lectureMetaText, { color: colors.textSecondary }]}>
                  {lecture.duration} · {lecture.category}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function LectureDetailScreen({ route, navigation }: any) {
  const { lectureId } = route.params;
  const { colors } = useTheme();
  const { t } = useLanguage();
  const lecture = getLectureById(lectureId);

  if (!lecture) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backBtn, { color: colors.primary }]}>‹ {t('previous')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <GlassmorphicCard>
          <View style={styles.playerPlaceholder}>
            <View style={[styles.playerIcon, { backgroundColor: colors.primary + '20' }]}>
              <Text style={styles.playerIconText}>{lecture.type === 'video' ? '▶️' : '🎵'}</Text>
            </View>
            <Text style={[styles.playerLabel, { color: colors.textSecondary }]}>
              {t(lecture.type === 'video' ? 'videoLectures' : 'audioLectures')}
            </Text>
          </View>

          <IslamicDivider color={colors.gold} />

          <Text style={[styles.detailTitle, { color: colors.text }]}>
            {lecture.titleUzbek}
          </Text>
          <Text style={[styles.detailTitleEn, { color: colors.textSecondary }]}>
            {lecture.title}
          </Text>

          <View style={[styles.scholarBadge, { backgroundColor: colors.primary + '15' }]}>
            <Text style={[styles.scholarLabel, { color: colors.textSecondary }]}>Speaker:</Text>
            <Text style={[styles.scholarName, { color: colors.primary }]}>{lecture.scholar}</Text>
          </View>

          <Text style={[styles.detailDesc, { color: colors.textSecondary }]}>
            {lecture.descriptionUzbek}
          </Text>
          <Text style={[styles.detailDesc, { color: colors.textLight, marginTop: 4 }]}>
            {lecture.description}
          </Text>

          <View style={[styles.metaRow, { borderTopColor: colors.divider }]}>
            <Text style={[styles.metaKey, { color: colors.textSecondary }]}>Duration</Text>
            <Text style={[styles.metaValue, { color: colors.text }]}>{lecture.duration}</Text>
          </View>
          <View style={[styles.metaRow, { borderTopColor: colors.divider }]}>
            <Text style={[styles.metaKey, { color: colors.textSecondary }]}>Category</Text>
            <Text style={[styles.metaValue, { color: colors.text }]}>{lecture.category}</Text>
          </View>
        </GlassmorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14 },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: { fontSize: 13, fontWeight: '500' },
  content: { padding: 16, paddingBottom: 40 },
  lectureCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },
  lectureThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  lectureIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureIconText: { fontSize: 24 },
  lectureBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  lectureBadgeText: { fontSize: 8, fontWeight: '700' },
  lectureInfo: { flex: 1 },
  lectureTitle: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  lectureScholar: { fontSize: 12, fontWeight: '500', marginTop: 3 },
  lectureMeta: { flexDirection: 'row', marginTop: 4 },
  lectureMetaText: { fontSize: 11 },

  // Detail
  detailHeader: { paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { fontSize: 16, fontWeight: '500' },
  playerPlaceholder: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  playerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerIconText: { fontSize: 32 },
  playerLabel: { fontSize: 13, fontWeight: '500' },
  detailTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  detailTitleEn: { fontSize: 14, textAlign: 'center', marginBottom: 12 },
  scholarBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  scholarLabel: { fontSize: 12 },
  scholarName: { fontSize: 14, fontWeight: '600' },
  detailDesc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    marginTop: 8,
  },
  metaKey: { fontSize: 13 },
  metaValue: { fontSize: 13, fontWeight: '500' },
});
