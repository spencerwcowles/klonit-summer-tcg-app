// app/chat/[id].tsx
// import { useLocalSearchParams } from 'expo-router';
// import { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import { getPrompt } from '../../services/chatApi';

import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getPrompt } from '../../services/chatApi';
import { colors } from '../../theme/colors';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const DEFAULT_UUID = process.env.EXPO_PUBLIC_DEFAULT_CHATBOT_UUID!;

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // numeric listing id
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await getPrompt({
        prompt: userMessage.text,
        voice_type: 'FEMALE',
        chatbot_id: DEFAULT_UUID,
      });
      // If you want to play the voice, plug res.ans_voice into your audio util
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: res.bot_reply,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e: any) {
      setError(e.message ?? 'Failed to get reply');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.assistantMessage]}>
      <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.messageText, item.isUser ? styles.userText : styles.assistantText]}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant Chat</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubble-outline" size={48} color={colors.grayMedium} />
              <Text style={styles.emptyTitle}>Start a conversation</Text>
              <Text style={styles.emptySubtitle}>Ask me anything and I'll help you!</Text>
            </View>
          }
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBubble}>
              <Text style={styles.loadingText}>Assistant is typing...</Text>
            </View>
          </View>
        )}

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything..."
              placeholderTextColor={colors.grayMedium}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? colors.white : colors.grayMedium} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.grayMedium,
    textAlign: 'center',
    lineHeight: 20,
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: colors.purple,
  },
  assistantBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.white,
  },
  assistantText: {
    color: colors.black,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  loadingBubble: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  loadingText: {
    fontSize: 14,
    color: colors.grayMedium,
    fontStyle: 'italic',
  },
  errorContainer: {
    paddingHorizontal: 16,
    marginVertical: 4,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.purple,
  },
  sendButtonInactive: {
    backgroundColor: colors.grayLight,
  },
});
