import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { IntensityScale } from '../../components/IntensityScale';
import { RecommendationList } from '../../components/RecommendationList';
import { StepTransition } from '../../components/StepTransition';
import { cardTint, colors, spacing, typography } from '../../lib/theme';
import {
  HIGH_INTENSITY_RECOMMENDATION,
  HIGH_INTENSITY_THRESHOLD,
  MOOD_RECOMMENDATIONS,
  MOODS,
  Recommendation,
  TRIGGERS,
} from '../../lib/content';
import { MoodKey, TriggerKey, CheckIn } from '../../lib/types';
import { addCheckIn, getCheckIns } from '../../lib/storage';

type Step = 'idle' | 'mood' | 'triggers' | 'intensity' | 'note' | 'done';

const STEP_ORDER: Step[] = ['mood', 'triggers', 'intensity', 'note'];

export default function CheckInScreen() {
  const [step, setStep] = useState<Step>('idle');
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [triggers, setTriggers] = useState<TriggerKey[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState<CheckIn[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getCheckIns().then((list) => {
        if (active) setHistory(list.slice(0, 10));
      });
      return () => {
        active = false;
      };
    }, [])
  );

  function reset() {
    setStep('idle');
    setMood(null);
    setTriggers([]);
    setIntensity(5);
    setNote('');
  }

  function toggleTrigger(key: TriggerKey) {
    setTriggers((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]));
  }

  async function finish() {
    if (!mood) return;
    await addCheckIn({ mood, triggers, intensity, note: note.trim() });
    const list = await getCheckIns();
    setHistory(list.slice(0, 10));
    setStep('done');
  }

  const stepIndex = STEP_ORDER.indexOf(step);

  const recommendations: Recommendation[] = mood
    ? [
        ...(intensity >= HIGH_INTENSITY_THRESHOLD ? [HIGH_INTENSITY_RECOMMENDATION] : []),
        ...MOOD_RECOMMENDATIONS[mood],
      ]
    : [];

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="teal" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={typography.title}>Check in</Text>

          {step === 'idle' && (
            <>
              <Card style={{ marginTop: spacing.lg }}>
                <Text style={typography.heading}>How are you feeling right now?</Text>
                <Text style={[typography.body, { marginTop: spacing.xs }]}>
                  A quick 4-step check-in to help notice patterns over time.
                </Text>
                <Button
                  label="Start check-in"
                  onPress={() => setStep('mood')}
                  style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
                />
              </Card>
              <HistoryList history={history} />
            </>
          )}

          {step !== 'idle' && step !== 'done' && (
            <Card style={{ marginTop: spacing.lg }}>
              <View style={styles.dotsRow}>
                {STEP_ORDER.map((s, i) => (
                  <View
                    key={s}
                    style={[styles.dot, i <= stepIndex && styles.dotActive]}
                  />
                ))}
              </View>

              {step === 'mood' && (
                <StepTransition>
                  <Text style={typography.heading}>Pick the mood closest to how you feel</Text>
                  <View style={styles.moodGrid}>
                    {MOODS.map((m) => (
                      <Chip
                        key={m.key}
                        label={`${m.emoji} ${m.label}`}
                        selected={mood === m.key}
                        onPress={() => setMood(m.key)}
                      />
                    ))}
                  </View>
                  <Button
                    label="Next"
                    onPress={() => setStep('triggers')}
                    style={{ marginTop: spacing.md }}
                    variant={mood ? 'primary' : 'ghost'}
                  />
                </StepTransition>
              )}

              {step === 'triggers' && (
                <StepTransition>
                  <Text style={typography.heading}>What might be contributing to this?</Text>
                  <Text style={typography.caption}>Choose any that apply, or none.</Text>
                  <View style={styles.moodGrid}>
                    {TRIGGERS.map((t) => (
                      <Chip
                        key={t.key}
                        label={t.label}
                        selected={triggers.includes(t.key)}
                        onPress={() => toggleTrigger(t.key)}
                      />
                    ))}
                  </View>
                  <View style={styles.navRow}>
                    <Button label="Back" variant="ghost" onPress={() => setStep('mood')} />
                    <Button label="Next" onPress={() => setStep('intensity')} />
                  </View>
                </StepTransition>
              )}

              {step === 'intensity' && (
                <StepTransition>
                  <Text style={typography.heading}>How intense does it feel?</Text>
                  <View style={{ marginTop: spacing.md }}>
                    <IntensityScale value={intensity} onChange={setIntensity} />
                  </View>
                  <View style={styles.navRow}>
                    <Button label="Back" variant="ghost" onPress={() => setStep('triggers')} />
                    <Button label="Next" onPress={() => setStep('note')} />
                  </View>
                </StepTransition>
              )}

              {step === 'note' && (
                <StepTransition>
                  <Text style={typography.heading}>Anything you want to note? (optional)</Text>
                  <TextInput
                    style={styles.noteInput}
                    multiline
                    placeholder="What's on your mind..."
                    placeholderTextColor={colors.textMuted}
                    value={note}
                    onChangeText={setNote}
                  />
                  <View style={styles.navRow}>
                    <Button label="Back" variant="ghost" onPress={() => setStep('intensity')} />
                    <Button label="Save check-in" onPress={finish} />
                  </View>
                </StepTransition>
              )}
            </Card>
          )}

          {step === 'done' && (
            <>
              <Card style={{ marginTop: spacing.lg }}>
                <Text style={typography.heading}>Thanks for checking in 💙</Text>
                <Text style={[typography.body, { marginTop: spacing.xs }]}>
                  Noticing how you feel is real progress, even on hard days.
                </Text>
                <Button
                  label="Done"
                  variant="ghost"
                  onPress={reset}
                  style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
                />
              </Card>

              {recommendations.length > 0 && (
                <View style={{ marginTop: spacing.lg }}>
                  <RecommendationList recommendations={recommendations} heading="Might help right now" />
                </View>
              )}

              <HistoryList history={history} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function HistoryList({ history }: { history: CheckIn[] }) {
  if (history.length === 0) return null;
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={typography.heading}>Recent check-ins</Text>
      {history.map((c, i) => {
        const meta = MOODS.find((m) => m.key === c.mood);
        return (
          <Card key={c.id} style={{ marginTop: spacing.sm }} tint={cardTint(i)} index={i}>
            <Text style={typography.bodyStrong}>
              {meta?.emoji} {meta?.label} · {c.intensity}/10
            </Text>
            <Text style={typography.caption}>{new Date(c.createdAt).toLocaleString()}</Text>
            {c.note ? <Text style={[typography.body, { marginTop: spacing.xs }]}>{c.note}</Text> : null}
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  noteInput: {
    marginTop: spacing.md,
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    textAlignVertical: 'top',
    color: colors.textPrimary,
    backgroundColor: colors.surfaceAlt,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.violet,
  },
});
