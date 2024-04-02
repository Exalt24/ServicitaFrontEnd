import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreen = () => {
  const handleChangeEmail = () => {
    // Logic for changing email
  };

  const handleChangePassword = () => {
    // Logic for changing password
  };

  const handleChangeMobile = () => {
    // Logic for changing mobile number
  };

  const handleChangeOtherDetails = () => {
    // Logic for changing other details
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.firstButton, ]} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
        <FontAwesome name="chevron-right" size={20} color="#07374d" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, ]} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
        <FontAwesome name="chevron-right" size={20} color="#07374d" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, ]} onPress={handleChangeMobile}>
        <Text style={styles.buttonText}>Change Mobile</Text>
        <FontAwesome name="chevron-right" size={20} color="#07374d" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,]} onPress={handleChangeOtherDetails}>
        <Text style={styles.buttonText}>Change Other Details</Text>
        <FontAwesome name="chevron-right" size={20} color="#07374d" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Adjust top padding as needed
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,
    height: 70,
    paddingLeft: 10, // Adjust as needed for spacing from left
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#07374d',
  },
  firstButton: {
    marginTop: 5, // No margin for the first button
  },
  buttonText: {
    color: '#07374d',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    marginRight: 10, // Adjust as needed for spacing from right
  },
});

export default ProfileScreen;
