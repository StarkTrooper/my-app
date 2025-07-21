import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemeProvider, useTheme } from './screens/ThemeContext';
import { getThemeStyles } from './screens/themestyle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Family from './screens/Family.js';
import Devices from './screens/Devices.js';
import Mantra from './screens/Mantra.js'; 
import Settings from './screens/Settings.js';
import Assistance from './screens/Assistance.js';
import BraceletColors from './screens/BraceletColors.js';
import Meditation from './screens/Meditation.js';
import SendVibes from './screens/SendVibes.js';
import Appstart from './screens/Appstart.js';
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import Registration from './screens/Registration.js';
import Bluetooth from './screens/Bluetooth.js';
import SetupComplete from './screens/SetupComplete.js';



const Stack = createStackNavigator();

const HomeScreen = ({ route, navigation }) => {
  const { name } = route.params || { name: 'Gaddiel' };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section (Static) */}
      <View style={styles.topSection}>
        <Text style={styles.greeting}>Welcome, {name}!</Text>

        {/* Lottie Animation */}
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('./assets/Lottie/LandscapeAnimation.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>

      {/* Bottom Section (Scrollable) */}
      <ScrollView style={styles.bottomSection} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Devices')}>
          <Text style={styles.buttonText}>Devices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SendVibes')}>
          <Text style={styles.buttonText}>Send Vibes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bluetooth')}>
          <Text style={styles.buttonText}>Bluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Meditation')}>
          <Text style={styles.buttonText}>Meditation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Appstart">
        <Stack.Screen name="AppStart" component={Appstart} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="Family" component={Family} />
        <Stack.Screen name="Devices" component={Devices} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="SendVibes" component={SendVibes} />
        <Stack.Screen name="Meditation" component={Meditation} />
        <Stack.Screen name="Mantra" component={Mantra} />
        <Stack.Screen name="BraceletColors" component={BraceletColors} />
        <Stack.Screen name="Assistance" component={Assistance} />
        <Stack.Screen name="SetupComplete" component={SetupComplete} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f86ad',
  },
  topSection: {
    height: '50%', 
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  greeting: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
    paddingBottom:20,
  },
  lottieContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#5f86ad',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: '#2C3E50',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default App;
