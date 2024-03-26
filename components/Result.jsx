// I want this program to be responsive using dimensions.


import * as React from "react";
import { StyleSheet, View, Text, Image, FlatList, Dimensions, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, FontSize } from "../GlobalStyles";

const Result = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      price: 1999,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "Elysium Glow: Exquisite Sanctuary Care and Beauty Enhancement ",
      providerImage: require("../assets/rectangle-370.jpg"),
    },
    {
      id: 2,
      price: 849,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "LuxeElegance Sparkle & Shine: Opulent Cleaning and Beauty Experience ",
      providerImage:  require("../assets/rectangle-371.jpg"),
    },
    {
      id: 3,
      price: 449,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "Daniel's Electrical Services ",
      providerImage: require("../assets/rectangle-372.jpg"),
    },
    {
      id: 4,
      price: 199,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "John's Tutoring Service",
      providerImage:  require("../assets/rectangle-374.jpg"),
    },
    {
      id: 5,
      price: 449,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "Arit's Plumbing Service",
      providerImage: require("../assets/rectangle-545.png"),
    },
    {
      id: 6,
      price: 449,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "Arit's Plumbing Service",
      providerImage: require("../assets/rectangle-545.png"),
    },
    {
      id: 7,
      price: 449,
      location: 'Lahug, Cebu City',
      locationIcon: require("../assets/image-145.png"),
      stars: require("../assets/group-726.png"),
      rating: '3.7',
      service: "Arit's Plumbing Service",
      providerImage: require("../assets/rectangle-545.png"),
    },
    // Add more items as needed
  ];

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  
  const horizontalMargin = 16;
  const itemWidth = screenWidth - 2 * horizontalMargin;

  const handlePress = () => {
    // Navigate to another screen
    navigation.navigate('ServiceViewScreen'); 
  };

  return (
    
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Pressable onPress={handlePress}>
        <View style={[styles.resultContainer, { width: itemWidth }]}>

          <Image
            style={styles.providerImage}
            contentFit="cover"
            source={item.providerImage}
          />

          <View style={styles.hays}>
          
            <Text style={styles.Service}>{item.service}</Text>

            <View style={styles.ratingContainer}>
              <Image
                style={styles.stars}
                contentFit="cover"
                source={item.stars}
              />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>


            <View style={styles.locationContainer}>
              <Image
                style={styles.locationIcon}
                contentFit="cover"
                source={item.locationIcon}
              />
              <Text style={styles.location}>{item.location}</Text>
            </View>

          </View>

          <Text style={styles.price}>Php {item.price}</Text>
          <Text style={styles.seeDetails}>See Details</Text>


        </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: Color.colorWhite,
    marginVertical: 5,
   
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 7,
    elevation: 7,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 0.1,
    top: 0,
    height: 147,
    position: "relative",
  },
  flatListContent: {
    alignItems: "center",
    justifyContent: "center", 
    flexGrow: 1, 
  },
  location: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    marginLeft: 7.5,
    fontSize: 10,
    letterSpacing: 0.3,
    lineHeight: 10,
    width: 150,
    position: "absolute",

  },
  locationIcon: {
    top: 2,
    width: 5,
    height: 6,
    position: "absolute",
  },
  
  price: {
    top: 96,
    right: 26,
    color: "#0e638a",
    letterSpacing: 0.9,
    fontSize: FontSize.size_lg,
    textAlign: "right",
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    lineHeight: 20,
    position: "absolute",
  },
  seeDetails: {
    top: 115,
    right: 26,
    fontSize: 10,
    textDecorationLine: "underline",
    letterSpacing: 0.5,
    color: "#002f45",
    textAlign: "right",
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    lineHeight: 15,
    position: "absolute",
  },
  
  
  
  rating: {
    fontSize: 13,
    letterSpacing: 0.7,
    lineHeight: 14,
    width: 25,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    position: "absolute",
    
  },
  stars: {
    left: 25,
    width: 49,
    height: 10,
    position: "absolute",
    
  },
  providerImage: {
    left: 14,
    width: 105,
    height: 113,
    top: 17,
    position: "absolute",
  },
  
  Service: {
    paddingTop: 15,
    paddingBottom: 1,
    width: 230,

    alignItems: "center",
    display: "flex",
    textAlign: "left",

    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
   
    lineHeight: 25,
    letterSpacing: 0.75,
    fontSize: FontSize.size_lg,
    //top: 17,
    position: "relative",
    
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    position: 'absolute', 
    paddingBottom: 15,
    position:  "relative",
  },
  locationContainer: {
    alignItems:"space-between",
    flexDirection: 'row', 
    width: 77,
    height: 9,
    marginTop:4,
    position:  "relative",
  },
  hays: {
    marginLeft: 125,
  },
  
});

export default Result;
