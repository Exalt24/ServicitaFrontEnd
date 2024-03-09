import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const UserRoleScreen = () => {
  return (
    <View style={styles.userRoleScreen}>
      <Text style={[styles.signingUpAs, styles.continueTypo]}>
        Signing Up as a...
      </Text>

      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.serviceProviderWrapper, styles.serviceWrapperShadowBox]}>
        <LinearGradient
          colors={["#70B4D3", "#002F45"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.serviceProvider, styles.serviceTypo]}>
            <Text style={[styles.service ]}>{`Service
`}</Text>
            <Text style={[styles.seeker]}>PROVIDER</Text>
          </Text>
        </LinearGradient>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.serviceSeekerWrapper, styles.serviceWrapperShadowBox]}>
          <LinearGradient
            style={styles.linearGradient}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0,
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
    top: 466,
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  serviceProvider: {
    top: 44,
    left: 11,
    width: 263,
    height: 58,
  },
  serviceProviderWrapper: {
    top: 285,
    borderColor: Color.colorBlack,
    borderRadius: 0,
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
  linearGradient: {
    flex: 1,
    borderRadius: 0,
  },
});

export default UserRoleScreen;
