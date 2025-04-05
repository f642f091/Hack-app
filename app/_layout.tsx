import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const DashboardScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Detect if screen is focused

  const fetchLogs = () => {
    setLoading(true);
    fetch('http://172.16.58.176:8000/summary') // 👈 Replace with your backend IP if needed
      .then((response) => response.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchLogs(); // Refresh data when screen is focused
    }
  }, [isFocused]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const totalLogs = logs.length;
  const avgPain = logs.reduce((sum, log) => sum + (log.pain || 0), 0) / (totalLogs || 1);

  const recentSymptoms = {};
  logs.forEach((log) => {
    if (log.notes) {
      const note = log.notes.trim();
      recentSymptoms[note] = (recentSymptoms[note] || 0) + 1;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Dashboard</Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.label}>Days Logged</Text>
          <Text style={styles.value}>{totalLogs}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Avg. Pain</Text>
          <Text style={styles.value}>{avgPain.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>📝 Recent Notes</Text>
      {Object.entries(recentSymptoms).map(([note, count]) => (
        <View key={note} style={styles.symptomRow}>
          <Text style={styles.symptomText}>
            "{note}" — <Text style={{ color: '#38bdf8' }}>{count}</Text>
          </Text>
        </View>
      ))}

      <Text style={styles.subtitle}>📈 Weekly Symptom Trends</Text>
      <View style={styles.chartPlaceholder}>
        <Text style={{ color: '#94a3b8' }}>📊 [Chart Placeholder]</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0e1629' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, flex: 0.48 },
  label: { color: '#94a3b8', fontSize: 14 },
  value: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  subtitle: { marginTop: 24, marginBottom: 8, color: 'white', fontSize: 18 },
  symptomRow: {
    paddingVertical: 6,
    borderBottomColor: '#334155',
    borderBottomWidth: 1,
  },
  symptomText: { color: 'white', fontSize: 16 },
  chartPlaceholder: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },
});

export default DashboardScreen;
