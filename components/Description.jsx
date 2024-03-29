import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Description = () => {
  const serviceDescription = `
    Welcome to Eunice Enrera Makeup Artistry! We specialize in creating customized makeup and hair looks tailored to enhance your natural beauty. Our services include personalized makeup sessions, flawless hair styling, bridal makeup and hair, and makeup lessons. With our experienced team and passion for beauty, we ensure top-quality service and attention to detail. Experience the difference with Eunice Enrera Makeup Artistry and let us make your beauty dreams a reality.
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{serviceDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    

  },
});

export default Description;
