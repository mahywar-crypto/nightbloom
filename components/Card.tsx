import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, radii, shadow, spacing } from '../lib/theme';

interface CardProps {
  style?: ViewStyle;
  tint?: string;
  index?: number;
  animate?: boolean;
}

export function Card({ style, tint, index = 0, animate = true, children }: PropsWithChildren<CardProps>) {
  return (
    <Animated.View
      entering={animate ? FadeInUp.delay(index * 70).springify().damping(16) : undefined}
      style={[styles.card, tint ? { backgroundColor: tint } : null, style]}
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
