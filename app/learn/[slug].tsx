import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../lib/theme';
import { FONT_REGULAR } from '../../lib/fonts';
import { getTopicBySlug } from '../../lib/conditions';

export default function TopicScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const topic = slug ? getTopicBySlug(slug) : undefined;

  if (!topic) {
    return (
      <View style={{ flex: 1 }}>
        <GradientBackground variant="soft" />
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View style={styles.content}>
            <Button label="Back" variant="ghost" onPress={() => router.back()} />
            <Text style={[typography.body, { marginTop: spacing.lg }]}>
              We couldn't find that topic.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="soft" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Button
            label="Back"
            variant="ghost"
            onPress={() => router.back()}
            style={{ alignSelf: 'flex-start' }}
          />

          <View style={styles.titleRow}>
            <Text style={styles.emoji}>{topic.emoji}</Text>
            <Text style={[typography.title, { flex: 1 }]}>{topic.name}</Text>
          </View>

          <Card style={{ marginTop: spacing.lg }} index={0}>
            <Text style={typography.heading}>Overview</Text>
            <Text style={[typography.body, { marginTop: spacing.sm }]}>{topic.overview}</Text>
          </Card>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceBlue} index={1}>
            <Text style={typography.heading}>What it can look like</Text>
            {topic.commonSigns.map((sign, i) => (
              <Text
                key={sign}
                style={[typography.body, { marginTop: i === 0 ? spacing.sm : spacing.xs }]}
              >
                • {sign}
              </Text>
            ))}
          </Card>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceViolet} index={2}>
            <Text style={typography.heading}>What might help</Text>
            <Text style={[typography.body, { marginTop: spacing.sm }]}>{topic.whatMightHelp}</Text>
          </Card>

          <Card style={styles.noteCard} index={3}>
            <Text style={styles.noteText}>
              This is general education, not a diagnosis. Only a qualified
              professional can diagnose a mental health condition. If any of
              this resonates, it's worth talking to a doctor or therapist,
              and the Resources tab can help you find one.
            </Text>
            <Button
              label="See resources"
              variant="secondary"
              onPress={() => router.push('/(tabs)/resources')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  emoji: { fontSize: 32 },
  noteCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_REGULAR,
    color: colors.textSecondary,
  },
});
