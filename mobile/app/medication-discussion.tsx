import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

// hard come user comments
const initialMessages = [
  { id: '1', name: 'Alice K.', initials: 'AK', message: 'Anyone here on biologics? How are the side effects?' },
  { id: '2', name: 'David P.', initials: 'DP', message: "I started Stelara 3 months ago and it's helped a lot." },
  { id: '3', name: 'Priya S.', initials: 'PS', message: 'Immunosuppressants made me tired, but pain is way less now.' },
];

export default function MedicationDiscussion() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: String(messages.length + 1),
      name: 'You',
      initials: 'Y',
      message: input.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
    );
    return () => showSub.remove();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.messageRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>
      <View style={styles.messageBubble}>
        <Text style={styles.senderName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.title}>💊 Medication Discussion</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          keyboardShouldPersistTaps="handled"
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write something..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e1629', paddingTop: 48 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', paddingHorizontal: 16, marginBottom: 12 },
  messagesContainer: { padding: 16, paddingBottom: 100 },
  messageRow: { flexDirection: 'row', marginBottom: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#22c55e', justifyContent: 'center', alignItems: 'center',
    marginRight: 12
  },
  avatarText: { color: 'white', fontWeight: 'bold' },
  messageBubble: { backgroundColor: '#1e293b', borderRadius: 10, padding: 10, flex: 1 },
  senderName: { color: '#94a3b8', fontSize: 13, marginBottom: 2 },
  messageText: { color: 'white', fontSize: 15 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, backgroundColor: '#1e293b'
  },
  input: {
    flex: 1, color: 'white', padding: 10,
    borderColor: '#334155', borderWidth: 1, borderRadius: 8, marginRight: 10
  },
  sendButton: { backgroundColor: '#22c55e', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  sendButtonText: { color: 'white', fontWeight: 'bold' },
});
