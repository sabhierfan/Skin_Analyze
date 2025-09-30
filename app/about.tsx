import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const diseases = [
  { name: 'Mpox', desc: 'Mpox (Monkeypox) is a viral disease causing fever, rash, and swollen lymph nodes. It can be transmitted from animals to humans.', icon: 'bug' },
  { name: 'Chickenpox', desc: 'Chickenpox is a highly contagious viral infection causing an itchy, blister-like rash on the skin.', icon: 'heartbeat' },
  { name: 'Measles', desc: 'Measles is a highly contagious virus that causes fever, cough, runny nose, and a characteristic rash.', icon: 'medkit' },
  { name: 'Cowpox', desc: 'Cowpox is a rare viral disease transmitted from cattle to humans, causing mild skin lesions.', icon: 'paw' },
  { name: 'HFMD', desc: 'Hand, Foot, and Mouth Disease (HFMD) is a common viral illness in children, causing sores in the mouth and a rash on the hands and feet.', icon: 'hand-paper-o' },
];

export default function AboutDiseases() {
  const handleLearnMore = (disease: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(disease + ' skin disease')}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text style={styles.title}>About Skin Diseases</Text>
        {diseases.map((d, idx) => (
          <TouchableOpacity key={idx} style={styles.diseaseCard} activeOpacity={0.85} onPress={() => handleLearnMore(d.name)}>
            <View style={styles.iconRow}>
              <View style={styles.iconCircle}>
                <FontAwesome name={d.icon as any} size={28} color="#7DB6AC" />
              </View>
              <Text style={styles.diseaseName}>{d.name}</Text>
            </View>
            <Text style={styles.diseaseDesc}>{d.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f9d5e5' 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0d5b56',
    marginBottom: 28,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  diseaseCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d5b56',
    marginBottom: 0,
    letterSpacing: 0.5,
  },
  diseaseDesc: {
    fontSize: 16,
    color: '#0d5b56',
    marginLeft: 2,
    marginTop: 2,
    lineHeight: 22,
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