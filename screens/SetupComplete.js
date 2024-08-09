import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const SetupComplete = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Lottie/check.json')}
        autoPlay
        loop={false} // Plays the animation once
        style={styles.lottie}
      />
      <Text style={styles.title}>Setup Complete</Text>
      <Text style={styles.subtitle}>This phone is now registered to you and can be used to access work resources.</Text>
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Devices')}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottie: {
    width: 150,  // Adjust size as necessary
    height: 150, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SetupComplete;
