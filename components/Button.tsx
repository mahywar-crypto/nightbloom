import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, radii, spacing, typography } from '../lib/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghostLight' | 'danger';
  style?: ViewStyle;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ label, onPress, variant = 'primary', style, icon }: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.95, { damping: 14, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 14, stiffness: 300 });
      }}
      style={[styles.base, variantStyles[variant], style, animatedStyle]}
    >
      <View style={styles.content}>
        {icon}
        <Text style={[typography.button, textVariant[variant]]}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

const variantStyles: Record<string, ViewStyle> = {
  primary: { backgroundColor: colors.indigo },
  secondary: { backgroundColor: colors.iceBlue },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  ghostLight: { backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)' },
  danger: { backgroundColor: colors.danger },
};

const textVariant: Record<string, { color: string }> = {
  primary: { color: colors.textOnDark },
  secondary: { color: colors.indigoDeep },
  ghost: { color: colors.textSecondary },
  ghostLight: { color: colors.textOnDark },
  danger: { color: colors.textOnDark },
};
