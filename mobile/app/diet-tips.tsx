import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';

export default function DietTipsScreen() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Alyssa P.', text: 'Probiotics and yogurt really help me stay regular.', time: '8 days ago' },
    { id: 2, name: 'Danny', text: 'Cutting dairy made a huge difference for me.', time: '6 days ago' },
    { id: 3, name: 'Mina J.', text: 'I eat small meals every 3 hours and it helps a ton.', time: '2 days ago' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: 'You',
      text: newMessage,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newEntry]);
    setNewMessage('');
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diet Tips</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {msg.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageName}>{msg.name}</Text>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a post..."
          placeholderTextColor="#ccc"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1629',
    flex: 1,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 12,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#38bdf8',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    color: '#cbd5e1',
    marginTop: 2,
  },
  messageTime: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});