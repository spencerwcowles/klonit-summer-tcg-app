import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useListingDetail } from '../../hooks/queries/useListings';
import { colors } from '../../theme/colors';
import { mapAPIListingDetailToAIAssistant } from '../../utils/mappers';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const assistantId = id ? Number.parseInt(id, 10) : null;

  // Fetch assistant details
  const { data: apiListing } = useListingDetail(assistantId);
  const assistant = apiListing ? mapAPIListingDetailToAIAssistant(apiListing) : null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

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

    // Simulate mock search results and assistant response
    setTimeout(() => {
      // Mock search results
      const mockSearchResults: SearchResult[] = [
        {
          id: '1',
          title: 'Example Search Result 1',
          snippet: 'This is a mock search result snippet that provides relevant information...',
          url: 'https://example.com',
        },
        {
          id: '2',
          title: 'Example Search Result 2',
          snippet: 'Another mock search result with helpful context and information...',
          url: 'https://example2.com',
        },
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Hello! I'm ${assistant?.name || 'your AI assistant'}. I found some relevant information about "${userMessage.text}". Based on the search results above, here's what I can tell you...`,
        isUser: false,
        timestamp: new Date(),
      };

      setSearchResults(mockSearchResults);
      setShowSearchResults(true);
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  }, [inputText, assistant?.name]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.assistantMessage]}>
      <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.messageText, item.isUser ? styles.userText : styles.assistantText]}>{item.text}</Text>
      </View>
    </View>
  );

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <View style={styles.searchResultCard}>
      <Text style={styles.searchResultTitle}>{item.title}</Text>
      <Text style={styles.searchResultSnippet}>{item.snippet}</Text>
      <Text style={styles.searchResultUrl}>{item.url}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{assistant?.name || 'AI Assistant Chat'}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Google Search Results Section */}
      {showSearchResults && (
        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.searchHeader} onPress={() => setShowSearchResults(!showSearchResults)}>
            <Ionicons name="search-outline" size={20} color={colors.purple} />
            <Text style={styles.searchHeaderText}>Search Results</Text>
            <Ionicons name={showSearchResults ? 'chevron-up' : 'chevron-down'} size={20} color={colors.purple} />
          </TouchableOpacity>

          {showSearchResults && (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.searchResultsList}
            />
          )}
        </View>
      )}

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
              <Text style={styles.emptySubtitle}>Ask me anything and I'll help you with search results!</Text>
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
  searchSection: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  searchResultsList: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchResultCard: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    width: 280,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  searchResultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.purple,
    marginBottom: 4,
  },
  searchResultSnippet: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 16,
    marginBottom: 6,
  },
  searchResultUrl: {
    fontSize: 11,
    color: colors.grayMedium,
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
