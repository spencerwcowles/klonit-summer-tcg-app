import { Redirect } from 'expo-router';
import { View, Text, Button } from 'react-native';
// import { router } from 'expo-router';



export default function RootIndex() {
  return <Redirect href="/(tabs)/marketplace" />;
}

// export default function Home() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
//       <Text>✅ Router + Layout sanity screen</Text>
//       <Button title="Go to chat/123" onPress={() => router.push('/chat/123')} />
//     </View>
//   );
// }