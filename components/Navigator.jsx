import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Navigator = () => {
  const [activeTab, setActiveTab] = useState("Review"); // State to track active tab

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    // Handle logic to show corresponding content based on the tabName
  };

  return (
    <View style={styles.navigator}>

      <TouchableOpacity onPress={() => handleTabPress("Description")}>
        <Text style={[styles.tabText, activeTab === "Description" && styles.activeTab]}>Description</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress("Post")}>
        <Text style={[styles.tabText, activeTab === "Post" && styles.activeTab]}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress("Review")}>
        <Text style={[styles.tabText, activeTab === "Review" && styles.activeTab]}>Review</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress("Photos")}>
        <Text style={[styles.tabText, activeTab === "Photos" && styles.activeTab]}>Photos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabText: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    lineHeight: 13,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "relative",
    marginHorizontal: 25,
  },
  activeTab: {
    fontWeight: "bold", // You can customize the styling for active tab
    textDecorationLine: "underline",
    color: "#07374d",
  },
  navigator: {
    backgroundColor: Color.colorWhite,
    width: windowWidth,
    height: 40,
    overflow: "hidden",
    flexDirection: "row", // Arrange tabs horizontally
    alignItems: "center", // Align items vertically at the center
    justifyContent: "center", // Horizontally center the tabs
  },
});

export default Navigator;
