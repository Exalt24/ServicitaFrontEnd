import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import Notifications from '../components/Notifications';

const NotificationScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 25  }}>
      <Header title="Notifications" />
      <View style={{   flex: 1 }}>
        {/* Your screen content goes here */}
        <Notifications />
      </View>
    </View>
  );
};

export default NotificationScreen;
