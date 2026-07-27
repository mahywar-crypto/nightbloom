import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, shadow, spacing } from '../lib/theme';

interface CardProps {
  style?: ViewStyle;
  tint?: string;
  index?: number;
  animate?: boolean;
}

export function Card({ style, tint, index = 0, animate = true, children }: PropsWithChildren<CardProps>) {
  const progress = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (!animate) return;
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: 380,
      delay: index * 70,
      useNativeDriver: true,
    });
    anim.start();
    // Guarantee the card never gets stuck mid-fade (e.g. if the animation
    // frame loop is interrupted) by forcing the final value once the
    // animation's total duration has definitely elapsed.
    const settle = setTimeout(() => progress.setValue(1), index * 70 + 380 + 50);
    return () => {
      anim.stop();
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        tint ? { backgroundColor: tint } : null,
        style,
        animate && {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
});
