import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';

// hardcode user posts
export default function CopingStrategiesScreen() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Marcel Hernandez', text: 'Working out helps a lot.', time: '9 days ago' },
    { id: 2, name: 'Sasha T.', text: 'Meditation and short walks made a huge difference for me.', time: '6 days ago' },
    { id: 3, name: 'Jen K', text: 'I journal every morning—it’s my anchor.', time: '3 days ago' },
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

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100)
    );
    return () => showSub.remove();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Coping Strategies</Text>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1e293b',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 10,
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
