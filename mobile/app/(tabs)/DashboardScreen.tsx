import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';

const DashboardScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.104.238.249:8000/summary') // 👈 Update with current IP
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching summary:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const totalLogs = logs.length;
  const avgPain = logs.reduce((sum, log) => sum + (log.pain || 0), 0) / (totalLogs || 1);

  const symptomTotals = {
    pain: 0,
    nausea: 0,
    fatigue: 0,
    diarrhea: 0,
    appetite_loss: 0,
    weight_change: 0,
    blood_in_stool: 0,
    stress_level: 0,
  };

  logs.forEach((log) => {
    Object.keys(symptomTotals).forEach((key) => {
      symptomTotals[key] += log[key] || 0;
    });
  });

  const mostSevereSymptom = Object.entries(symptomTotals).reduce(
    (max, [symptom, total]) => total > max.value ? { key: symptom, value: total } : max,
    { key: '', value: -1 }
  );

  // Choose mascot image based on usage
  let mascotImage = require('../../assets/images/gut_sad.png');
  let mascotMessage = "I'm not feeling great... let's log some symptoms!";

  if (totalLogs >= 10) {
    mascotImage = require('../../assets/images/gut_zen.png');
    mascotMessage = "You've achieved gut peace 🧘 Keep up the amazing work!";
  } else if (totalLogs >= 7) {
    mascotImage = require('../../assets/images/gut_happy.png');
    mascotMessage = "You're doing great! Just a few more logs for full zen 🙌";
  } else if (totalLogs >= 4) {
    mascotImage = require('../../assets/images/gut_neutral.png');
    mascotMessage = "We're getting there—keep logging to improve your gut health!";
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Image source={mascotImage} style={styles.mascot} />
      <Text style={styles.mascotMessage}>{mascotMessage}</Text>

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

      <Text style={styles.subtitle}>Most Severe Symptom</Text>
      {mostSevereSymptom.value > 0 ? (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            😟 <Text style={{ fontWeight: 'bold' }}>{mostSevereSymptom.key.replace(/_/g, ' ')}</Text> had the highest severity — total score: {mostSevereSymptom.value}
          </Text>
          <Text style={styles.tipText}>💡 Consider monitoring or consulting your doctor if this persists.</Text>
        </View>
      ) : (
        <Text style={styles.tipText}>No symptom sliders logged yet</Text>
      )}

      <Text style={styles.subtitle}>Weekly Symptom Trends</Text>
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
  mascot: { width: 180, height: 180, alignSelf: 'center', marginBottom: 8 },
  mascotMessage: { color: '#cbd5e1', textAlign: 'center', fontSize: 16, marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, flex: 0.48 },
  label: { color: '#94a3b8', fontSize: 14 },
  value: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  subtitle: { marginTop: 24, marginBottom: 8, color: 'white', fontSize: 18 },
  tipBox: {
    backgroundColor: '#0f172a',
    borderLeftColor: '#22c55e',
    borderLeftWidth: 5,
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  tipText: { color: '#e2e8f0', fontSize: 14, marginBottom: 4 },
  chartPlaceholder: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },
});

export default DashboardScreen;
