import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { BreathingCircle } from '../components/BreathingCircle';
import { Button } from '../components/Button';
import { spacing } from '../lib/theme';
import { FONT_BOLD, FONT_REGULAR } from '../lib/fonts';
import { GROUNDING_STEPS, PANIC_REMINDERS } from '../lib/content';

type Stage = 'grounding' | 'breathing' | 'closing';

export default function PanicScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // fullScreenModal presentations on iOS can report a stale/zero top inset on
  // first render, which would crop the header against the notch. Floor it at
  // a sensible minimum instead of trusting SafeAreaView alone here.
  const headerTopPadding = Math.max(insets.top, 44) + spacing.sm;
  const [stage, setStage] = useState<Stage>('grounding');
  const [stepIndex, setStepIndex] = useState(0);
  const [reminderIndex] = useState(() => Math.floor(Math.random() * PANIC_REMINDERS.length));

  const isLastGroundingStep = stepIndex === GROUNDING_STEPS.length - 1;

  function nextGroundingStep() {
    if (isLastGroundingStep) {
      setStage('breathing');
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="night" />
      <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
        <View style={[styles.header, { paddingTop: headerTopPadding }]}>
          <Button label="Close" variant="ghostLight" onPress={() => router.back()} />
        </View>

        {stage === 'grounding' && (
          <ScrollView contentContainerStyle={styles.center}>
            <View style={styles.dotsRow}>
              {GROUNDING_STEPS.map((_, i) => (
                <View key={i} style={[styles.dot, i <= stepIndex && styles.dotActive]} />
              ))}
            </View>
            <Text style={styles.stepTitle}>{GROUNDING_STEPS[stepIndex].title}</Text>
            <Text style={styles.stepBody}>{GROUNDING_STEPS[stepIndex].body}</Text>
            <Button
              label={isLastGroundingStep ? 'Start breathing' : 'Next'}
              variant="secondary"
              onPress={nextGroundingStep}
              style={{ marginTop: spacing.xl }}
            />
          </ScrollView>
        )}

        {stage === 'breathing' && (
          <View style={styles.center}>
            <BreathingCircle phaseSeconds={4} />
            <Text style={styles.stepBody}>
              Follow the circle for a minute or two. In, hold, out, hold.
            </Text>
            <Button
              label="I'm feeling steadier"
              variant="secondary"
              onPress={() => setStage('closing')}
              style={{ marginTop: spacing.xl }}
            />
          </View>
        )}

        {stage === 'closing' && (
          <View style={styles.center}>
            <Text style={styles.reminderText}>"{PANIC_REMINDERS[reminderIndex]}"</Text>
            <View style={{ marginTop: spacing.xl, width: '100%', gap: spacing.md }}>
              <Button label="I'm okay now" onPress={() => router.back()} />
              <Button
                label="I need more support"
                variant="ghostLight"
                onPress={() => router.replace('/(tabs)/resources')}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: spacing.lg },
  center: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: FONT_BOLD,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stepBody: {
    marginTop: spacing.md,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
  },
  reminderText: {
    fontSize: 20,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
});
