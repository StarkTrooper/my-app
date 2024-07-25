import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-200)).current;
  const navigation = useNavigation();

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
    <>
      <Animated.View style={[styles.menuButtonContainer, { transform: [{ translateX: menuAnimation }] }]}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>≡</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnimation }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.sideMenuText}>Home</Text>
        </TouchableOpacity>
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
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Menu;
