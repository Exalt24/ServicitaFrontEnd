import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function App() {
  return (
    <View style={styles.containerGif}>
      <Text style={styles.sched}>Schedule</Text>
      <Text style={styles.time}>8:00 AM - 9:00 AM</Text>
      
      <Image
        source={require('../assets/1400px.gif')}
        style={styles.gif}
      />


      <Text style={styles.wonderful}>Have a wonderful</Text>
      <Text style={styles.servicitime}> Servicitime!</Text>
    </View>

    



  );
}

const styles = StyleSheet.create({
  containerGif: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sched: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    marginBottom: 20,
  },
  gif: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.95,
    marginBottom: 20,
  },
  wonderful: {
    fontSize: 25,
    // fontStyle: 'italic',
  },
  servicitime: {
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
  },


});

