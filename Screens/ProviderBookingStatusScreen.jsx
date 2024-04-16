import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native';
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 



function ProviderBookingStatusScreen(props) {
    const navigation = useNavigation(); 

    const handleBackPress = () => {
        navigation.navigate('ProviderBookingScreen');
    };
    

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <View style={styles.header}>
      <Pressable onPress={handleBackPress}>
        
        <AntDesign name="left" size={24} color="white" style={styles.icon} />
      </Pressable>
        <Text style={styles.title}>For Approval</Text>
      </View>

{/* Place this part at the center of the screen */}
    <View style={styles.centeredContainer}>

     
      <View style={[styles.transactionDets, styles.transactionLayout1]}>
        <View style={[styles.transactionDetsChild, styles.childShadowBox]} />
        <Text
          style={[styles.transactionIdBooking, styles.transactionLayout]}
        >{`Transaction ID
Booking Time
Payment Time
Payment Method
Amount

`}</Text>
        <Text style={[styles.transaction, styles.bookingTypo]}>{`#0102
21-12-2023  19:47
21-12-2023  19:47
Gcash
 ₱ 499

`}</Text>
      </View>


      <View style={[styles.bookingdets, styles.bookingdetsLayout]}>
        <View style={[styles.bookingdetsChild, styles.bookingdetsLayout]} />
        <Text
          style={[styles.bookingIdSeeker, styles.bookingPosition]}
        >{`Booking ID
Seeker
Location
Date
Time`}</Text>
        <Text style={[styles.booking, styles.bookingPosition]}>{`#236
Darmae Tan
Lahug, Cebu City
December 25, 2023
1:00 AM - 2:00 AM
`}</Text>
      </View>


    {/* Message Button */}
    <View style={[styles.servicecontainer, styles.servicecontainerLayout]}>
      <View style={[styles.message, styles.messageLayout]}>
        <View style={[styles.messageChild, styles.messageLayout]} />
        <Text style={styles.messageSeeker}>Message Seeker</Text>
        <Image
          style={styles.letterIcon}
          contentFit="cover"
          source={require("../assets/letter.png")}
        />
      </View>

     
    {/* Service */}
      <Text style={[styles.servicename, styles.servicenamePosition]}>
        Eunice Enrera Makeup Artistry - Cebu Makeup Artist
      </Text>
      <Image
        style={[styles.serviceimageIcon, styles.servicenamePosition]}
        contentFit="cover"
        source={require("../assets/serviceimage1.png")}
      />
{/* The part ends here */}
</View>
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
    marginLeft: 45,
  },
  icon: {
    marginLeft: 10, // Add some space before the icon
  },
  acceptLayout: {
    height: 53,
    width: 371,
    left: 32,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    height: 53,
    width: 371,
    position: "absolute",
  },
  accept1Typo: {
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 50,
    position: "absolute",
  },
  transactionLayout1: {
    height: 188,
    width: 350,
    position: "absolute",
  },
  childShadowBox: {
    borderWidth: 0.2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 7,
    shadowRadius: 7,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  transactionLayout: {
    height: 156,
    color: Color.colorBlack,
    lineHeight: 30,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  bookingTypo: {
    textAlign: "right",
    fontFamily: FontFamily.quicksandMedium,
    fontWeight: "500",
  },
  bookingdetsLayout: {
    height: 164,
    width: 350,
    position: "absolute",
  },
  bookingPosition: {
    lineHeight: 27,
    top: 13,
    color: Color.colorBlack,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  messageLayout: {
    height: 21,
    width: 139,
    position: "absolute",
  },
  servicenamePosition: {
    top: 106,
    position: "absolute",
  },
  headerPosition: {
    height: 76,
    width: 430,
    left: 0,
    top: 0,
    position: "absolute",
  },
  acceptChild: {
    backgroundColor: Color.colorDarkslategray_500,
  },
  accept1: {
    top: 1,
    left: 88,
    textAlign: "center",
    justifyContent: "center",
    width: 196,
    height: 51,
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 50,
  },
  accept: {
    top: 781,
  },
  cancelChild: {
    backgroundColor: Color.colorGray,
  },
  cancel: {
    top: 844,
  },
  transactionDetsChild: {
    height: 188,
    width: 350,
    position: "absolute",
  },
  transactionIdBooking: {
    top: 17,
    width: 108,
    textAlign: "left",
    left: 21,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
  },
  transaction: {
    top: 19,
    left: 219,
    width: 110,
    height: 156,
    color: Color.colorBlack,
    lineHeight: 30,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  transactionDets: {
    top: 340,
    // left: 40,
    //  justifyContent: 'center', 
    // alignItems: 'center'
  },
  bookingdetsChild: {
    borderWidth: 0.2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 7,
    shadowRadius: 7,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  bookingIdSeeker: {
    width: 77,
    height: 136,
    textAlign: "left",
    left: 21,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
  },
  booking: {
    left: 158,
    width: 172,
    height: 142,
    textAlign: "right",
    fontFamily: FontFamily.quicksandMedium,
    fontWeight: "500",
  },
  bookingdets: {
    top: 160,
    // left: 40,
  },
  messageChild: {
    borderRadius: 4,
    backgroundColor: "#dbdbdb",
    left: 0,
    top: 0,
    height: 21,
    width: 139,
  },
  messageSeeker: {
    top: 3,
    left: 28,
    fontWeight: "600",
    fontFamily: FontFamily.quicksandSemiBold,
    color: Color.colorDarkslategray_500,
    textAlign: "left",
    lineHeight: 15,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  letterIcon: {
    top: 4,
    left: 9,
    width: 17,
    height: 13,
    position: "absolute",
  },
  message: {
    top: 176,
    left: 140,
  },
  servicename: {
    left: 140,
    letterSpacing: 1,
    lineHeight: 20,
    fontFamily: FontFamily.quicksandRegular,
    width: 227,
    height: 56,
    textAlign: "left",
    color: Color.colorBlack,
    top: 106,
    alignItems: "center",
    display: "flex",
    fontSize: FontSize.size_xl,
  },
  serviceimageIcon: {
    width: 118,
    height: 118,
    left: 10,
  },
  headerChild: {
    backgroundColor: Color.colorDarkslategray_500,
  },
  chevronLeftIcon: {
    top: 14,
    left: 15,
    width: 35,
    height: 48,
    position: "absolute",
  },
  forApproval: {
    top: 12,
    left: 52,
    fontSize: FontSize.size_21xl,
    width: 326,
    textAlign: "left",
  },
  providerbookingdetails: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    position:"relative",
    justifyContent: 'center',
},
servicecontainerLayout: {
height: 118,
position: "absolute",

},
servicecontainer: {
    top: -80,
    
    
    
    width: 372,
    
    
},

});
  

  
  


export default ProviderBookingStatusScreen;