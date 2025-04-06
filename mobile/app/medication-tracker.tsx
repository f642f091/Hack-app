import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MedicationTracker() {
  const [markedDates, setMarkedDates] = useState({});

  const toggleDayMark = (day) => { // taken the medicine on this day
    const newMarked = { ...markedDates };
    if (newMarked[day.dateString]) {
      delete newMarked[day.dateString];
    } else {
      newMarked[day.dateString] = {
        marked: true,
        dotColor: '#22c55e',
        customStyles: {
          container: {
            backgroundColor: '#22c55e',
            borderRadius: 6,
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      };
    }
    setMarkedDates(newMarked);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💊 Medication Tracker</Text>
      <Text style={styles.subtitle}>Tap on the days you took your medication.</Text>
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
        onDayPress={toggleDayMark}
        theme={{
          backgroundColor: '#0e1629',
          calendarBackground: '#0e1629',
          dayTextColor: '#cbd5e1',
          monthTextColor: 'white',
          arrowColor: '#22c55e',
          selectedDayBackgroundColor: '#22c55e',
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1629',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 16,
  },
});
