import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to IBD Tracker</Text>
      <Button
        title="Log Today’s Symptoms"
        onPress={() => router.push('/log')}
        color="#22c55e"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e1629' },
  title: { fontSize: 24, color: 'white', marginBottom: 20 },
});
