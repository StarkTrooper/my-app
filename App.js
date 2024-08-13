import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './screens/ThemeContext';
import { getThemeStyles } from './screens/themestyle';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated, ImageBackground } from 'react-native';
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

const HomeScreen = ({route, navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = getThemeStyles(isDarkMode);
  const { name } = route.params || { name: 'Gaddiel' };
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : -200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [menuVisible]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground
      source={require('./assets/8.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.menuButtonContainer, { transform: [{ translateX: menuAnimation }] }]}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Text style={styles.menuButtonText}>≡</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnimation }] }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Family')}>
            <Text style={styles.sideMenuText}>Family</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Devices')}>
            <Text style={styles.sideMenuText}>Devices</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Assistance')}>
            <Text style={styles.sideMenuText}>Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.sideMenuText}>Settings</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {name}!</Text>
          <View style={styles.welcomer}>
            <Text style={styles.welcome}>Welcome to your wellness app.</Text>
          </View>
        </View>

        <Text style={styles.roomsTitle}>Shortcuts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rooms}>
          <TouchableOpacity style={styles.roomCard} onPress={() => navigation.navigate('SendVibes')}>
            <Image source={require('./assets/4.png')} style={styles.roomImage} />
            <View style={styles.roomNameOverlay}>
              <Text style={styles.roomName}>Send vibes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roomCard} onPress={() => navigation.navigate('Meditation')}>
            <Image source={require('./assets/3.png')} style={styles.roomImage} />
            <View style={styles.roomNameOverlay}>
              <Text style={styles.roomName}>Meditation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roomCard} onPress={() => navigation.navigate('Mantra')}>
            <Image source={require('./assets/5.png')} style={styles.roomImage} />
            <View style={styles.roomNameOverlay}>
              <Text style={styles.roomName}>Mantra</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roomCard} onPress={() => navigation.navigate('BraceletColors')}>
            <Image source={require('./assets/6.png')} style={styles.roomImage} />
            <View style={styles.roomNameOverlay}>
              <Text style={styles.roomName}>Bracelet Colors</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roomCard} onPress={() => navigation.navigate('AppConfig')}>
            <Image source={require('./assets/7.png')} style={styles.roomImage} />
            <View style={styles.roomNameOverlay}>
              <Text style={styles.roomName}>App Configuration</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 170,
    zIndex: 9,
  },
  menuButton: {
    backgroundColor: '#FEF7F3',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#333',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '150%',
    backgroundColor: '#876',
    padding: 20,
    zIndex: 9,
    paddingTop: 85,
    borderRadius: 15,
  },
  sideMenuText: {
    fontSize: 25,
    color: '#FFF',
    marginVertical: 10,
  },
  header: {
    alignItems: 'flex-start',
    paddingLeft: 45,
  },
  welcomer: {
    paddingTop: 10,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '300',
    color: '#666',
  },
  roomsContainer: {
    width: '90%',
  },
  roomsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 100,
    marginLeft: 50,
  },
  rooms: {
    paddingTop: 50,
  },
  roomCard: {
    width: 165,
    height: 345,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#b4baa2',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  roomImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  roomNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default App;
