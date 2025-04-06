
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MedicationTracker() {
  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDates((prev) => ({
      ...prev,
      [date]: prev[date]
        ? undefined // Unmark if already selected
        : { selected: true, selectedColor: '#22c55e' },
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 Medication Tracker</Text>
      <Text style={styles.subtitle}>Tap on the days you took your medication.</Text>

      <Calendar
        theme={{
          backgroundColor: '#0e1629',
          calendarBackground: '#0e1629',
          textSectionTitleColor: '#94a3b8',
          dayTextColor: 'white',
          todayTextColor: '#3b82f6',
          monthTextColor: 'white',
          arrowColor: '#22c55e',
          selectedDayBackgroundColor: '#22c55e',
        }}
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        hideExtraDays={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1629',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
  },
});
