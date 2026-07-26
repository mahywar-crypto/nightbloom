import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { cardTint, colors, spacing, typography } from '../../lib/theme';
import { FONT_REGULAR } from '../../lib/fonts';
import { MENTAL_HEALTH_TOPICS } from '../../lib/conditions';

export default function LearnScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="soft" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <Button label="Back" variant="ghost" onPress={() => router.back()} />
          </View>
          <Text style={typography.title}>Understanding mental health</Text>
          <Text style={[typography.body, { marginTop: spacing.xs }]}>
            Plain-language overviews of common experiences, to help you understand
            yourself or someone you care about a little better.
          </Text>

          <Card style={styles.disclaimerCard} index={0}>
            <Text style={styles.disclaimerText}>
              This is general education, not a diagnosis. Only a qualified
              professional, like a doctor or therapist, can diagnose a mental
              health condition. These summaries are written in plain language
              but are grounded in how conditions are described by major public
              health sources, including the National Institute of Mental
              Health (NIMH), the World Health Organization (WHO), and the
              American Psychiatric Association (APA). If any of this
              resonates, it's worth talking to a professional, and if you're
              in crisis, the Resources tab has real people you can reach right
              now.
            </Text>
          </Card>

          <View style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}>
            {MENTAL_HEALTH_TOPICS.map((topic, i) => (
              <Pressable key={topic.slug} onPress={() => router.push(`/learn/${topic.slug}`)}>
                <Card style={{ marginTop: i === 0 ? 0 : spacing.sm }} tint={cardTint(i)} index={i + 1}>
                  <View style={styles.row}>
                    <Text style={styles.emoji}>{topic.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={typography.bodyStrong}>{topic.name}</Text>
                      <Text style={[typography.caption, { marginTop: 2 }]}>{topic.summary}</Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
  headerRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  disclaimerCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_REGULAR,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  emoji: {
    fontSize: 28,
  },
});
