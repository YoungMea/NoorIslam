import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { ArabicText, Bismillah, TransliterationText, TranslationText } from '../components/ArabicText';
import { prayerGuides, commonMovements, PrayerType, PrayerMovement } from '../data/namozSteps';

const { width } = Dimensions.get('window');

interface NamozGuideScreenProps {
  navigation: any;
}

const prayerTypes: { type: PrayerType; icon: string }[] = [
  { type: 'fajr', icon: '🌅' },
  { type: 'dhuhr', icon: '☀️' },
  { type: 'asr', icon: '🌤️' },
  { type: 'maghrib', icon: '🌇' },
  { type: 'isha', icon: '🌙' },
  { type: 'witr', icon: '⭐' },
];

export function NamozGuideScreen({ navigation }: NamozGuideScreenProps) {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  const renderPrayerCard = (guide: typeof prayerGuides[0], index: number) => {
    const prayerInfo = prayerTypes.find(p => p.type === guide.type)!;
    
    return (
      <TouchableOpacity
        key={guide.type}
        style={[
          styles.prayerCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() => navigation.navigate('NamozDetail', { prayerType: guide.type })}
        activeOpacity={0.7}
      >
        <View style={styles.prayerCardContent}>
          <Text style={styles.prayerIcon}>{prayerInfo.icon}</Text>
          <View style={styles.prayerInfo}>
            <Text style={[styles.prayerName, { color: colors.text }]}>
              {t(guide.type === 'fajr' ? 'bomdod' : guide.type === 'dhuhr' ? 'peshin' : guide.type === 'asr' ? 'asr' : guide.type === 'maghrib' ? 'shom' : guide.type === 'isha' ? 'xufton' : 'vitr')}
            </Text>
            <Text style={[styles.prayerNameArabic, { color: colors.primary }]}>
              {guide.nameArabic}
            </Text>
            <Text style={[styles.prayerRakats, { color: colors.textSecondary }]}>
              {guide.rakats} rakats
            </Text>
          </View>
          <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.screenTitle, { color: colors.primary }]}>{t('namozGuide')}</Text>
        <IslamicDivider color={colors.gold} />
        
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Step-by-step prayer guide with Arabic text, transliteration, and translation
        </Text>

        {prayerGuides.map((guide, index) => renderPrayerCard(guide, index))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function NamozDetailScreen({ route, navigation }: any) {
  const { prayerType } = route.params;
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const guide = prayerGuides.find(g => g.type === prayerType);
  if (!guide) return null;

  const steps = guide.steps;
  const currentMovement = steps[currentStep];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        slideAnim.setValue(1);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backBtnText, { color: colors.text }]}>‹ {t('previous')}</Text>
        </TouchableOpacity>
        <Text style={[styles.stepCounter, { color: colors.textSecondary }]}>
          {currentStep + 1} / {steps.length}
        </Text>
      </View>

      <Animated.View
        style={[
          styles.stepContainer,
          {
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            }],
            opacity: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stepContent}>
          <GlassmorphicCard>
            <View style={styles.stepHeader}>
              <IslamicStar size={16} color={colors.gold} opacity={0.4} />
              <Text style={[styles.stepTitle, { color: colors.text }]}>
                {currentMovement.name}
              </Text>
              <IslamicStar size={16} color={colors.gold} opacity={0.4} />
            </View>

            <Text style={[styles.stepNameArabic, { color: colors.primary }]}>
              {currentMovement.nameArabic}
            </Text>

            <IslamicDivider color={colors.gold} />

            {currentMovement.arabicText && (
              <View style={styles.arabicContainer}>
                <ArabicText text={currentMovement.arabicText} size="medium" color={colors.text} />
              </View>
            )}

            {currentMovement.transliteration && (
              <TransliterationText text={currentMovement.transliteration} color={colors.textSecondary} />
            )}

            {currentMovement.translation && (
              <TranslationText text={currentMovement.translation} color={colors.textSecondary} />
            )}

            <View style={[styles.descriptionBox, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '20' }]}>
              <Text style={[styles.descriptionText, { color: colors.text }]}>
                {currentMovement.descriptionUzbek}
              </Text>
              <Text style={[styles.descriptionText, { color: colors.textSecondary, marginTop: 4 }]}>
                {currentMovement.description}
              </Text>
            </View>
          </GlassmorphicCard>
        </ScrollView>
      </Animated.View>

      {/* Navigation buttons */}
      <View style={styles.stepNav}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={[styles.navBtn, styles.prevBtn, { borderColor: colors.border }]}
            onPress={goPrev}
          >
            <Text style={[styles.navBtnText, { color: colors.text }]}>‹ {t('previous')}</Text>
          </TouchableOpacity>
        )}
        {currentStep < steps.length - 1 ? (
          <TouchableOpacity
            style={[styles.navBtn, styles.nextBtn, { backgroundColor: colors.primary }]}
            onPress={goNext}
          >
            <Text style={[styles.navBtnText, { color: colors.white }]}>{t('next')} ›</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navBtn, styles.nextBtn, { backgroundColor: colors.accent }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.navBtnText, { color: colors.white }]}>{t('complete')} ✓</Text>
          </TouchableOpacity>
        )}
      </View>
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
  description: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  prayerCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  prayerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerIcon: { fontSize: 28, marginRight: 14 },
  prayerInfo: { flex: 1 },
  prayerName: { fontSize: 16, fontWeight: '600' },
  prayerNameArabic: { fontSize: 13, marginTop: 2 },
  prayerRakats: { fontSize: 12, marginTop: 2 },
  arrow: { fontSize: 24, fontWeight: '300' },
  
  // Detail screen
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  backBtnText: { fontSize: 16, fontWeight: '500' },
  stepCounter: { fontSize: 14 },
  stepContainer: { flex: 1 },
  stepContent: { padding: 16, paddingBottom: 100 },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  stepTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  stepNameArabic: { fontSize: 14, textAlign: 'center', marginBottom: 8, opacity: 0.7 },
  arabicContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  descriptionBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginTop: 16,
  },
  descriptionText: { fontSize: 14, lineHeight: 22 },
  stepNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  navBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  prevBtn: { borderWidth: 1 },
  nextBtn: {},
  navBtnText: { fontSize: 16, fontWeight: '600' },
});
