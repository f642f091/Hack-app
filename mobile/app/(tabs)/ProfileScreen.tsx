import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refresh logs every time the screen is focused
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

  const totalLogs = logs.length;
  const avgPain =
    logs.reduce((sum, log) => sum + (log.pain || 0), 0) / (totalLogs || 1);

  const generateHtml = () => {
    const rows = logs
      .map(
        (log, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${log.pain}</td>
        <td>${log.nausea}</td>
        <td>${log.fatigue}</td>
        <td>${log.diarrhea}</td>
        <td>${log.notes}</td>
      </tr>`
      )
      .join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f3f4f6; }
          </style>
        </head>
        <body>
          <h1>Weekly Symptom Report</h1>
          <p>Total Logs: ${totalLogs}</p>
          <p>Average Pain: ${avgPain.toFixed(1)}</p>
          <table>
            <tr>
              <th>#</th><th>Pain</th><th>Nausea</th><th>Fatigue</th><th>Diarrhea</th><th>Notes</th>
            </tr>
            ${rows}
          </table>
        </body>
      </html>
    `;
  };

  const handleExport = async () => {
    try {
      const html = generateHtml();
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to export PDF.');
      console.error(error);
    }
  };

  const handlePreview = async () => {
    try {
      const html = generateHtml();
      await Print.printAsync({ html });
    } catch (error) {
      console.warn('Preview failed:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/gut_happy.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@gutfeeling</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{logs.length}</Text>
          <Text style={styles.statLabel}>Entries Made</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>Pain</Text>
          <Text style={styles.statLabel}>Worst Symptom</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{avgPain.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Avg. Symptom Score</Text>
        </View>
      </View>

      <View style={styles.bioBox}>
        <Text style={styles.bioText}>
          "I’ve been tracking my symptoms for 3 weeks now and I feel more in
          control of my condition every day."
        </Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <Button
          title="📄 Preview PDF Report"
          onPress={handlePreview}
          color="#3b82f6"
        />
        <View style={{ height: 12 }} />
        <Button
          title="📁 Export PDF Report"
          onPress={handleExport}
          color="#22c55e"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0e1629',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#94a3b8',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 18,
    color: '#22c55e',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  bioBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b',
  },
  bioText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default ProfileScreen;
