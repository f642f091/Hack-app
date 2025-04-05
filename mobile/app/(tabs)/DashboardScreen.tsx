import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const DashboardScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://172.16.58.176:8000/summary')
      .then((response) => response.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const totalLogs = logs.length;
  const avgPain =
    logs.reduce((sum, log) => sum + (log.pain || 0), 0) / (totalLogs || 1);

  const recentSymptoms = {};
  logs.forEach((log) => {
    if (log.notes) {
      const note = log.notes.trim();
      recentSymptoms[note] = (recentSymptoms[note] || 0) + 1;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

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

      <Text style={styles.subtitle}>Recent Symptoms</Text>
      {Object.entries(recentSymptoms).map(([symptom, count]) => {
        const pretty = symptom.charAt(0).toUpperCase() + symptom.slice(1);
        const emoji = symptom.toLowerCase().includes('good') ||
          symptom.toLowerCase().includes('great')
          ? '🟢'
          : symptom.toLowerCase().includes('bad') ||
            symptom.toLowerCase().includes('pain')
          ? '🔴'
          : '🟡';

        return (
          <View key={symptom} style={styles.symptomRow}>
            <Text style={{ color: 'white' }}>
              {emoji} {pretty} — {count}
            </Text>
          </View>
        );
      })}

      <Text style={styles.subtitle}>Weekly Symptom Trends</Text>
      <View style={styles.chartBox}>
        <BarChart
          style={{ height: 150 }}
          data={logs.map((log) => log.pain)}
          svg={{ fill: '#60a5fa' }}
          spacingInner={0.3}
          contentInset={{ top: 10, bottom: 10 }}
          curve={shape.curveLinear}
        >
          <Grid />
        </BarChart>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0e1629' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    flex: 0.48,
  },
  label: { color: '#94a3b8', fontSize: 14 },
  value: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  subtitle: { marginTop: 24, marginBottom: 8, color: 'white', fontSize: 18 },
  symptomRow: {
    paddingVertical: 6,
    borderBottomColor: '#334155',
    borderBottomWidth: 1,
  },
  chartBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    height: 200,
  },
});

export default DashboardScreen;
