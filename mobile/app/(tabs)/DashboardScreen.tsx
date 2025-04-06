import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
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
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const totalLogs = logs.length;
  const avgPain = logs.reduce((sum, log) => sum + (log.pain || 0), 0) / (totalLogs || 1);

  const allSymptomKeys = [
    'pain',
    'nausea',
    'fatigue',
    'diarrhea',
    'appetite_loss',
    'weight_change',
    'blood_in_stool',
    'stress_level',
  ];

  const symptomSums: Record<string, number> = {};
  const symptomKeys = allSymptomKeys.filter((key) => {
    const total = logs.reduce((sum, log) => sum + (log[key] || 0), 0);
    symptomSums[key] = total;
    return total > 0;
  });

  const mostSevereKey = symptomKeys.reduce((maxKey, key) =>
    symptomSums[key] > symptomSums[maxKey] ? key : maxKey,
    symptomKeys[0]
  );

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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
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
            <Text style={styles.alertText}>
              Consider seeing a doctor based on your recent symptoms.
            </Text>
          </View>
        )}

        <Text style={styles.subtitle}>Most Severe Symptom</Text>
        <Text style={styles.alertText}>
          {symptomSums[mostSevereKey] > 0
            ? `${mostSevereKey.replace('_', ' ')} — total: ${symptomSums[mostSevereKey]}`
            : 'No symptom sliders logged yet'}
        </Text>

        <Text style={styles.subtitle}>Weekly Symptom Trends</Text>
        {symptomKeys.map((key) => (
          <View key={key}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={() => setExpanded(expanded === key ? null : key)}
            >
              <Text style={styles.dropdownText}>{key.replace('_', ' ')}</Text>
              <Ionicons
                name={expanded === key ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
            {expanded === key && (
              <View style={styles.chartBox}>
                <BarChart
                  style={{ height: 150 }}
                  data={logs.map((log) => log[key])}
                  svg={{ fill: '#60a5fa' }}
                  spacingInner={0.3}
                  contentInset={{ top: 10, bottom: 10 }}
                  curve={shape.curveLinear}
                >
                  <Grid />
                </BarChart>
              </View>
            )}
          </View>
        ))}
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    flex: 0.48,
  },
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
  chartBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    height: 200,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  dropdownText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DashboardScreen;
