import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { AnimatedCard } from '../components/AnimatedCard';
import { IslamicCorner } from '../components/IslamicPattern';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface DashboardScreenProps {
  navigation: any;
}

const menuItems = [
  { key: 'namozGuide', titleKey: 'namozGuide', icon: '🕌', color: '#1B6B4B', subtitle: '5 waqt namoz' },
  { key: 'quran', titleKey: 'quran', icon: '📖', color: '#C9A84C', subtitle: '114 sura' },
  { key: 'duas', titleKey: 'duas', icon: '🤲', color: '#10B981', subtitle: '8 category' },
  { key: 'lectures', titleKey: 'lectures', icon: '🎙️', color: '#2563EB', subtitle: 'Ma\'ruzalar' },
  { key: 'qibla', titleKey: 'qibla', icon: '🧭', color: '#8B5CF6', subtitle: 'Qiblani toping' },
  { key: 'settings', titleKey: 'settings', icon: '⚙️', color: '#6B7280', subtitle: 'Sozlamalar' },
];

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  const handleNavigate = (key: string) => {
    const routeMap: Record<string, string> = {
      namozGuide: 'NamozGuide',
      quran: 'Quran',
      duas: 'Duas',
      lectures: 'Lectures',
      qibla: 'Qibla',
      settings: 'Settings',
    };
    const route = routeMap[key];
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <IslamicCorner size={24} position="top-left" color={colors.gold} />
          <View style={styles.headerCenter}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Assalamu Alaikum
            </Text>
            <Text style={[styles.title, { color: colors.primary }]}>
              {t('appName')}
            </Text>
            <View style={[styles.headerDivider, { backgroundColor: colors.gold }]} />
          </View>
          <IslamicCorner size={24} position="top-right" color={colors.gold} />
        </View>

        {/* Date */}
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {/* Dashboard Grid */}
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <AnimatedCard
              key={item.key}
              title={t(item.titleKey as any)}
              icon={item.icon}
              color={item.color}
              subtitle={item.subtitle}
              index={index}
              onPress={() => handleNavigate(item.key)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate('Tasbih')}>
            <Text style={[styles.quickTitle, { color: colors.text }]}>Tasbih</Text>
            <Text style={[styles.quickValue, { color: colors.primary }]}>📿</Text>
            <Text style={[styles.quickHint, { color: colors.textSecondary }]}>Counter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate('Hadith')}>
            <Text style={[styles.quickTitle, { color: colors.text }]}>Hadith</Text>
            <Text style={[styles.quickValue, { color: colors.gold }]}>📜</Text>
            <Text style={[styles.quickHint, { color: colors.textSecondary }]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate('Settings')}>
            <Text style={[styles.quickTitle, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.quickValue, { color: colors.accent }]}>⚙️</Text>
            <Text style={[styles.quickHint, { color: colors.textSecondary }]}>Preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerDivider: {
    width: 60,
    height: 2,
    marginTop: 8,
    opacity: 0.5,
  },
  date: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  quickCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  quickValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  quickHint: {
    fontSize: 16,
    marginTop: 4,
  },
});
