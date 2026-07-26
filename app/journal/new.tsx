import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../lib/theme';
import { FONT_REGULAR, FONT_SEMIBOLD } from '../../lib/fonts';
import { addJournalEntry } from '../../lib/storage';
import { JOURNAL_PROMPTS } from '../../lib/content';

export default function NewJournalEntryScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [prompt] = useState(
    () => JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)]
  );

  async function save() {
    if (!body.trim()) {
      router.back();
      return;
    }
    await addJournalEntry({ title: title.trim(), body: body.trim(), prompt });
    router.back();
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="soft" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
              <Text style={typography.title}>New entry</Text>
              <Button label="Cancel" variant="ghost" onPress={() => router.back()} />
            </View>

            <Text style={styles.promptText}>{prompt}</Text>

            <TextInput
              style={styles.titleInput}
              placeholder="Title (optional)"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.bodyInput}
              placeholder="Start writing..."
              placeholderTextColor={colors.textMuted}
              multiline
              autoFocus
              value={body}
              onChangeText={setBody}
            />

            <Button
              label="Save entry"
              onPress={save}
              style={{ marginTop: spacing.lg }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promptText: {
    marginTop: spacing.md,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
    color: colors.violetDeep,
  },
  titleInput: {
    marginTop: spacing.lg,
    fontSize: 18,
    fontFamily: FONT_SEMIBOLD,
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  bodyInput: {
    marginTop: spacing.md,
    minHeight: 220,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },
});
