import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RatingStars = ({ rating }) => {
  const roundedRating = Math.round(rating); // Round the rating to the nearest whole number

  return (
    <View style={styles.container}>
      <Text style={styles.ratingText}>{rating}</Text>
      <View style={styles.ratingStars}>
        {[...Array(roundedRating)].map((_, index) => (
          <FontAwesome key={index} name="star" size={14} color="#266f92" />
        ))}
        {[...Array(5 - roundedRating)].map((_, index) => (
          <FontAwesome key={index + roundedRating} name="star-o" size={15} color="#266f92" />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginHorizontal: 3,
  },
});

export default RatingStars;
