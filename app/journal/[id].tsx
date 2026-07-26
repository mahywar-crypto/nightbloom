import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../lib/theme';
import { FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD } from '../../lib/fonts';
import { deleteJournalEntry, getJournalEntry, updateJournalEntry } from '../../lib/storage';
import { JournalEntry } from '../../lib/types';

export default function JournalEntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!id) return;
    getJournalEntry(id).then((found) => {
      if (found) {
        setEntry(found);
        setTitle(found.title);
        setBody(found.body);
      }
    });
  }, [id]);

  async function save() {
    if (!id) return;
    await updateJournalEntry(id, { title: title.trim(), body: body.trim() });
    setEditing(false);
    router.back();
  }

  function confirmDelete() {
    Alert.alert('Delete entry', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          if (id) await deleteJournalEntry(id);
          router.back();
        },
      },
    ]);
  }

  if (!entry) {
    return (
      <View style={{ flex: 1 }}>
        <GradientBackground variant="soft" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="soft" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
              <Button label="Close" variant="ghost" onPress={() => router.back()} />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                {editing ? (
                  <Button label="Save" onPress={save} />
                ) : (
                  <Button label="Edit" variant="secondary" onPress={() => setEditing(true)} />
                )}
                <Button label="Delete" variant="danger" onPress={confirmDelete} />
              </View>
            </View>

            <Text style={typography.caption}>{new Date(entry.createdAt).toLocaleString()}</Text>
            {entry.prompt ? (
              <Text style={styles.promptText}>{entry.prompt}</Text>
            ) : null}

            {editing ? (
              <>
                <TextInput
                  style={styles.titleInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title"
                  placeholderTextColor={colors.textMuted}
                />
                <TextInput
                  style={styles.bodyInput}
                  value={body}
                  onChangeText={setBody}
                  multiline
                />
              </>
            ) : (
              <>
                <Text style={styles.titleDisplay}>{entry.title || 'Untitled entry'}</Text>
                <Text style={styles.bodyDisplay}>{entry.body}</Text>
              </>
            )}
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
    marginBottom: spacing.md,
  },
  promptText: {
    marginTop: spacing.xs,
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
    color: colors.violetDeep,
  },
  titleDisplay: {
    marginTop: spacing.md,
    fontSize: 20,
    fontFamily: FONT_BOLD,
    color: colors.textPrimary,
  },
  bodyDisplay: {
    marginTop: spacing.md,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  titleInput: {
    marginTop: spacing.md,
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
