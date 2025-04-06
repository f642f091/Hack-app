import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🩺 Welcome to</Text>
      <Text style={styles.appName}>IBD Tracker</Text>
      <Text style={styles.subtitle}>
        Track your symptoms, monitor trends, and take control of your health.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/log')}>
        <Text style={styles.buttonText}>+ Log Today’s Symptoms</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('DashboardScreen')}
      >
        <Text style={styles.buttonText}>📊 View Dashboard</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/medication-tracker')}
      >
        <Text style={styles.buttonText}>💊 Track Medication</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1629',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    color: '#94a3b8',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 12,
  },
  subtitle: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 36,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
