import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/GradientBackground';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { cardTint, colors, spacing, typography } from '../../lib/theme';
import { getJournalEntries } from '../../lib/storage';
import { JournalEntry } from '../../lib/types';

export default function JournalScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getJournalEntries().then((list) => {
        if (active) setEntries(list);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="soft" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={typography.title}>Journal</Text>
              <Text style={[typography.body, { marginTop: spacing.xs }]}>
                A private space just for you. Nothing here leaves your device.
              </Text>
              <Button
                label="+ New entry"
                onPress={() => router.push('/journal/new')}
                style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
              />
            </View>
          }
          ListEmptyComponent={
            <Card>
              <Text style={typography.body}>
                No entries yet. Writing even a few sentences can help untangle overthinking.
              </Text>
            </Card>
          }
          renderItem={({ item, index }) => (
            <Pressable onPress={() => router.push(`/journal/${item.id}`)}>
              <Card style={{ marginBottom: spacing.md }} tint={cardTint(index)} index={index}>
                <EntryRow entry={item} />
              </Card>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

function EntryRow({ entry }: { entry: JournalEntry }) {
  return (
    <View>
      <Text style={typography.bodyStrong}>{entry.title || 'Untitled entry'}</Text>
      <Text style={typography.caption}>{new Date(entry.createdAt).toLocaleString()}</Text>
      <Text style={[typography.body, { marginTop: spacing.xs }]} numberOfLines={3}>
        {entry.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
