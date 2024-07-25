import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from './Menu'; 

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <Menu/>
      <Text style={styles.text}>Family Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
