import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';


export default function AppStartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={require('../assets/startingvideoloopgif.gif')} 
      style={styles.background}></ImageBackground>
      <View style={styles.overlay}>
        <Text style={styles.title}>Wellness App</Text>
      </View>

      <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Begin the Journey</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
text: {
    position: 'absolute',
    top: 90,
    fontSize: 60,
    marginBottom: 20,
    color: 'white',
},
button: {
    position: 'absolute',
    bottom: 70,
    width: 300,
    height: 60,
    borderColor: 'transparent',
    borderWidth: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00274D', 
},
buttonText: {
    fontSize: 25,
    color: 'hsl(48, 29.30%, 83.90%)', 
    fontWeight: 'bold',
}

});
