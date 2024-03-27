import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';

const NotificationScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Screen Title" />
      {/* Your screen content goes here */}
    </View>
  );
};

export default NotificationScreen;

