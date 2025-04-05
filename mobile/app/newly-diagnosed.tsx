import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

const initialMessages = [
  { id: '1', name: 'Emily R.', initials: 'ER', message: "Just got diagnosed... overwhelmed. Where do I even start?" },
  { id: '2', name: 'Carlos M.', initials: 'CM', message: "Welcome, Emily! Take a deep breath. Start by tracking symptoms." },
  { id: '3', name: 'Nina T.', initials: 'NT', message: "Finding a good GI specialist changed everything for me." },
];

export default function NewlyDiagnosed() {
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
    setMessages([...messages, newMessage]);
    setInput('');
    setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageRow}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{item.initials}</Text></View>
      <View style={styles.messageBubble}>
        <Text style={styles.senderName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>🩺 Newly Diagnosed</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write something..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e1629', paddingTop: 48 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', paddingHorizontal: 16, marginBottom: 12 },
  messagesContainer: { padding: 16, paddingBottom: 100 },
  messageRow: { flexDirection: 'row', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#22c55e', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: 'white', fontWeight: 'bold' },
  messageBubble: { backgroundColor: '#1e293b', borderRadius: 10, padding: 10, flex: 1 },
  senderName: { color: '#94a3b8', fontSize: 13, marginBottom: 2 },
  messageText: { color: 'white', fontSize: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#1e293b' },
  input: { flex: 1, color: 'white', padding: 10, borderColor: '#334155', borderWidth: 1, borderRadius: 8, marginRight: 10 },
  sendButton: { backgroundColor: '#22c55e', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  sendButtonText: { color: 'white', fontWeight: 'bold' },
});