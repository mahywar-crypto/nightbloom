import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../lib/theme';

type Variant = 'soft' | 'calm' | 'deep' | 'night' | 'aurora' | 'teal' | 'mist';

const VARIANTS: Record<Variant, readonly string[]> = {
  soft: colors.gradientSoft,
  calm: colors.gradientCalm,
  deep: colors.gradientDeep,
  night: colors.gradientNight,
  aurora: colors.gradientAurora,
  teal: colors.gradientTeal,
  mist: colors.gradientMist,
};

interface Orb {
  size: number;
  top: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
  right: number | undefined;
  duration: number;
  travel: number;
  opacity: number;
}

const ORBS: Orb[] = [
  { size: 260, top: -60, bottom: undefined, left: -60, right: undefined, duration: 9000, travel: 24, opacity: 0.14 },
  { size: 200, top: undefined, bottom: 60, left: undefined, right: -50, duration: 11000, travel: 30, opacity: 0.12 },
  { size: 160, top: 220, bottom: undefined, left: undefined, right: 20, duration: 7500, travel: 18, opacity: 0.1 },
];

function FloatingOrb({ orb }: { orb: Orb }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: orb.duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: progress.value * orb.travel - orb.travel / 2 },
      { translateX: progress.value * (orb.travel / 2) - orb.travel / 4 },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: orb.size,
          height: orb.size,
          borderRadius: orb.size / 2,
          top: orb.top,
          bottom: orb.bottom,
          left: orb.left,
          right: orb.right,
          opacity: orb.opacity,
          pointerEvents: 'none',
        },
        animatedStyle,
      ]}
    />
  );
}

// Renders as an absolute-fill background with a few slow-drifting glow orbs
// for ambient motion. Place as the first child of a relatively-positioned
// container, with real content as a sibling after it.
export function GradientBackground({ variant = 'soft' }: { variant?: Variant }) {
  const stops = VARIANTS[variant];
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <LinearGradient
        colors={stops as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {ORBS.map((orb, i) => (
        <FloatingOrb key={i} orb={orb} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
});
