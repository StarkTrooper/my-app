import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function Signup({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/Designer2.jpeg')} 
      style={styles.background}>

      <View style={styles.container}>
        <Text style={styles.title}>HELLO</Text>
        <Text style={styles.subtitle}>Lorem ipsum dolor sit amet</Text>
        <TouchableOpacity 
          style={styles.buttonSignIn} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonSignUp} 
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={styles.buttonText2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 40,
  },
  buttonSignIn: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonSignUp: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  buttonText2: {
    fontSize: 17,
  },
});
