import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../i18n';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider } from '../components/IslamicPattern';

export function SettingsScreen() {
  const { colors, isDark, toggleTheme, mode } = useTheme();
  const { t, language, setLang } = useLanguage();

  const languages: { key: Language; label: string; flag: string }[] = [
    { key: 'uz', label: t('languageUzbek'), flag: '🇺🇿' },
    { key: 'uz_cyrillic', label: t('languageUzbekCyrillic'), flag: '🇺🇿' },
    { key: 'en', label: t('languageEnglish'), flag: '🇬🇧' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.screenTitle, { color: colors.primary }]}>{t('settings')}</Text>
        <IslamicDivider color={colors.gold} />

        {/* Language Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('language')}</Text>
        <GlassmorphicCard style={styles.sectionCard}>
          {languages.map((lang, index) => (
            <TouchableOpacity
              key={lang.key}
              style={[
                styles.langOption,
                index < languages.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.divider },
              ]}
              onPress={() => setLang(lang.key)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.langLabel, { color: colors.text }]}>{lang.label}</Text>
              {language === lang.key && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </GlassmorphicCard>

        {/* Theme Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('theme')}</Text>
        <GlassmorphicCard style={styles.sectionCard}>
          <View style={styles.themeRow}>
            <View style={styles.themeInfo}>
              <Text style={[styles.themeIcon]}>{isDark ? '🌙' : '☀️'}</Text>
              <View>
                <Text style={[styles.themeLabel, { color: colors.text }]}>
                  {isDark ? t('darkMode') : t('lightMode')}
                </Text>
                <Text style={[styles.themeDesc, { color: colors.textSecondary }]}>
                  {isDark ? 'Dark theme for night reading' : 'Light theme for daytime'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDark ? colors.gold : '#f4f3f4'}
            />
          </View>
        </GlassmorphicCard>

        {/* About Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <GlassmorphicCard style={styles.sectionCard}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>{t('appName')}</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>v1.0.0</Text>
          </View>
          <View style={[styles.aboutRow, { marginTop: 8 }]}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Platform</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              {Platform.OS === 'ios' ? 'iOS' : 'Android'}
            </Text>
          </View>
        </GlassmorphicCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 4,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  flag: {
    fontSize: 22,
    marginRight: 12,
  },
  langLabel: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  themeLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  themeDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  aboutLabel: {
    fontSize: 14,
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});
