import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function LogScreen() {
  const [pain, setPain] = useState(5);
  const [nausea, setNausea] = useState(3);
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Today's Symptoms</Text>

      <Text style={styles.label}>Abdominal Pain 😣</Text>
      <Slider minimumValue={0} maximumValue={10} value={pain} onValueChange={setPain} step={1} />

      <Text style={styles.label}>Nausea 🤢</Text>
      <Slider minimumValue={0} maximumValue={10} value={nausea} onValueChange={setNausea} step={1} />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Any observations today?"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={() => console.log({ pain, nausea, notes })}>
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
  label: {
    color: '#cbd5e1',
    marginTop: 15,
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
