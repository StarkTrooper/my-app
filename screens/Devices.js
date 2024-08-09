import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Alert, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Devices = ({ navigation }) => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraAuthorized, setCameraAuthorized] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    // Check camera permission when the component mounts
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted) {
        setCameraAuthorized(true);
      } else {
        requestCameraPermission();
      }
    } else {
      // For iOS, assume the camera is authorized initially (or use appropriate method for checking permission)
      setCameraAuthorized(true);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'This app needs camera access to scan QR codes for device registration.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraAuthorized(true);
        setPermissionDenied(false);
      } else {
        setPermissionDenied(true);
        Alert.alert(
          'Camera Permission Required',
          'Camera access is needed to scan QR codes. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onSuccess = (e) => {
    // Handle the QR code scanned data (e.data)
    setConnectedDevice({
      name: 'Registered Device',
      qrData: e.data,
    });
    setScanning(false);
    navigation.navigate('SetupComplete');
  };

  const startScanning = () => {
    if (cameraAuthorized) {
      setScanning(true);
    } else if (!permissionDenied) {
      requestCameraPermission();
    }
  };

  return (
    <View style={styles.container}>
      {!connectedDevice && !scanning && (
        <View style={styles.scanContainer}>
          <Text style={styles.title}>Scan QR Code</Text>
          <Text style={styles.subtitle}>You can find the QR code on your desktop.</Text>
          <Image source={require('../assets/IMG_5787.jpg')} style={styles.qrPlaceholder} />
          <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}

      {scanning && cameraAuthorized && (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={<Text style={styles.centerText}>Scan the QR code to register your device</Text>}
          bottomContent={<TouchableOpacity style={styles.cancelButton} onPress={() => setScanning(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>}
        />
      )}

      {!cameraAuthorized && !scanning && permissionDenied && (
        <View style={styles.scanContainer}>
          <Text style={styles.subtitle}>Camera not authorized</Text>
          <TouchableOpacity style={styles.scanButton} onPress={requestCameraPermission}>
            <Text style={styles.scanButtonText}>Grant Camera Permission</Text>
          </TouchableOpacity>
        </View>
      )}

      {connectedDevice && (
        <View style={styles.deviceContainer}>
          <Text style={styles.title}>Connected Device</Text>
          <Image source={require('../assets/IMG_5787.jpg')} style={styles.deviceImage} />
          <Text style={styles.deviceName}>{connectedDevice.name}</Text>
          <TouchableOpacity style={styles.newDeviceButton} onPress={startScanning}>
            <Text style={styles.newDeviceButtonText}>Register a New Device</Text>
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
    padding: 20,
  },
  scanContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  qrPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#d9534f',
    fontSize: 18,
  },
  deviceContainer: {
    alignItems: 'center',
  },
  deviceImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  deviceName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  newDeviceButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  newDeviceButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Devices;
