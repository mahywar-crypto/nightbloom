import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../lib/theme';
import { FONT_BOLD, FONT_REGULAR } from '../../lib/fonts';
import { getCheckIns } from '../../lib/storage';
import { CheckIn } from '../../lib/types';
import { MOODS, REMINDERS, Reminder } from '../../lib/content';

function greeting(): { label: string; message: string } {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { label: 'Good morning', message: "Let's ease into today, one step at a time." };
  }
  if (hour < 18) {
    return { label: 'Good afternoon', message: "However today's going, we're glad you're here." };
  }
  return { label: 'Good evening', message: 'Take a moment for yourself before the day winds down.' };
}

function reminderOfTheDay(): Reminder {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return REMINDERS[dayIndex % REMINDERS.length];
}

export default function HomeScreen() {
  const router = useRouter();
  const [lastCheckIn, setLastCheckIn] = useState<CheckIn | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getCheckIns().then((list) => {
        if (active) setLastCheckIn(list[0] ?? null);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const moodMeta = lastCheckIn ? MOODS.find((m) => m.key === lastCheckIn.mood) : null;
  const { label: greetingLabel, message: greetingMessage } = greeting();
  const reminder = reminderOfTheDay();

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="aurora" />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={typography.caption}>{greetingLabel}</Text>
          <Text style={[typography.title, { marginBottom: spacing.lg }]}>{greetingMessage}</Text>

          <Card style={styles.sosCard} index={0}>
            <Text style={styles.sosTitle}>In a panic attack right now?</Text>
            <Text style={styles.sosBody}>
              Let's get through it together, one step at a time.
            </Text>
            <Button
              label="Start panic attack SOS"
              variant="secondary"
              onPress={() => router.push('/panic')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <View style={styles.quickRow}>
            <Card style={styles.quickCard} tint={colors.surfaceBlue} index={1}>
              <Text style={styles.quickEmoji}>🌬️</Text>
              <Text style={typography.bodyStrong}>Breathe</Text>
              <Text style={typography.caption}>2-minute box breathing</Text>
              <Button
                label="Start"
                variant="ghost"
                onPress={() => router.push('/breathing')}
                style={{ marginTop: spacing.sm }}
              />
            </Card>
            <Card style={styles.quickCard} tint={colors.surfaceViolet} index={2}>
              <Text style={styles.quickEmoji}>💭</Text>
              <Text style={typography.bodyStrong}>Check in</Text>
              <Text style={typography.caption}>How are you feeling?</Text>
              <Button
                label="Start"
                variant="ghost"
                onPress={() => router.push('/(tabs)/checkin')}
                style={{ marginTop: spacing.sm }}
              />
            </Card>
          </View>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceTeal} index={3}>
            <Text style={typography.heading}>Feeling lonely?</Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              Talk to Companion, an AI you can chat with anytime. It's not a
              therapist, just someone to talk to.
            </Text>
            <Button
              label="Start chatting"
              variant="ghost"
              onPress={() => router.push('/companion')}
              style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}
            />
          </Card>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceBlue} index={4}>
            <Text style={typography.heading}>Recent check-in</Text>
            {lastCheckIn && moodMeta ? (
              <View style={{ marginTop: spacing.sm }}>
                <Text style={typography.body}>
                  {moodMeta.emoji} {moodMeta.label} · intensity {lastCheckIn.intensity}/10
                </Text>
                <Text style={typography.caption}>
                  {new Date(lastCheckIn.createdAt).toLocaleString()}
                </Text>
              </View>
            ) : (
              <Text style={[typography.body, { marginTop: spacing.sm }]}>
                No check-ins yet. Try one whenever you're ready. There's no wrong answer.
              </Text>
            )}
          </Card>

          <Card
            style={{ marginTop: spacing.md, marginBottom: spacing.xl }}
            tint={colors.surfaceViolet}
            index={5}
          >
            <Text style={typography.heading}>Today's reminder</Text>
            <Text
              style={[
                typography.body,
                { marginTop: spacing.sm },
                reminder.kind === 'affirmation' && { fontStyle: 'italic' },
              ]}
            >
              {reminder.kind === 'affirmation' ? `"${reminder.body}"` : reminder.body}
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: spacing.lg },
  sosCard: {
    backgroundColor: colors.indigoDeep,
  },
  sosTitle: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: colors.textOnDark,
  },
  sosBody: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  quickCard: {
    flex: 1,
    alignItems: 'flex-start',
  },
  quickEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
});
