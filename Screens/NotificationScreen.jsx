import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import Notification from './Notification';

const NotificationScreen = () => {
  // Example notifications data
  const notifications = [
    {
      id: 1,
      message: 'You have a new follower',
      userName: 'John Doe',
     // userImage: require('../assets/rectangle-373@3x.png'), // Example image from asset folder
      time: '10:30 AM', // Example time
    },
    {
      id: 2,
      message: 'Your post got liked',
      userName: 'Jane Smith',
      //userImage: require('../assets/rectangle-373@3x.png'), // Example image from asset folder
      time: 'Yesterday', // Example time
    },
    // Add more notifications as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            userName={notification.userName}
            userImage={notification.userImage}
            time={notification.time}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
