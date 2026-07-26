import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { SoundPlayer } from '../../components/SoundPlayer';
import { cardTint, colors, spacing, typography } from '../../lib/theme';
import { FONT_BOLD, FONT_REGULAR } from '../../lib/fonts';
import { COPING_TECHNIQUES } from '../../lib/content';

export default function CalmScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="mist" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={typography.title}>Calm</Text>
          <Text style={[typography.body, { marginTop: spacing.xs, marginBottom: spacing.lg }]}>
            Tools to help you settle your body and mind.
          </Text>

          <Card style={styles.panicCard} index={0}>
            <Text style={styles.panicTitle}>Panic attack right now?</Text>
            <Text style={styles.panicBody}>
              A guided, step-by-step grounding sequence to help you through it.
            </Text>
            <Button
              label="Start panic attack SOS"
              variant="secondary"
              onPress={() => router.push('/panic')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <Card style={{ marginTop: spacing.md }} index={1}>
            <Text style={typography.heading}>Breathing exercise</Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              Box breathing (4-4-4-4) to calm your nervous system in about 2 minutes.
            </Text>
            <Button
              label="Start breathing"
              onPress={() => router.push('/breathing')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceTeal} index={2}>
            <Text style={typography.heading}>Talk to Companion</Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              Feeling lonely or just want to talk? Chat with an AI companion.
              It's not a therapist, just someone to talk to.
            </Text>
            <Button
              label="Start chatting"
              onPress={() => router.push('/companion')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <View style={{ marginTop: spacing.lg }}>
            <Text style={typography.heading}>Calming sounds</Text>
            <Text style={[typography.caption, { marginTop: spacing.xs, marginBottom: spacing.md }]}>
              Loopable ambient sound to play in the background.
            </Text>
            <SoundPlayer />
          </View>

          <View style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}>
            <Text style={typography.heading}>More ways to cope</Text>
            {COPING_TECHNIQUES.map((t, i) => (
              <Card key={t.title} style={{ marginTop: spacing.sm }} tint={cardTint(i)} index={i + 3}>
                <Text style={typography.bodyStrong}>{t.title}</Text>
                <Text style={[typography.body, { marginTop: spacing.xs }]}>{t.body}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
  panicCard: {
    backgroundColor: colors.violetDeep,
  },
  panicTitle: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: '#FFFFFF',
  },
  panicBody: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
});
