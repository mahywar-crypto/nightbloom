import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { colors, radii, spacing } from '../lib/theme';
import { FONT_MEDIUM, FONT_REGULAR } from '../lib/fonts';

// Placeholder ambient tracks. Replace the files in assets/audio with real
// royalty-free audio (same filenames) to enable actual sound.
const TRACKS = [
  { key: 'rain', label: 'Rain', emoji: '🌧️', source: require('../assets/audio/rain.wav') },
  { key: 'ocean', label: 'Ocean waves', emoji: '🌊', source: require('../assets/audio/ocean.wav') },
  { key: 'whitenoise', label: 'White noise', emoji: '📻', source: require('../assets/audio/whitenoise.wav') },
  { key: 'forest', label: 'Forest', emoji: '🌲', source: require('../assets/audio/forest.wav') },
] as const;

function TrackRow({ track }: { track: (typeof TRACKS)[number] }) {
  const player = useAudioPlayer(track.source);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    player.loop = true;
  }, [player]);

  return (
    <Pressable
      onPress={() => (status.playing ? player.pause() : player.play())}
      style={[styles.row, status.playing && styles.rowActive]}
    >
      <Text style={styles.emoji}>{track.emoji}</Text>
      <Text style={styles.label}>{track.label}</Text>
      <Text style={styles.playIcon}>{status.playing ? '⏸' : '▶'}</Text>
    </Pressable>
  );
}

export function SoundPlayer() {
  return (
    <View>
      {TRACKS.map((t) => (
        <TrackRow key={t.key} track={t} />
      ))}
      <Text style={styles.note}>
        Placeholder audio is silent by default. Drop real ambient tracks into
        assets/audio (same filenames) to enable sound.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowActive: {
    borderColor: colors.violet,
    backgroundColor: colors.surfaceAlt,
  },
  emoji: { fontSize: 20, marginRight: spacing.sm },
  label: { flex: 1, fontSize: 16, fontFamily: FONT_MEDIUM, color: colors.textPrimary },
  playIcon: { fontSize: 16, color: colors.indigoDeep },
  note: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontFamily: FONT_REGULAR,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
