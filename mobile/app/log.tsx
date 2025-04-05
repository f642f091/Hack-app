import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function LogScreen() {
  const [pain, setPain] = useState(5);
  const [nausea, setNausea] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.16.58.176:8000/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pain, nausea, notes }),
      });

      const data = await response.json();
      console.log("✅ Log submitted:", data);

      // Optional: clear notes or show a confirmation
      setNotes('');
    } catch (err) {
      console.error("❌ Failed to submit log:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Today's Symptoms</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Abdominal Pain 😣</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={pain}
            onValueChange={setPain}
          />
          <Text style={styles.sliderValue}>{pain}</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Nausea 🤢</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={nausea}
            onValueChange={setNausea}
          />
          <Text style={styles.sliderValue}>{nausea}</Text>
        </View>
      </View>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Any observations today?"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    marginTop: 15,
  },
  label: {
    color: '#cbd5e1',
    marginBottom: 5,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    color: '#f8fafc',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 10,
    padding: 10,
    color: '#f1f5f9',
    marginTop: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
