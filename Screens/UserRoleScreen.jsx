import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const UserRoleScreen = () => {
  return (
    <View style={styles.userRoleScreen}>
      
      <Text style={[styles.signingUpAs, styles.continueTypo]}>
        Signing Up as a...
      </Text>
      
      
      <TouchableOpacity onPress={handlePress}>
        <View>
          <LinearGradient
            style={[styles.serviceSeekerWrapper, styles.serviceWrapperShadowBox]}
            locations={[0, 1]}
            colors={["#83caeb", "#002f45"]}
          >
            <Text style={[styles.serviceSeeker, styles.serviceTypo]}>
              <Text style={styles.service}>{`Service
`}</Text>
              <Text style={styles.seeker}>SEEKER</Text>
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={handlePress}>
      <View
        style={[styles.serviceProviderWrapper, styles.serviceWrapperShadowBox]}
      >
        <Text style={[styles.serviceProvider, styles.serviceTypo, styles.gradientText]}>
          <Text style={[styles.service, styles.gradientTextStart]}>{`Service
`}</Text>
          <Text style={[styles.seeker, styles.gradientTextEnd]}>PROVIDER</Text>
        </Text>
      </View>
      </TouchableOpacity>
      

      <TouchableOpacity onPress={handlePress}>
        <View style={styles.frameParent}>
          <LinearGradient
            style={[styles.frameChild, styles.frameChildBorder]}
            locations={[0, 1]}
            colors={["#4e8daa", "#023349"]}
          />
          <Text style={[styles.continue, styles.continueTypo]}>CONTINUE</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

const handlePress = () => {
  // Handle button press logic here
  console.log('Button pressed');
};


const styles = StyleSheet.create({
  frameChildBorder: {
    borderWidth: 0.2,
    borderStyle: "solid",
  },
  continueTypo: {
    textAlign: "left",
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 10,
    fontSize: FontSize.size_11xl,
    position: "absolute",
  },
  serviceWrapperShadowBox: {
    height: 145,
    elevation: 5,
    shadowRadius: 5,
    borderRadius: 20,
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowColor: "#afc7d2",
    width: 286,
    left: 72,
    position: "absolute",
  },
  serviceTypo: {
    textAlign: "center",
    lineHeight: 34,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    position: "absolute",
  },
  frameChild: {
    top: 0,
    left: 0,
    borderRadius: 6,
    shadowRadius: 3,
    elevation: 3,
    borderColor: "#0e4c69",
    backgroundColor: "transparent",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowColor: "#afc7d2",
    borderWidth: 0.2,
    borderStyle: "solid",
    height: 64,
    width: 286,
    position: "absolute",
  },
  continue: {
    top: 22,
    left: 67,
    color: Color.colorWhite,
    paddingTop:18,
  },
  frameParent: {
    top: 780,
    height: 54,
    width: 286,
    left: 72,
    position: "absolute",
  },
  service: {
    fontSize: FontSize.size_6xl,

  },
  seeker: {
    fontSize: FontSize.size_21xl,
    textAlign: "center",
    
  },
  serviceSeeker: {
    top: 46,
    left: 28,
    width: 230,
    height: 59,
    color: Color.colorWhite,
  },
  serviceSeekerWrapper: {
    top: 301,
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  serviceProvider: {
    top: 44,
    left: 11,
    width: 263,
    height: 58,
    
  },
  serviceProviderWrapper: {
    top: 466,
    borderColor: Color.colorBlack,
    borderRadius: 20,
    borderWidth: 0.2,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    
    
    
  },
  signingUpAs: {
    top: 170, 
    left: 88,
    color: "#1f546d",
    fontWeight: "700",
    fontSize: FontSize.size_11xl,
    lineHeight: 23, 
    paddingTop:50,
    textAlign: "center",
  },
  userRoleScreen: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  gradientText: {
    color: "red", // You can set your desired gradient colors here
  },
});

export default UserRoleScreen;
