import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { BreathingCircle } from '../components/BreathingCircle';
import { Button } from '../components/Button';
import { spacing } from '../lib/theme';
import { FONT_REGULAR } from '../lib/fonts';

export default function BreathingScreen() {
  const router = useRouter();
  const [cycles, setCycles] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="calm" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Button label="Close" variant="ghostLight" onPress={() => router.back()} />
        </View>

        <View style={styles.center}>
          <BreathingCircle phaseSeconds={4} onCycleComplete={() => setCycles((c) => c + 1)} />
          <Text style={styles.caption}>Follow the circle: in, hold, out, hold</Text>
          <Text style={styles.cycles}>Cycles completed: {cycles}</Text>
        </View>

        <View style={styles.footer}>
          <Button label="I'm done" variant="secondary" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, justifyContent: 'space-between' },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  caption: {
    marginTop: spacing.xl,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.9)',
  },
  cycles: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.7)',
  },
  footer: { padding: spacing.lg, alignItems: 'center' },
});
