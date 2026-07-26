import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../lib/theme';
import { FONT_SEMIBOLD } from '../lib/fonts';

type Phase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

const PHASE_LABEL: Record<Phase, string> = {
  inhale: 'Breathe in',
  holdIn: 'Hold',
  exhale: 'Breathe out',
  holdOut: 'Hold',
};

const PHASE_ORDER: Phase[] = ['inhale', 'holdIn', 'exhale', 'holdOut'];

interface BreathingCircleProps {
  // seconds for each phase, box breathing defaults to 4-4-4-4
  phaseSeconds?: number;
  onCycleComplete?: () => void;
  running?: boolean;
}

export function BreathingCircle({
  phaseSeconds = 4,
  onCycleComplete,
  running = true,
}: BreathingCircleProps) {
  const scale = useRef(new Animated.Value(0.55)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<Phase>('inhale');
  const phaseIndexRef = useRef(0);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  useEffect(() => {
    if (!running) return;
    let cancelled = false;

    function runPhase(index: number) {
      if (cancelled) return;
      const currentPhase = PHASE_ORDER[index % PHASE_ORDER.length];
      setPhase(currentPhase);

      const targetScale = currentPhase === 'inhale' ? 1 : currentPhase === 'exhale' ? 0.55 : null;

      if (targetScale !== null) {
        Animated.timing(scale, {
          toValue: targetScale,
          duration: phaseSeconds * 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      }

      const timeout = setTimeout(() => {
        if (cancelled) return;
        const nextIndex = index + 1;
        if (nextIndex % PHASE_ORDER.length === 0) {
          onCycleComplete?.();
        }
        phaseIndexRef.current = nextIndex;
        runPhase(nextIndex);
      }, phaseSeconds * 1000);

      return () => clearTimeout(timeout);
    }

    const cleanup = runPhase(phaseIndexRef.current);
    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseSeconds]);

  const glowScale = glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.outerRing, { transform: [{ scale: Animated.multiply(scale, glowScale) }] }]}
      />
      <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
        <Text style={styles.label}>{PHASE_LABEL[phase]}</Text>
      </Animated.View>
    </View>
  );
}

const SIZE = 220;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
  },
  outerRing: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  circle: {
    width: SIZE * 0.72,
    height: SIZE * 0.72,
    borderRadius: (SIZE * 0.72) / 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: FONT_SEMIBOLD,
    color: colors.indigoDeep,
  },
});
