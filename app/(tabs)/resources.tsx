import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { cardTint, colors, spacing, typography } from '../../lib/theme';
import { FONT_REGULAR, FONT_SEMIBOLD } from '../../lib/fonts';
import {
  CRISIS_RESOURCES,
  PROFESSIONAL_RESOURCES,
  REMINDERS,
  WHEN_TO_SEEK_HELP,
} from '../../lib/content';

function contactAction(contact: string): (() => void) | undefined {
  const telMatch = contact.match(/[\d][\d\s-]{5,}\d/);
  if (telMatch) {
    const tel = telMatch[0].replace(/[\s-]/g, '');
    return () => Linking.openURL(`tel:${tel}`);
  }
  const domainMatch = contact.trim().match(/^[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i);
  if (domainMatch) {
    return () => Linking.openURL(`https://${contact.trim()}`);
  }
  return undefined;
}

function ContactLine({ contact }: { contact: string }) {
  const action = contactAction(contact);
  if (!action) return <Text style={styles.contact}>{contact}</Text>;
  return (
    <Pressable onPress={action}>
      <Text style={styles.contactLink}>{contact}</Text>
    </Pressable>
  );
}

export default function ResourcesScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="mist" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={typography.title}>Resources</Text>

          <Card style={styles.disclaimerCard} index={0}>
            <Text style={styles.disclaimerText}>
              Nightbloom is a self-help companion, not a substitute for professional
              diagnosis or treatment. If you are in immediate danger or think
              you may hurt yourself or someone else, call your local emergency
              number right away. Your journal entries and check-ins never
              leave this device. The one exception is Companion chat below,
              where your messages are sent to an AI service to generate replies.
            </Text>
          </Card>

          <Card style={{ marginTop: spacing.lg }} tint={colors.surfaceViolet} index={1}>
            <Text style={typography.heading}>Understanding mental health</Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              Plain-language overviews of anxiety, depression, and other common
              experiences. Educational only, never a diagnosis.
            </Text>
            <Button
              label="Start learning"
              variant="secondary"
              onPress={() => router.push('/learn')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <Card style={{ marginTop: spacing.md }} tint={colors.surfaceTeal} index={2}>
            <Text style={typography.heading}>Talk to Companion</Text>
            <Text style={[typography.body, { marginTop: spacing.xs }]}>
              Feeling lonely or just want someone to talk to? Companion is an AI
              chat. It's not a real person or therapist, but it's here anytime.
            </Text>
            <Button
              label="Start chatting"
              variant="secondary"
              onPress={() => router.push('/companion')}
              style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
            />
          </Card>

          <Text style={[typography.heading, { marginTop: spacing.lg }]}>Crisis support</Text>
          {CRISIS_RESOURCES.map((r, i) => (
            <Card key={r.name} style={{ marginTop: spacing.sm }} tint={cardTint(i)} index={i + 3}>
              <Text style={typography.caption}>{r.region}</Text>
              <Text style={typography.bodyStrong}>{r.name}</Text>
              <ContactLine contact={r.contact} />
              <Text style={[typography.body, { marginTop: spacing.xs }]}>{r.description}</Text>
            </Card>
          ))}

          <Text style={[typography.heading, { marginTop: spacing.lg }]}>
            When it might be time for extra support
          </Text>
          <Text style={[typography.caption, { marginTop: spacing.xs, marginBottom: spacing.sm }]}>
            Self-help tools like this app can help, but they are not always enough on
            their own. It might be worth reaching out to a professional if:
          </Text>
          <Card tint={colors.surfaceBlue} index={CRISIS_RESOURCES.length + 3}>
            {WHEN_TO_SEEK_HELP.map((w, i) => (
              <Text key={w} style={[typography.body, { marginTop: i === 0 ? 0 : spacing.sm }]}>
                • {w}
              </Text>
            ))}
          </Card>

          <Text style={[typography.heading, { marginTop: spacing.lg }]}>
            Find a therapist or counselor
          </Text>
          {PROFESSIONAL_RESOURCES.map((p, i) => (
            <Card
              key={p.name}
              style={{ marginTop: spacing.sm }}
              tint={cardTint(i)}
              index={CRISIS_RESOURCES.length + i + 4}
            >
              <Text style={typography.bodyStrong}>{p.name}</Text>
              <ContactLine contact={p.contact} />
              <Text style={[typography.body, { marginTop: spacing.xs }]}>{p.description}</Text>
            </Card>
          ))}

          <Text style={[typography.heading, { marginTop: spacing.lg }]}>
            Reminders and tips
          </Text>
          <Card
            style={{ marginTop: spacing.sm, marginBottom: spacing.xxl }}
            tint={colors.surfaceViolet}
            index={CRISIS_RESOURCES.length + PROFESSIONAL_RESOURCES.length + 4}
          >
            {REMINDERS.map((r, i) => (
              <Text
                key={r.body}
                style={[typography.body, { marginTop: i === 0 ? 0 : spacing.sm }]}
              >
                • {r.body}
              </Text>
            ))}
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
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
  contact: {
    marginTop: 2,
    fontSize: 15,
    fontFamily: FONT_SEMIBOLD,
    color: colors.indigoDeep,
  },
  contactLink: {
    marginTop: 2,
    fontSize: 15,
    fontFamily: FONT_SEMIBOLD,
    color: colors.indigoDeep,
    textDecorationLine: 'underline',
  },
});
