import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Line } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

interface IslamicPatternProps {
  size?: number;
  color?: string;
  opacity?: number;
  style?: any;
}

// Simple geometric star pattern inspired by Islamic art
export function IslamicStar({ size = 40, color, opacity = 0.15, style }: IslamicPatternProps) {
  const { colors } = useTheme();
  const fillColor = color || colors.accent;
  const center = size / 2;
  const outerR = size * 0.45;
  const innerR = size * 0.18;

  const points = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    if (i % 2 === 0) {
      points.push({ x: center + outerR * Math.cos(angle), y: center + outerR * Math.sin(angle) });
    } else {
      points.push({ x: center + innerR * Math.cos(angle), y: center + innerR * Math.sin(angle) });
    }
  }

  const starPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Path d={starPath} fill={fillColor} opacity={opacity} />
        <Circle cx={center} cy={center} r={innerR * 0.5} fill={fillColor} opacity={opacity * 0.5} />
      </Svg>
    </View>
  );
}

// Decorative border pattern
export function IslamicBorderPattern({ width, color, opacity = 0.1 }: { width: number; color?: string; opacity?: number }) {
  const { colors } = useTheme();
  const fillColor = color || colors.accent;
  const patternSize = 20;
  const repeatCount = Math.ceil(width / patternSize);

  return (
    <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
      {Array.from({ length: repeatCount }).map((_, i) => (
        <IslamicStar key={i} size={patternSize - 4} color={fillColor} opacity={opacity} />
      ))}
    </View>
  );
}

// Background pattern for splash screen
export function IslamicBackgroundPattern({ size = '100%', opacity = 0.05 }: { size?: string | number; opacity?: number }) {
  const { colors } = useTheme();
  const patternSize = 60;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 360 640" opacity={opacity}>
        <G>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => {
              const x = col * 60 + (row % 2 === 0 ? 0 : 30);
              const y = row * 60;
              const cx = x + 30;
              const cy = y + 30;
              const r1 = 25;
              const r2 = 10;
              const pts = [];
              for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4 - Math.PI / 2;
                const r = i % 2 === 0 ? r1 : r2;
                pts.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
              }
              const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
              return <Path key={`${row}-${col}`} d={pathD} fill={colors.gold} />;
            })
          )}
        </G>
      </Svg>
    </View>
  );
}

// Decorative divider
export function IslamicDivider({ color, thickness = 1 }: { color?: string; thickness?: number }) {
  const { colors } = useTheme();
  const strokeColor = color || colors.accent;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
      <View style={{ flex: 1, height: thickness, backgroundColor: strokeColor, opacity: 0.3 }} />
      <IslamicStar size={16} color={strokeColor} opacity={0.5} style={{ marginHorizontal: 8 }} />
      <View style={{ flex: 1, height: thickness, backgroundColor: strokeColor, opacity: 0.3 }} />
    </View>
  );
}

// Ornamental corner decoration
export function IslamicCorner({ size = 30, position = 'top-left', color }: { size?: number; position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; color?: string }) {
  const { colors } = useTheme();
  const strokeColor = color || colors.accent;

  const rotations: Record<string, string> = {
    'top-left': '0',
    'top-right': '90',
    'bottom-left': '-90',
    'bottom-right': '180',
  };

  return (
    <View style={{ width: size, height: size, transform: [{ rotate: `${rotations[position]}deg` }] }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Path
          d={`M${size},${size} L${size * 0.3},${size} Q${size * 0.1},${size} ${size * 0.1},${size * 0.7} L${size * 0.1},${size * 0.3} Q${size * 0.1},${size * 0.1} ${size * 0.3},${size * 0.1} L${size},${size * 0.1}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          opacity={0.4}
        />
      </Svg>
    </View>
  );
}
