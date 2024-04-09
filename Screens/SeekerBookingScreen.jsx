
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, SafeAreaView } from 'react-native';
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import BookingSeeker from "../components/BookingSeeker";


function SeekerBookingScreen(props) {

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25  }}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
      </View>
      <View >
        <BookingSeeker />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#07374d",
    height: Dimensions.get('window').height * 0.1, // Adjust height according to screen size
    flexDirection: 'row',
    alignItems: 'center',  
    
  },
  title: {
    fontSize:  23,
    lineHeight: 50,
    fontWeight: "700",
    fontFamily: "Lobster-Regular",
    color: Color.colorWhite,
    display: "flex",
    alignItems: "center",
    width: 326,
    textAlign: "left",
    position: "absolute",
    marginLeft: 25,
  },
  
});


export default SeekerBookingScreen;