import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Notification = ({ message, userName, userImage, time }) => {
  return (
    <View style={styles.container}>
      <Image source={userImage} style={styles.userImage} />
      <View style={styles.content}>
        <Text style={styles.userName}>{userName}</Text>
        <Text>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});

export default Notification;
