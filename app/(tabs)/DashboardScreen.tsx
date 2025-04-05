import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Days Logged</Text>
          <Text style={styles.cardValue}>12</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Avg. Pain</Text>
          <Text style={styles.cardValue}>4.3</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Symptoms</Text>
        <View style={styles.symptomRow}>
          <Text style={styles.symptomText}>😣 Abdominal Pain — 6</Text>
          <Text style={styles.symptomTime}>Today</Text>
        </View>
        <View style={styles.symptomRow}>
          <Text style={styles.symptomText}>🤢 Nausea — 3</Text>
          <Text style={styles.symptomTime}>Yesterday</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Symptom Trends</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>📊 [Chart Placeholder]</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#0f172a', paddingHorizontal: 20, paddingTop: 50, flex: 1 },
  heading: { fontSize: 28, color: '#f1f5f9', fontWeight: 'bold', marginBottom: 24 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  card: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, width: '48%' },
  cardLabel: { color: '#94a3b8', fontSize: 14, marginBottom: 6 },
  cardValue: { color: '#f8fafc', fontSize: 24, fontWeight: 'bold' },
  section: { marginBottom: 30 },
  sectionTitle: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  symptomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  symptomText: { color: '#f1f5f9' },
  symptomTime: { color: '#94a3b8' },
  chartPlaceholder: {
    backgroundColor: '#1e293b',
    height: 160,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: { color: '#64748b', fontSize: 16 },
});
