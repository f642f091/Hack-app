import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IBD Companion</Text>
      <Text style={styles.subtitle}>Track symptoms, get insights, and take control.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/log')}>
        <Text style={styles.buttonText}>Log Symptoms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/dashboard')}>
        <Text style={styles.secondaryButtonText}>View Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#f8fafc',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderColor: '#64748b',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 15,
  },
});
