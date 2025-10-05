import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getPrompt } from '../../services/chatApi'; // adjust if your path differs

export default function ChatById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [q, setQ] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!q.trim()) return;
    setLoading(true); setErr(null); setReply(null);
    try {
      const res = await getPrompt({ prompt: q, chatbot_id: 'DEFAULT', listing_id: id });
      const text = res?.bot_reply ?? null;
      if (!text) throw new Error('No bot_reply in response');
      setReply(text);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ opacity: 0.7 }}>Chat #{id ?? '—'}</Text>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Type your message…"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <Button title={loading ? 'Sending…' : 'Send'} onPress={send} disabled={loading} />
      {reply ? <Text style={{ marginTop: 12 }}>🧠 {reply}</Text> : null}
      {err ? <Text style={{ color: 'red' }}>Error: {err}</Text> : null}
    </View>
  );
}


// // app/chat/[id].tsx
// import { useLocalSearchParams } from 'expo-router';
// import { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import { getPrompt } from '../../services/chatApi';

// // probably undefined at runtime (add safe fallback + visible log)
// const DEFAULT_UUID = process.env.EXPO_PUBLIC_DEFAULT_CHATBOT_UUID!;
// if (!DEFAULT_UUID) {
//   console.warn('Missing EXPO_PUBLIC_DEFAULT_CHATBOT_UUID – using demo fallback');
// }

// // const DEFAULT_UUID = process.env.EXPO_PUBLIC_DEFAULT_CHATBOT_UUID;

// export default function ChatScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>(); // numeric listing id
//   const [q, setQ] = useState('');
//   const [reply, setReply] = useState<string | null>(null);
//   const [err, setErr] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     if (!q.trim()) return;

//     if (!DEFAULT_UUID) {
//       setErr('Missing EXPO_PUBLIC_DEFAULT_CHATBOT_UUID env variable');
//       return;
//     }

//     setLoading(true); setErr(null); setReply(null);
//     try {
//       // TODO: replace DEFAULT_UUID with real mapping when backend exposes it
//       const res = await getPrompt({
//         prompt: q,
//         voice_type: 'FEMALE',
//         chatbot_id: DEFAULT_UUID,
//       });
//       setReply(res.bot_reply);
//       // If you want to play the voice, plug res.ans_voice into your audio util
//     } catch (e: any) {
//       setErr(e.message ?? 'Failed to get reply');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 16, gap: 12 }}>
//       <Text style={{ opacity: 0.7 }}>Chat for listing #{id ?? '(no id)'}</Text>
//       <TextInput
//         value={q}
//         onChangeText={setQ}
//         placeholder="Type your message…"
//         autoCapitalize="none"
//         autoCorrect={false}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       />
//       <Button title={loading ? 'Sending…' : 'Send'} onPress={send} disabled={loading} />
//       {reply && <Text style={{ marginTop: 12 }}>🧠 {reply}</Text>}
//       {err && <Text style={{ color: 'red' }}>{err}</Text>}
//     </View>
//   );
// }
