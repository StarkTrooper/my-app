import React, { useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, StyleSheet, TouchableOpacity, FlatList, Alert, NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const initializeBleManager = async () => {
      try {
        await BleManager.start({ showAlert: false });
        console.log('BleManager started');

        if (Platform.OS === 'android') {
          await requestPermissions();
        }
      } catch (error) {
        console.error('BleManager initialization error', error);
      }
    };

    initializeBleManager();

    const handleDiscoverPeripheral = (device) => {
      console.log('Discovered', device);
      setDevices(prevDevices => {
        if (!prevDevices.some(d => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    };

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    return () => {
      BleManager.stopScan();
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.removeAllListeners('BleManagerStopScan', handleStopScan);
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allPermissionsGranted = permissions.every(permission => granted[permission] === PermissionsAndroid.RESULTS.GRANTED);

      if (allPermissionsGranted) {
        console.log("All permissions granted");
      } else {
        Alert.alert("Permission denied", "Bluetooth permissions are required for scanning.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startScan = () => {
    if (!isScanning) {
      setDevices([]); // Clear the list before starting a new scan
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.error('Scan error', err);
        });
    }
  };

  const handleStopScan = () => {
    console.log('Scan stopped');
    setIsScanning(false);
  };

  const connectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to', device.id);
        setConnectedDevice(device);

        BleManager.retrieveServices(device.id)
          .then(peripheralInfo => {
            console.log('Peripheral info:', peripheralInfo);
            readTemperature(device.id);
            navigation.navigate('SignUp');
          });
      })
      .catch(error => {
        console.log('Connection error', error);
      });
  };

  const readTemperature = (deviceId) => {
    const serviceUUID = '38a03671-d9ca-42b6-8d68-a54d269cfcd7';  // service UUID
    const characteristicUUID = '38a03671-d9ca-42b6-8d68-a54d269cfcd7';  // characteristic UUID

    BleManager.read(deviceId, serviceUUID, characteristicUUID)
      .then(readData => {
        const buffer = Buffer.from(readData);
        const temp = buffer.readUInt32LE(0);
        setTemperature(temp);
        console.log('Temperature:', temp);
      })
      .catch(error => {
        console.log('Read error', error);
      });
  };

  const sendCommand = (deviceId, cmd) => {
    const serviceUUID = '38a03671-d9ca-42b6-8d68-a54d269cfcd7';  // service UUID
    const characteristicUUID = '38a03671-d9ca-42b6-8d68-a54d269cfcd7';  // characteristic UUID

    const buffer = Buffer.from(cmd, 'utf8');
    BleManager.write(deviceId, serviceUUID, characteristicUUID, buffer.toJSON().data)
      .then(() => {
        console.log('Command sent');
      })
      .catch(error => {
        console.log('Write error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titletext}>Bluetooth Example</Text>
      <TouchableOpacity style={styles.button} onPress={startScan}>
        <Text style={styles.buttonText}>Start Scan</Text>
      </TouchableOpacity>
      {isScanning && <Text style={styles.scanningText}>Scanning...</Text>}
      {/* <TouchableOpacity style={styles.button} onPress={() => BleManager.stopScan()}>
        <Text style={styles.buttonText}>Stop Scan</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.skipbutton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.deviceButton} onPress={() => connectToDevice(item)}>
            <Text style={styles.deviceText}>{item.name || item.id}</Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice && (
        <View>
          <Text style={styles.connectedText}>Connected to {connectedDevice.name || connectedDevice.id}</Text>
          <Text style={styles.temperatureText}>Temperature: {temperature}</Text>
          <TouchableOpacity style={styles.button} onPress={() => sendCommand(connectedDevice.id, 'YourCommand')}>
            <Text style={styles.buttonText}>Send Command</Text>
          </TouchableOpacity>
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
