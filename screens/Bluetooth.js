import React, { useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, StyleSheet, TouchableOpacity, FlatList, Alert, NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(false);
  const [temperature, setTemperature] = useState(false);
  const [pressure, setPressure] = useState(false);

  useEffect(() => {
    const initializeBle = async () => {
      await BleManager.start({ showAlert: false });
      console.log('BleManager started');
      if (Platform.OS === 'android') await requestPermissions();
    };

    initializeBle();

    const handleDiscoverPeripheral = (device) => {
      if (device.name) {
        console.log('Found device:', device.name);
        setDevices(prev => prev.some(d => d.id === device.id) ? prev : [...prev, device]);
      }
    };

    const handleStopScan = () => setIsScanning(false);

    const handleNotification = (data) => {
      const buffer = Buffer.from(data.value);
      const value = buffer.readInt16LE(0);
      console.log(Notification from ${data.characteristic}: ${value});

      if (data.characteristic.toLowerCase().includes('2a6d')) {
        setPressure(value / 100);
        console.log("Pressure:", value / 100);
      } else if (data.characteristic.toLowerCase().includes('2a6e')) {
        setTemperature(value / 100);
        console.log("Temperature:", value / 100);
      }
    };

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleNotification);

    return () => {
      BleManager.stopScan();
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    };
  }, []);

  const requestPermissions = async () => {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const allGranted = permissions.every(p => granted[p] === PermissionsAndroid.RESULTS.GRANTED);
    if (!allGranted) Alert.alert('Permissions required');
  };

  const startScan = () => {
    if (!isScanning) {
      setDevices([]);
      BleManager.scan([], 5, true).then(() => setIsScanning(true));
    }
  };

  const connectToDevice = (device) => {
    BleManager.connect(device.id).then(() => {
      console.log('Connected:', device.id);
      setConnectedDevice(device);

      BleManager.retrieveServices(device.id).then(() => {
        const serviceUUID = '181a';
        BleManager.startNotification(device.id, serviceUUID, '2a6d').catch(console.error);
        BleManager.startNotification(device.id, serviceUUID, '2a6e').catch(console.error);
        navigation.navigate('SignUp');
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titletext}>Bluetooth Example</Text>

      <TouchableOpacity style={styles.button} onPress={startScan}>
        <Text style={styles.buttonText}>Start Scan</Text>
      </TouchableOpacity>

      {isScanning && <Text style={styles.scanningText}>Scanning...</Text>}

      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.deviceButton} onPress={() => connectToDevice(item)}>
            <Text style={styles.deviceText}>{item.name || item.id}</Text>
          </TouchableOpacity>
        )}
      />

      {connectedDevice && (
        <View>
          <Text style={styles.connectedText}>Connected to {connectedDevice.name || connectedDevice.id}</Text>
          {pressure !== null && <Text style={styles.connectedText}>Pressure: {pressure} cPa</Text>}
          {temperature !== null && <Text style={styles.connectedText}>Temperature: {temperature} °C</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  titletext: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  skipbutton: {
    position: 'absolute',
    backgroundColor: '#536b82',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    bottom: 25,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  scanningText: {
    fontSize: 16,
    color: '#FF0000',
    margin: 10,
  },
  deviceButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  deviceText: {
    fontSize: 16,
  },
  connectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  temperatureText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default BluetoothScreen;