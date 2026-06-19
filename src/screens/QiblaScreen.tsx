import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, G, Text as SvgText, Line } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { GlassmorphicCard } from '../components/GlassmorphicCard';
import { IslamicDivider, IslamicStar } from '../components/IslamicPattern';
import { useQibla } from '../hooks/useQibla';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width - 80;

export function QiblaScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { qiblaDirection, compassHeading, qiblaData, error, isLoading, refresh } = useQibla();
  const [permissionRequested, setPermissionRequested] = useState(false);

  // Calculate the difference between compass heading and qibla direction
  const qiblaAngle = qiblaDirection - compassHeading;
  const normalizedAngle = ((qiblaAngle % 360) + 360) % 360;

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <View style={[styles.permissionIcon, { backgroundColor: colors.error + '15' }]}>
            <Text style={styles.permissionIconText}>📍</Text>
          </View>
          <Text style={[styles.permissionTitle, { color: colors.text }]}>
            {t('permissionDenied')}
          </Text>
          <Text style={[styles.permissionDesc, { color: colors.textSecondary }]}>
            {t('permissionDeniedDesc')}
          </Text>
          <TouchableOpacity
            style={[styles.permissionBtn, { backgroundColor: colors.primary }]}
            onPress={refresh}
          >
            <Text style={[styles.permissionBtnText, { color: colors.white }]}>
              {t('retry')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('qiblaFinder')}</Text>
        <IslamicDivider color={colors.gold} />
      </View>

      <View style={styles.compassContainer}>
        {/* Compass ring */}
        <View style={[styles.compassRing, { borderColor: colors.gold + '40' }]}>
          <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} viewBox={`0 0 ${COMPASS_SIZE} ${COMPASS_SIZE}`}>
            {/* Compass ticks */}
            {Array.from({ length: 72 }).map((_, i) => {
              const angle = (i * 5 * Math.PI) / 180;
              const isMain = i % 18 === 0;
              const isMid = i % 9 === 0;
              const r1 = isMain ? COMPASS_SIZE * 0.42 : isMid ? COMPASS_SIZE * 0.43 : COMPASS_SIZE * 0.44;
              const r2 = COMPASS_SIZE * 0.47;
              const x1 = COMPASS_SIZE / 2 + r1 * Math.sin(angle);
              const y1 = COMPASS_SIZE / 2 - r1 * Math.cos(angle);
              const x2 = COMPASS_SIZE / 2 + r2 * Math.sin(angle);
              const y2 = COMPASS_SIZE / 2 - r2 * Math.cos(angle);
              return (
                <Line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isMain ? colors.gold : colors.textLight}
                  strokeWidth={isMain ? 2 : 0.5}
                  opacity={isMain ? 0.8 : 0.3}
                />
              );
            })}

            {/* Cardinal directions */}
            <SvgText
              x={COMPASS_SIZE / 2} y={COMPASS_SIZE * 0.12}
              textAnchor="middle"
              fill={colors.primary}
              fontSize={16}
              fontWeight="bold"
            >
              N
            </SvgText>
            <SvgText
              x={COMPASS_SIZE / 2} y={COMPASS_SIZE * 0.92}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={14}
            >
              S
            </SvgText>
            <SvgText
              x={COMPASS_SIZE * 0.1} y={COMPASS_SIZE / 2 + 5}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={14}
            >
              W
            </SvgText>
            <SvgText
              x={COMPASS_SIZE * 0.9} y={COMPASS_SIZE / 2 + 5}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={14}
            >
              E
            </SvgText>

            {/* Kaaba indicator */}
            <G transform={`rotate(${normalizedAngle}, ${COMPASS_SIZE / 2}, ${COMPASS_SIZE / 2})`}>
              <Line
                x1={COMPASS_SIZE / 2} y1={COMPASS_SIZE / 2}
                x2={COMPASS_SIZE / 2} y2={COMPASS_SIZE * 0.1}
                stroke={colors.gold}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Circle
                cx={COMPASS_SIZE / 2} cy={COMPASS_SIZE / 2}
                r={6}
                fill={colors.gold}
              />
              {/* Kaaba icon at the end */}
              <View style={[styles.kaabaMarker, { transform: [{ rotate: `${-normalizedAngle}deg` }] }]}>
                <Text style={styles.kaabaText}>🕋</Text>
              </View>
            </G>
          </Svg>
        </View>

        {/* Qibla direction info */}
        <GlassmorphicCard style={styles.qiblaInfo}>
          <View style={styles.qiblaInfoRow}>
            <IslamicStar size={14} color={colors.gold} opacity={0.5} />
            <Text style={[styles.qiblaInfoLabel, { color: colors.textSecondary }]}>
              {t('qiblaDirection')}
            </Text>
            <Text style={[styles.qiblaInfoValue, { color: colors.primary }]}>
              {Math.round(normalizedAngle)}°
            </Text>
          </View>
        </GlassmorphicCard>

        {/* Location info */}
        {qiblaData && (
          <GlassmorphicCard style={styles.locationInfo}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {t('distanceToMakkah')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {qiblaData.distance.toLocaleString()} km
              </Text>
            </View>
            <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                {t('coordinates')}
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {qiblaData.latitude}°, {qiblaData.longitude}°
              </Text>
            </View>
          </GlassmorphicCard>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  compassContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  compassRing: {
    width: COMPASS_SIZE + 20,
    height: COMPASS_SIZE + 20,
    borderRadius: (COMPASS_SIZE + 20) / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kaabaMarker: {
    position: 'absolute',
    top: COMPASS_SIZE * 0.03,
    alignSelf: 'center',
  },
  kaabaText: { fontSize: 14 },
  qiblaInfo: {
    marginTop: 20,
    width: width - 60,
    paddingVertical: 12,
  },
  qiblaInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  qiblaInfoLabel: { fontSize: 13 },
  qiblaInfoValue: { fontSize: 18, fontWeight: '700' },
  locationInfo: {
    marginTop: 10,
    width: width - 60,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 13 },
  infoValue: { fontSize: 13, fontWeight: '600' },

  // Permission
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  permissionIconText: { fontSize: 36 },
  permissionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  permissionDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  permissionBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  permissionBtnText: { fontSize: 16, fontWeight: '600' },
});
