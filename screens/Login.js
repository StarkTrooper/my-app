import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      if (username === 'hello@hello.com' && password === 'Password') {
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    }, 2000);
  };

  return (
    <ImageBackground
      source={require('../assets/8.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Please enter Email and Password</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgotten password?</Text>
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Gmail</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text></Text>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 130,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPassword: {
    color: 'black',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    width: '45%',
    paddingVertical: 15,
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    backgroundColor: 'white',
  },
  socialButtonText: {
    color: '#000',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    color: '#000',
  },
  signUpText: {
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
