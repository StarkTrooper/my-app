import { StyleSheet } from 'react-native';

export const getThemeStyles = (isDarkMode) => {
  return StyleSheet.create({
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
      backgroundColor: isDarkMode ? '#333' : '#FEF7F3',
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
      color: isDarkMode ? '#fff' : '#333',
    },
    sideMenu: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 200,
      height: '150%',
      backgroundColor: isDarkMode ? '#444' : '#876',
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
      color: isDarkMode ? '#fff' : '#333',
    },
    welcome: {
      fontSize: 20,
      fontWeight: '300',
      color: isDarkMode ? '#bbb' : '#666',
    },
    roomsContainer: {
      width: '90%',
    },
    roomsTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#333',
      marginTop: 100,
      marginLeft: 50,
    },
    rooms: {
      paddingTop: 50,
    },
    roomCard: {
      width: 165,
      height: 345,
      backgroundColor: isDarkMode ? '#333' : '#FFF',
      borderRadius: 20,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      shadowColor: isDarkMode ? '#222' : '#b4baa2',
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
};

