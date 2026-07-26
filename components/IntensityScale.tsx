import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../lib/theme';
import { FONT_BOLD, FONT_REGULAR } from '../lib/fonts';

interface IntensityScaleProps {
  value: number; // 1-10
  onChange: (value: number) => void;
}

export function IntensityScale({ value, onChange }: IntensityScaleProps) {
  return (
    <View>
      <View style={styles.row}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const active = n <= value;
          return (
            <Pressable
              key={n}
              onPress={() => onChange(n)}
              style={[styles.segment, active && styles.segmentActive]}
            />
          );
        })}
      </View>
      <View style={styles.captions}>
        <Text style={styles.caption}>Mild</Text>
        <Text style={styles.valueText}>{value}/10</Text>
        <Text style={styles.caption}>Intense</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.violet,
    borderColor: colors.violet,
  },
  captions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  caption: {
    fontSize: 13,
    fontFamily: FONT_REGULAR,
    color: colors.textMuted,
  },
  valueText: {
    fontSize: 13,
    fontFamily: FONT_BOLD,
    color: colors.indigoDeep,
  },
});
