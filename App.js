import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.temperature}>25°C</Text>
        <Text style={styles.greeting}>Hello, Daniela!</Text>
        <Text style={styles.welcome}>Welcome to your smart home.</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.roomsTitle}>Rooms</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rooms}>
        <View style={styles.roomCard}>
          <Image source={require('./assets/favicon-32x32.png')} style={styles.roomImage} />
          <Text style={styles.roomName}>Bedroom</Text>
        </View>
        <View style={styles.roomCard}>
          <Image source={require('./assets/favicon.png')} style={styles.roomImage} />
          <Text style={styles.roomName}>Living Room</Text>
        </View>
        <View style={styles.roomCard}>
          <Image source={require('./assets/icon.png')} style={styles.roomImage} />
          <Text style={styles.roomName}>Bathroom</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    width: '90%',
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 40,
    fontWeight: '300',
    color: '#333',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  welcome: {
    fontSize: 16,
    fontWeight: '300',
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#FFF',
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
  addButtonText: {
    fontSize: 24,
    color: '#333',
  },
  roomsTitle: {
    width: '90%',
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  rooms: {
    width: '100%',
    paddingTop: 10,
  },
  roomCard: {
    width: 150,
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
