import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';

/**
 * ChatScreen – marketplace-style DM between user and an assistant/vendor.
 * - No external libs, just RN primitives + Ionicons
 * - Mobile-first; works on iOS/Android. RN Web should also work.
 * - Plug real data by replacing MOCK_MESSAGES and hooking send/receive to your backend/socket.
 *
 * Navigation: navigate('Chat', { assistant }) from the marketplace list
 *   navigation.navigate('Chat', { assistant: item })
 */

export type Message = {
  id: string;
  from: 'me' | 'them';
  text?: string;
  time: number; // Date.now()
  image?: string; // optional image URL
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  dayLabel?: string; // e.g., 'Today'
};

const MOCK_MESSAGES: Message[] = [
  { id: 'd1', from: 'them', time: Date.now() - 1000 * 60 * 60 * 24, dayLabel: 'Yesterday' },
  { id: '1', from: 'them', text: 'Hey! Are we still good for the gig?', time: Date.now() - 1000 * 60 * 60 * 23.5 },
  { id: '2', from: 'me', text: 'Yep—can you share availability?', time: Date.now() - 1000 * 60 * 60 * 23.4, status: 'delivered' },
  { id: 'd2', from: 'them', time: Date.now() - 1000 * 60 * 60 * 1.2, dayLabel: 'Today' },
  { id: '3', from: 'me', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop', time: Date.now() - 1000 * 60 * 60 * 1.1, status: 'read' },
  { id: '4', from: 'me', text: 'Here’s a mock layout.', time: Date.now() - 1000 * 60 * 60 * 1.1, status: 'read' },
  { id: '5', from: 'them', text: 'Looks great!', time: Date.now() - 1000 * 60 * 60 * 1.05 },
];

export default function ChatScreen({ route, navigation }: any) {
  const assistant = route?.params?.assistant; // { id, name, avatar, category? }
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  // Header (assistant identity)
  useEffect(() => {
    navigation?.setOptions?.({ headerShown: false });
  }, [navigation]);

  const onSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setSending(true);
    const now = Date.now();
    const optimistic: Message = {
      id: String(now),
      from: 'me',
      text: trimmed,
      time: now,
      status: 'sending',
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');

    // Simulate server roundtrip
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? { ...m, status: 'sent' } : m))
      );
      setSending(false);

      // Simulate reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            from: 'them',
            text: 'Awesome—got it! 👍',
            time: Date.now(),
          },
        ]);
      }, 900);
    }, 600);
  }, [input]);

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    if (item.dayLabel) {
      return (
        <View style={styles.dayRow}>
          <View style={styles.dayRule} />
          <Text style={styles.dayBadge}>{item.dayLabel}</Text>
          <View style={styles.dayRule} />
        </View>
      );
    }

    const isMe = item.from === 'me';
    const bubbleStyle = [styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem];

    return (
      <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
        <View style={[styles.bubbleWrap, isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
          {item.image && (
            <View style={[styles.imageWrap, isMe ? styles.meRadius : styles.themRadius]}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          )}

          {item.text ? (
            <View style={[...bubbleStyle, isMe ? styles.meRadius : styles.themRadius]}>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ) : null}

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formatTime(item.time)}</Text>
            {isMe && item.status && <Text style={styles.metaText}> • {item.status}</Text>}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.headerIdentity}>
          <Image
            source={{ uri: assistant?.avatar || 'https://i.pravatar.cc/100?img=13' }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>{assistant?.name || 'Alex Rivera'}</Text>
            <Text style={styles.headerSub}>Online • {assistant?.category || 'Assistant'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Ionicons name="ellipsis-vertical" size={18} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {}}
      />

      {/* Composer */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.composerWrap}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="image-outline" size={22} color={colors.black} />
          </TouchableOpacity>

          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message…"
            placeholderTextColor={colors.black}
            style={styles.input}
            multiline
            onSubmitEditing={onSend}
            blurOnSubmit={false}
          />

          <TouchableOpacity style={[styles.sendBtn, !input.trim() && { opacity: 0.6 }]} onPress={onSend} disabled={!input.trim() || sending}>
            <Ionicons name="send" size={18} color={colors.white} />
            <Text style={styles.sendLabel}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const RADIUS = 16;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  headerIconBtn: { padding: 6, borderRadius: 10 },
  headerIdentity: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { height: 36, width: 36, borderRadius: 12, marginRight: 6 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: colors.black },
  headerSub: { fontSize: 12, color: colors.black },

  listContent: { paddingVertical: 8 },
  row: { paddingHorizontal: 12, marginVertical: 6, flexDirection: 'row' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubbleWrap: { maxWidth: '78%' },
  bubble: { paddingHorizontal: 12, paddingVertical: 10 },
  bubbleMe: { backgroundColor: colors.purple },
  bubbleThem: { backgroundColor: colors.grayLight },
  meRadius: { borderTopLeftRadius: RADIUS, borderTopRightRadius: RADIUS, borderBottomLeftRadius: RADIUS, borderBottomRightRadius: 6 },
  themRadius: { borderTopLeftRadius: RADIUS, borderTopRightRadius: RADIUS, borderBottomLeftRadius: 6, borderBottomRightRadius: RADIUS },
  text: { color: colors.white, fontSize: 16, lineHeight: 20 },
  metaRow: { flexDirection: 'row', gap: 4, marginTop: 4 },
  metaText: { fontSize: 11, color: colors.black },

  imageWrap: { overflow: 'hidden', borderWidth: 1, borderColor: colors.grayLight },
  image: { width: 260, height: 180, resizeMode: 'cover' },

  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, marginVertical: 8 },
  dayRule: { flex: 1, height: 1, backgroundColor: colors.grayLight },
  dayBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.white, color: colors.black, fontSize: 12 },

  composerWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  iconBtn: { padding: 8, borderRadius: 10 },
  input: { flex: 1, minHeight: 40, maxHeight: 140, paddingTop: 10, paddingBottom: 10, fontSize: 16, color: colors.black },
  sendBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.purple, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  sendLabel: { color: colors.white, fontWeight: '600', fontSize: 14 },
});
