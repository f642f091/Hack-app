import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CommunityScreen = () => {
  const router = useRouter();

  // boxes with routes on Community tab
  const topics = [
    { name: 'Diet Tips', route: '/diet-tips', color: '#4ade80' },
    { name: 'Newly Diagnosed', route: '/newly-diagnosed', color: '#38bdf8' },
    { name: 'Coping Strategies', route: '/coping-strategies', color: '#facc15' },
    { name: 'Medication Talk', route: '/medication-discussion', color: '#f472b6' },
    { name: 'Nearby Restaurants', route: '/Restaurants', color: '#a78bfa' },
    { name: 'Nearby Hospitals', route: '/Hospitals', color: '#ef4444' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>
      <View style={styles.grid}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.name}
            style={[styles.box, { backgroundColor: topic.color }]}
            onPress={() => router.push(topic.route)}
          >
            <Text style={styles.boxText}>{topic.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1629',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 20,
    justifyContent: 'space-between',
    rowGap: 20,
  },
  box: {
    width: '43%',
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommunityScreen;
