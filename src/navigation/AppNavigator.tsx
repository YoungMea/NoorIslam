import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

// Screens
import { DashboardScreen } from '../screens/DashboardScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NamozGuideScreen, NamozDetailScreen } from '../screens/NamozGuideScreen';
import { QuranScreen } from '../screens/QuranScreen';
import { SurahDetailScreen } from '../screens/SurahDetailScreen';
import { DuasScreen, DuaCategoryScreen } from '../screens/DuasScreen';
import { LecturesScreen, LectureDetailScreen } from '../screens/LecturesScreen';
import { QiblaScreen } from '../screens/QiblaScreen';
import { TasbihScreen } from '../screens/TasbihScreen';
import { PrayerTimesScreen } from '../screens/PrayerTimesScreen';
import { DailyHadithScreen } from '../screens/DailyHadithScreen';
import { MotivationalScreen } from '../screens/MotivationalScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  NamozGuide: undefined;
  NamozDetail: { prayerType: string };
  Quran: undefined;
  SurahDetail: { surahId: number; verseNumber?: number };
  Duas: undefined;
  DuaCategory: { category: string };
  Lectures: undefined;
  LectureDetail: { lectureId: string };
  Qibla: undefined;
  Settings: undefined;
  PrayerTimes: undefined;
  Motivational: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Quran: undefined;
  Tasbih: undefined;
  Hadith: undefined;
  Motivation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ icon, label, focused, color }: { icon: string; label: string; focused: boolean; color: string }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.5 }]}>{icon}</Text>
      <Text style={[styles.tabLabel, { color, fontWeight: focused ? '600' : '400', opacity: focused ? 1 : 0.6 }]}>
        {label}
      </Text>
    </View>
  );
}

function MainTabs() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="🏠" label={t('dashboard')} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="📖" label={t('quran')} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasbih"
        component={TasbihScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="📿" label={t('tasbihCounter')} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Hadith"
        component={DailyHadithScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="📜" label={t('hadithOfTheDay')} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Motivation"
        component={MotivationalScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="💫" label="Mood" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="NamozGuide" component={NamozGuideScreen} />
      <Stack.Screen name="NamozDetail" component={NamozDetailScreen} />
      <Stack.Screen name="SurahDetail" component={SurahDetailScreen} />
      <Stack.Screen name="Duas" component={DuasScreen} />
      <Stack.Screen name="DuaCategory" component={DuaCategoryScreen} />
      <Stack.Screen name="Lectures" component={LecturesScreen} />
      <Stack.Screen name="LectureDetail" component={LectureDetailScreen} />
      <Stack.Screen name="Qibla" component={QiblaScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PrayerTimes" component={PrayerTimesScreen} />
      <Stack.Screen name="Motivational" component={MotivationalScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 1,
  },
});
