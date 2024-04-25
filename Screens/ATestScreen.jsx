import React from "react";
import { View, StyleSheet } from "react-native";
import RealTimeInfoSeeker from "../components/RealTimeInfoSeeker";
import RealTimeInfoProvider from "../components/RealTimeInfoProvider";

const ATestScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.seekerInfo}>
        <RealTimeInfoSeeker />
      </View>
      <View style={styles.providerInfo}>
        <RealTimeInfoProvider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff",
  },
  seekerInfo: {
    position: "absolute",
    top: 90,
  //  alignItems: "center",
    
  },
  providerInfo: {
    position: "absolute",
    top: 200,
  //  alignItems: "center",
    
  },
});

export default ATestScreen;
