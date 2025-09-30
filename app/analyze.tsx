import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, Animated, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
// Removed Firestore and external API usage for public repo.

interface PredictionResult {
  prediction: string;
  confidence: number;
  all_probabilities: {
    [key: string]: number;
  };
}

// External prediction API disabled. Using local mock prediction instead.

export default function AnalyzeSkin() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    // History fetching disabled when Firestore is removed.
    setHistory([]);
  }, []);

  const fetchHistory = async () => {
    // Disabled: no remote DB. Keep empty list for demo.
    setHistory([]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to use the camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    try {
      // Simple offline mock prediction based on image name keywords
      await new Promise(r => setTimeout(r, 600));
      const guessPool = [
        { key: 'acne', label: 'Acne' },
        { key: 'eczema', label: 'Eczema' },
        { key: 'psoriasis', label: 'Psoriasis' },
        { key: 'ringworm', label: 'Fungal Infection' },
      ];
      const lower = selectedImage.toLowerCase();
      const matched = guessPool.find(g => lower.includes(g.key));
      const top = matched ? matched.label : 'Benign skin condition';
      const probabilities: { [k: string]: number } = {
        'Acne': 0.25,
        'Eczema': 0.25,
        'Psoriasis': 0.25,
        'Fungal Infection': 0.25,
      };
      probabilities[top] = 0.72;
      const data = {
        prediction: top,
        confidence: probabilities[top],
        all_probabilities: probabilities,
      } as PredictionResult;
      setPrediction(data);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      // Firestore save disabled in public repo
      fetchHistory();
    } finally {
      setLoading(false);
    }
  };

  // Find the disease with the highest probability
  let topDisease = null;
  let topConfidence = null;
  if (prediction && prediction.all_probabilities) {
    const entries = Object.entries(prediction.all_probabilities);
    if (entries.length > 0) {
      const [disease, prob] = entries.reduce((max, curr) => curr[1] > max[1] ? curr : max);
      topDisease = disease;
      topConfidence = prob;
    }
  }

  const handleLearnMore = () => {
    if (topDisease) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(topDisease + ' skin disease')}`;
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Analyze Skin Condition</Text>
          
          <View style={styles.imageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No image selected</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.selectButton, styles.halfButton]} 
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.selectButton, styles.halfButton]} 
              onPress={takePhoto}
            >
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.analyzeButton, !selectedImage && styles.disabledButton]} 
            onPress={analyzeImage}
            disabled={!selectedImage || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color="#5eead4" style={styles.loader} />
          )}

          {prediction && topDisease && (
            <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
              <Text style={styles.resultTitle}>Diagnosis</Text>
              <View style={styles.diseaseRow}>
                <Text style={styles.diseaseLabel}>Condition:</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{topDisease}</Text>
                </View>
              </View>
              <View style={styles.diseaseRow}>
                <Text style={styles.diseaseLabel}>Confidence:</Text>
                <Text style={styles.confidenceValue}>
                  {(topConfidence! * 100).toFixed(1)}%
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.learnMoreButton} 
                onPress={handleLearnMore}
              >
                <Text style={styles.learnMoreText}>
                  Learn more about {topDisease}
                </Text>
              </TouchableOpacity>
              <Text style={styles.infoNote}>
                * This is an AI prediction. Please consult a healthcare professional for a confirmed diagnosis.
              </Text>
            </Animated.View>
          )}

          {/* History Section (disabled remote DB) */}
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>History</Text>
            {historyLoading ? (
              <ActivityIndicator size="small" color="#6db0a6" />
            ) : history.length === 0 ? (
              <Text style={styles.noHistoryText}>No analysis history yet.</Text>
            ) : (
              history.map((item) => {
                const result = item.result as PredictionResult & { timestamp?: string } | undefined;
                const allProbs = result?.all_probabilities as { [key: string]: number } | undefined;
                let topKey = '';
                let topVal = 0;
                if (allProbs) {
                  const sorted = Object.entries(allProbs).sort((a, b) => b[1] - a[1]);
                  if (sorted.length > 0) {
                    topKey = sorted[0][0];
                    topVal = sorted[0][1];
                  }
                }
                return (
                  <View key={item.id} style={styles.historyCard}>
                    <Text style={styles.historyDate}>{result && result.timestamp ? new Date(result.timestamp).toLocaleString() : ''}</Text>
                    <Text style={styles.historyResult}>
                      {result && result.prediction ? `Result: ${result.prediction}` : 'Result: -'}
                    </Text>
                    {allProbs && topKey && (
                      <Text style={styles.historyProb}>
                        Top: {topKey} ({(topVal * 100).toFixed(1)}%)
                      </Text>
                    )}
                  </View>
                );
              })
            )}
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9d5e5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d5b56',
    marginBottom: 40,
    marginTop: 20,
  },
  imageContainer: {
    width: 320,
    height: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#9ca3af',
  },
  selectButton: {
    backgroundColor: '#14b8a6',
    width: '80%',
    padding: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  analyzeButton: {
    backgroundColor: '#14b8a6',
    width: '80%',
    padding: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  loader: {
    marginVertical: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d5b56',
    marginBottom: 20,
    textAlign: 'center',
  },
  diseaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  diseaseLabel: {
    fontSize: 18,
    color: '#0d5b56',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#14b8a6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#003333',
    fontSize: 16,
    fontWeight: '700',
  },
  confidenceValue: {
    fontSize: 18,
    color: '#0d5b56',
    fontWeight: '600',
  },
  learnMoreButton: {
    backgroundColor: '#14b8a6',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  learnMoreText: {
    color: '#003333',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  infoNote: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#e11d48',
    width: '80%',
    padding: 16,
    borderRadius: 25,
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    color: '#003333',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  halfButton: {
    width: '48%',
  },
  historySection: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#fff6f0',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d6a5e',
    marginBottom: 12,
  },
  noHistoryText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  historyCard: {
    backgroundColor: '#fde6e6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  historyDate: {
    color: '#2d6a5e',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  historyResult: {
    color: '#333',
    fontSize: 16,
    marginBottom: 2,
  },
  historyProb: {
    color: '#6db0a6',
    fontSize: 15,
  },
}); 