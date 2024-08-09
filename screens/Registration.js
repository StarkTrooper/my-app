import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Registration() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigation = useNavigation();

  // Email Validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (!name || !lastName || !email || !password || !age || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!isValidEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
    }

    navigation.replace('Home', { name });
  };

  return (
    <ImageBackground
      source={require('../assets/Designer2.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Age</Text>
            <Picker
              selectedValue={age}
              style={styles.picker}
              onValueChange={(itemValue) => setAge(itemValue)}
            >
              {Array.from({ length: 101 }, (_, index) => (
                <Picker.Item key={index} label={index.toString()} value={index.toString()} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Gender</Text>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Non Binary" value="Non Binary" />
              <Picker.Item label="Rather not say" value="Rather not say" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    //backgroundColor: '#94b5d4',
    textShadowColor: "white",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
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
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
