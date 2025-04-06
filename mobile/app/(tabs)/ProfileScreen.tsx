import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/gut_happy.png')} // 👈 Your mascot avatar
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@gutfeeling</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Entries Made</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>Pain</Text>
          <Text style={styles.statLabel}>Worst Symptom</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.3</Text>
          <Text style={styles.statLabel}>Avg. Symptom Score</Text>
        </View>
      </View>

      <View style={styles.bioBox}>
        <Text style={styles.bioText}>
          "I’ve been tracking my symptoms for 3 weeks now and I feel more in control of my condition every day."
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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