import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function AppStartScreen({ navigation }) {
    return (
    <ImageBackground 
        source={require('../assets/Designer.jpeg')} 
        style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.text}>Wellness app</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Bluetooth')}>
                <Text style={styles.buttonText}>Begin the Journey</Text>
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
    text: {
        position: 'absolute',
        top: 130,
        fontSize: 60,
        marginBottom: 20,
        color: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 100,
        width: 300,
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    }
  });