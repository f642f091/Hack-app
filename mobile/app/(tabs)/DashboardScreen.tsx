import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const DashboardScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.104.238.249:8000/summary')
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

  const symptomKeys = [
    'pain',
    'nausea',
    'fatigue',
    'diarrhea',
    'appetite_loss',
    'weight_change',
    'blood_in_stool',
    'stress_level',
  ];

  const symptomSums = symptomKeys.reduce((acc, key) => {
    acc[key] = logs.reduce((sum, log) => sum + (log[key] || 0), 0);
    return acc;
  }, {});

  const mostSevereKey = symptomKeys.reduce((maxKey, key) =>
    symptomSums[key] > symptomSums[maxKey] ? key : maxKey
  , symptomKeys[0]);

  let mascotImage = require('../../assets/images/gut_sad.png');
  let mascotMessage = "I'm not feeling great... let's log some symptoms!";

  if (totalLogs >= 6) {
    mascotImage = require('../../assets/images/gut_zen.png');
    mascotMessage = "You've achieved gut peace 🧘 Keep up the amazing work!";
  } else if (totalLogs >= 4) {
    mascotImage = require('../../assets/images/gut_happy.png');
    mascotMessage = "You're doing great! Just a few more logs for full zen 🙌";
  } else if (totalLogs >= 2) {
    mascotImage = require('../../assets/images/gut_neutral.png');
    mascotMessage = "We're getting there—keep logging to improve your gut health!";
  }

  const shouldSeeDoctor = avgPain >= 7;

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {shouldSeeDoctor && (
          <View style={styles.alertBoxDoctor}>
            <Text style={styles.alertText}>Consider seeing a doctor based on your recent symptoms.</Text>
          </View>
        )}

        <Text style={styles.subtitle}>Most Severe Symptom</Text>
        <Text style={styles.alertText}>{symptomSums[mostSevereKey] > 0 ? `${mostSevereKey.replace('_', ' ')} — total: ${symptomSums[mostSevereKey]}` : 'No symptom sliders logged yet'}</Text>

        <Text style={styles.subtitle}>Weekly Symptom Trends</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={{ color: '#94a3b8' }}>📊 [Chart Placeholder]</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0e1629' },
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 16 },
  mascot: { width: 180, height: 180, alignSelf: 'center', marginBottom: 8 },
  mascotMessage: { color: '#cbd5e1', textAlign: 'center', fontSize: 16, marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, flex: 0.48 },
  label: { color: '#94a3b8', fontSize: 14 },
  value: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  subtitle: { marginTop: 24, marginBottom: 8, color: 'white', fontSize: 18 },
  alertBoxDoctor: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  alertText: { color: 'white', fontSize: 14 },
  chartPlaceholder: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
  },
});

export default DashboardScreen;
