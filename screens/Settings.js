import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

export default function Settings() {
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState('Gaddiel'); // Default name
  const [profileImage, setProfileImage] = useState(null);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (route.params?.name) {
      setName(route.params.name);
    }
  }, [route.params?.name]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    Alert.alert(
      "Remove Image",
      "Are you sure you want to remove your profile picture?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => setProfileImage(null) }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F9F9F9' : '#333' }]}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/usericon.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={removeImage}>
          <Text style={[styles.removeText, { color: theme === 'light' ? 'red' : '#FF7F7F' }]}>
            Remove Picture
          </Text>
        </TouchableOpacity>
        <Text style={[styles.name, { color: theme === 'light' ? '#000' : '#FFF' }]}>
          {name}
        </Text>
      </View>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Appearance')}>
        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
          Appearance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Privacy')}>
        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
          Privacy
        </Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle Button */}
      <TouchableOpacity style={styles.optionButton} onPress={toggleTheme}>
        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('About')}>
        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
          About
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Feedback')}>
        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
          Send Feedback
        </Text>
      </TouchableOpacity>

      <View style={styles.accountContainer}>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
            Change Email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  removeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  accountContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 20,
  },
  accountButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
});
