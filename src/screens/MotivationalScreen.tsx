import React, { useState } from 'react';
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
import { ArabicText } from '../components/ArabicText';
import { motivationalContent } from '../services/notifications';

const { width } = Dimensions.get('window');

type MoodType = 'good' | 'average' | 'bad';

interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}

export function MotivationalScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const moods: MoodOption[] = [
    { type: 'good', emoji: '😊', label: t('moodAlhamdulillah'), color: '#10B981' },
    { type: 'average', emoji: '😐', label: t('moodAverage'), color: '#F59E0B' },
    { type: 'bad', emoji: '😔', label: t('moodNotGood'), color: '#EF4444' },
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  const content = selectedMood ? motivationalContent[selectedMood] : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IslamicStar size={20} color={colors.gold} opacity={0.4} />
          <Text style={[styles.title, { color: colors.primary }]}>
            {t('howIsYourDay')}
          </Text>
          <IslamicStar size={20} color={colors.gold} opacity={0.4} />
        </View>

        <IslamicDivider color={colors.gold} />

        {/* Mood Selection */}
        {!selectedMood ? (
          <View style={styles.moodContainer}>
            <Text style={[styles.prompt, { color: colors.textSecondary }]}>
              How are you feeling today?
            </Text>
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.type}
                  style={[
                    styles.moodCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: mood.color + '30',
                    },
                  ]}
                  onPress={() => handleMoodSelect(mood.type)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[styles.moodLabel, { color: colors.text }]}>
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          /* Content based on mood */
          <View style={styles.contentContainer}>
            {/* Verse */}
            {content?.verses && content.verses.length > 0 && (
              <GlassmorphicCard style={styles.contentCard}>
                <Text style={[styles.sectionLabel, { color: colors.gold }]}>
                  Quran · القرآن
                </Text>
                <IslamicDivider color={colors.gold} />
                <ArabicText
                  text={content.verses[0].text}
                  size="medium"
                  color={colors.text}
                />
                <Text style={[styles.verseTranslation, { color: colors.textSecondary }]}>
                  {content.verses[0].translation}
                </Text>
              </GlassmorphicCard>
            )}

            {/* Messages */}
            {content?.messages && content.messages.length > 0 && (
              <GlassmorphicCard style={styles.contentCard}>
                <Text style={[styles.sectionLabel, { color: colors.primary }]}>
                  Reminder
                </Text>
                <IslamicDivider color={colors.gold} />
                {content.messages.map((msg, i) => (
                  <Text key={i} style={[styles.message, { color: colors.text }]}>
                    💭 {msg}
                  </Text>
                ))}
              </GlassmorphicCard>
            )}

            {/* Dua */}
            {content?.duas && content.duas.length > 0 && (
              <GlassmorphicCard style={styles.contentCard}>
                <Text style={[styles.sectionLabel, { color: colors.primary }]}>
                  Dua · دعاء
                </Text>
                <IslamicDivider color={colors.gold} />
                {content.duas.map((dua, i) => (
                  <ArabicText
                    key={i}
                    text={dua}
                    size="small"
                    color={colors.text}
                  />
                ))}
              </GlassmorphicCard>
            )}

            <TouchableOpacity
              style={[styles.resetBtn, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetBtnText, { color: colors.primary }]}>
                ← Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', flex: 1 },
  prompt: { fontSize: 15, textAlign: 'center', marginBottom: 20 },
  
  // Mood selection
  moodContainer: { marginTop: 10 },
  moodGrid: { gap: 12 },
  moodCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  moodEmoji: { fontSize: 36 },
  moodLabel: { fontSize: 16, fontWeight: '600', flex: 1 },
  
  // Content
  contentContainer: { gap: 14, marginTop: 8 },
  contentCard: { paddingVertical: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
  verseTranslation: { fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10, fontStyle: 'italic' },
  message: { fontSize: 15, lineHeight: 24, marginBottom: 6 },
  resetBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetBtnText: { fontSize: 15, fontWeight: '600' },
});
