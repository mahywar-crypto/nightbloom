import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { Button } from '../components/Button';
import { FadeInView } from '../components/FadeInView';
import { RecommendationList } from '../components/RecommendationList';
import { colors, radii, spacing, typography } from '../lib/theme';
import { FONT_BOLD, FONT_REGULAR } from '../lib/fonts';
import { addCompanionMessage, clearCompanionMessages, getCompanionMessages } from '../lib/storage';
import { CompanionError, sendCompanionMessage } from '../lib/companion';
import { CompanionMessage } from '../lib/types';
import { GENERAL_RECOMMENDATIONS } from '../lib/content';

const GREETING =
  "Hi, I'm glad you're here. I'm an AI companion, not a real person or therapist, but I'm happy to just talk if you're feeling lonely or want company. What's on your mind?";

export default function CompanionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // fullScreenModal presentations on iOS can report a stale/zero top inset on
  // first render, which would crop the header against the notch. Floor it at
  // a sensible minimum instead of trusting SafeAreaView alone here.
  const headerTopPadding = Math.max(insets.top, 44) + spacing.sm;
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [wrappingUp, setWrappingUp] = useState(false);

  useEffect(() => {
    (async () => {
      const history = await getCompanionMessages();
      if (history.length === 0) {
        const greeting = await addCompanionMessage({ role: 'assistant', content: GREETING });
        setMessages([greeting]);
      } else {
        setMessages(history);
      }
    })();
  }, []);

  function scrollToEnd() {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setErrorText(null);

    const userMessage = await addCompanionMessage({ role: 'user', content: text });
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    scrollToEnd();

    setSending(true);
    try {
      const { reply } = await sendCompanionMessage(nextHistory);
      const assistantMessage = await addCompanionMessage({ role: 'assistant', content: reply });
      setMessages((prev) => [...prev, assistantMessage]);
      scrollToEnd();
    } catch (err) {
      const message = err instanceof CompanionError ? err.message : 'Something went wrong.';
      setErrorText(message);
    } finally {
      setSending(false);
    }
  }

  function handleClose() {
    const hasConversation = messages.some((m) => m.role === 'user');
    if (hasConversation) {
      setWrappingUp(true);
    } else {
      router.back();
    }
  }

  function confirmClear() {
    Alert.alert('Clear conversation', 'This will delete your Companion chat history.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearCompanionMessages();
          const greeting = await addCompanionMessage({ role: 'assistant', content: GREETING });
          setMessages([greeting]);
        },
      },
    ]);
  }

  if (wrappingUp) {
    return (
      <View style={{ flex: 1 }}>
        <GradientBackground variant="calm" />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
          <View style={[styles.header, { paddingTop: headerTopPadding }]}>
            <Button label="Back to chat" variant="ghostLight" onPress={() => setWrappingUp(false)} />
            <Text style={styles.headerTitle}>Take care</Text>
            <View style={{ width: 1 }} />
          </View>
          <ScrollView contentContainerStyle={styles.wrapUpContent}>
            <Text style={styles.wrapUpHeading}>Thanks for chatting</Text>
            <Text style={styles.wrapUpBody}>
              Here are a few things that might help right now, on top of just talking.
            </Text>
            <View style={{ marginTop: spacing.lg }}>
              <RecommendationList recommendations={GENERAL_RECOMMENDATIONS} />
            </View>
            <Button
              label="I'm done for now"
              variant="ghostLight"
              onPress={() => router.back()}
              style={{ marginTop: spacing.lg, alignSelf: 'center' }}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground variant="calm" />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <View style={[styles.header, { paddingTop: headerTopPadding }]}>
            <Button label="Close" variant="ghostLight" onPress={handleClose} />
            <Text style={styles.headerTitle}>Companion</Text>
            <Button label="Clear" variant="ghostLight" onPress={confirmClear} />
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              AI companion, not a real person or therapist. In a crisis? See the Resources tab.
            </Text>
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.messages}
            onContentSizeChange={scrollToEnd}
          >
            {messages.map((m) => (
              <FadeInView
                key={m.id}
                direction={m.role === 'user' ? 'right' : 'left'}
                style={[
                  styles.bubble,
                  m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                ]}
              >
                <Text style={m.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
                  {m.content}
                </Text>
              </FadeInView>
            ))}
            {sending && (
              <FadeInView style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
                <ActivityIndicator size="small" color={colors.indigoDeep} />
              </FadeInView>
            )}
            {errorText && (
              <FadeInView style={[styles.bubble, styles.bubbleError]}>
                <Text style={styles.bubbleTextError}>{errorText}</Text>
              </FadeInView>
            )}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.textMuted}
              value={input}
              onChangeText={setInput}
              multiline
              editable={!sending}
            />
            <Button label="Send" onPress={send} style={styles.sendButton} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: FONT_BOLD,
    color: colors.textOnDark,
  },
  disclaimer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    padding: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  disclaimerText: {
    fontSize: 12,
    fontFamily: FONT_REGULAR,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  wrapUpContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  wrapUpHeading: {
    ...typography.title,
    color: colors.textOnDark,
  },
  wrapUpBody: {
    marginTop: spacing.sm,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.85)',
  },
  messages: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  bubble: {
    maxWidth: '85%',
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  bubbleUser: {
    backgroundColor: colors.indigoDeep,
    alignSelf: 'flex-end',
    borderBottomRightRadius: radii.sm,
  },
  bubbleAssistant: {
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: radii.sm,
  },
  bubbleError: {
    backgroundColor: colors.danger,
    alignSelf: 'center',
  },
  typingBubble: {
    paddingVertical: spacing.sm,
  },
  bubbleTextUser: {
    color: colors.textOnDark,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    lineHeight: 21,
  },
  bubbleTextAssistant: {
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    lineHeight: 21,
  },
  bubbleTextError: {
    color: colors.textOnDark,
    fontSize: 13,
    fontFamily: FONT_REGULAR,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    fontFamily: FONT_REGULAR,
    color: colors.textPrimary,
  },
  sendButton: {
    paddingHorizontal: spacing.lg,
  },
});
