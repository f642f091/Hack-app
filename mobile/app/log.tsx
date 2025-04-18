import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const LogScreen = () => {
  const [formData, setFormData] = useState({
    pain: 0,
    nausea: 0,
    fatigue: 0,
    diarrhea: 0,
    appetite_loss: 0,
    weight_change: 0,
    blood_in_stool: 0,
    stress_level: 0,
    notes: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.104.238.249:8000/log', { // change line based on wifi connection (IP changes)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      Alert.alert('✅ Log Submitted', `Total logs: ${data.total_logs}`); // succesfull log submission
    } catch (error) {
      Alert.alert('Error', 'Failed to submit log.');
      console.error(error);
    }
  };

  const renderSlider = (label, key) => (
    <View style={styles.sliderContainer} key={key}>
      <Text style={styles.sliderLabel}>
        {label}: <Text style={styles.sliderValue}>{formData[key]}</Text>
      </Text>
      <Slider
        style={{ width: '100%' }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={formData[key]}
        minimumTrackTintColor="#22c55e"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#22c55e"
        onValueChange={(value) => setFormData({ ...formData, [key]: value })}
      />
    </View>
  );

  const symptomSliders = [
    { label: 'Pain', key: 'pain' },
    { label: 'Nausea', key: 'nausea' },
    { label: 'Fatigue', key: 'fatigue' },
    { label: 'Diarrhea', key: 'diarrhea' },
    { label: 'Appetite Loss', key: 'appetite_loss' },
    { label: 'Weight Change', key: 'weight_change' },
    { label: 'Blood in Stool', key: 'blood_in_stool' },
    { label: 'Stress Level', key: 'stress_level' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>📋 Log Symptoms</Text>

        {symptomSliders.map(({ label, key }) => renderSlider(label, key))}

        <Text style={styles.label}>📝 Notes:</Text>
        <View style={styles.notesWrapper}>
          <TextInput
            style={styles.notesInput}
            multiline
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Add notes about your day..."
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity onPress={() => {
            handleSubmit();
            Keyboard.dismiss();
          }}>
            <Ionicons name="send" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0e1629',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 4,
  },
  sliderValue: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
  label: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  notesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  notesInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    maxHeight: 120,
  },
});

export default LogScreen;
