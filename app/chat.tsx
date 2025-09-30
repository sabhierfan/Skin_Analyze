import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

interface Message {
  text: string;
  isUser: boolean;
}

const SYSTEM_PROMPT = "You are a helpful medical assistant. Only answer questions about skin diseases, their symptoms, and possible cures or treatments. If a user asks about anything else, politely say you can only discuss skin diseases and their cures.";

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Removed external API usage for public repo. Using a local mock instead.

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      // Simple offline mock response
      const lower = userMessage.toLowerCase();
      let reply = 'I can help with common skin conditions, symptoms, and treatments.';
      if (lower.includes('acne')) reply = 'Acne: Keep a gentle skincare routine, consider benzoyl peroxide or salicylic acid. See a dermatologist if severe.';
      else if (lower.includes('eczema')) reply = 'Eczema: Moisturize frequently, avoid triggers, and consider topical corticosteroids per doctor guidance.';
      else if (lower.includes('psoriasis')) reply = 'Psoriasis: Phototherapy and topical vitamin D analogs can help. Consult a dermatologist.';
      else if (lower.includes('fungal') || lower.includes('ringworm')) reply = 'Fungal infections: Topical antifungals (e.g., clotrimazole) often help. Keep the area dry.';
      else if (lower.includes('sunburn') || lower.includes('uv')) reply = 'Sunburn: Cool compresses, aloe, hydration, and SPF 30+ daily to prevent further damage.';
      else if (lower.includes('melanoma') || lower.includes('mole')) reply = 'Concerning moles: Use ABCDE (Asymmetry, Border, Color, Diameter, Evolving). Seek medical evaluation.';

      // Simulate latency
      await new Promise(r => setTimeout(r, 400));
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>AI Assistant</Text>
        
        <ScrollView style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.botMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser && styles.userMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#7DB6AC" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about skin conditions..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
            onPress={sendMessage}
            disabled={!inputText.trim() || loading}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f9d5e5' 
  },
  container: {
    flex: 1,
    backgroundColor: '#f9d5e5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d5b56',
    marginBottom: 20,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#14b8a6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  messageText: {
    color: '#0d5b56',
    fontSize: 16,
  },
  userMessageText: {
    color: '#003333',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    color: '#0d5b56',
    maxHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  sendButton: {
    backgroundColor: '#14b8a6',
    borderRadius: 25,
    padding: 15,
    width: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#003333',
    fontWeight: '700',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#e11d48',
    borderRadius: 20,
    padding: 14,
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
}); 