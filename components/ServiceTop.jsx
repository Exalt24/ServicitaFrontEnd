import * as React from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import  { useState } from "react";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ServiceTop= () => {
  const [price, setPrice] = useState("499");
  const [serviceName, setServiceName] = useState("Hair and Make UP - Eunice Enrera Makeup Artistry");

  return (
    <View style={styles.serviceview}>


      <View style={styles.positioncontainer}>

        <Text style={styles.price}>
            <Text style={styles.sign}>₱</Text>
            <Text style={styles.Price}>{price}</Text>
        </Text>

        <Text style={[styles.service]}>
          {serviceName}
        </Text>

      </View>


      <View style={[styles.book, styles.bookPosition]}>
        <View style={[styles.bookChild, styles.childShadowBox]} />
        
        {/*bookIcon*/}
        <View style={[styles.bookicon, styles.bookiconLayout]}>
          <View style={[styles.rectangleParent, styles.bookiconLayout]}>
            <LinearGradient
              style={[styles.groupChild, styles.bookiconLayout]}
              locations={[0.1, 1]}
              colors={["#78bddd", "#3c5b6a"]}
            />
            <View style={[styles.groupItem, styles.groupItemLayout]} />
            <View style={[styles.groupInner, styles.groupPosition]} />
            <View style={[styles.rectangleView, styles.groupItemLayout]} />
            <View style={[styles.groupChild1, styles.groupPosition]} />
            <View style={[styles.groupChild2, styles.groupChildPosition]} />
            <View style={styles.groupChild3} />
            <View style={[styles.groupChild4, styles.groupChildPosition]} />
          </View>
        </View>

        <Text style={[styles.bookNow]}>Book Now</Text>
      </View>


      <View style={[styles.message, styles.bookPosition]}>
        <View style={[styles.messageChild, styles.childShadowBox]} />
        <Text style={[styles.message1, styles.message1Position]}>Message</Text>
        <Image
          style={[styles.messageicon, styles.message1Position]}
          contentFit="cover"
          source={require("../assets/messageicon.png")}
        />
      </View>


      <Text style={[styles.addToFavorites, styles.serviceTypo]}>
        Add to Favorites
      </Text>


      <Image
        style={[styles.serviceimageIcon, styles.servicePosition]}
        contentFit="cover"
        source={require("../assets/serviceimage.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceTypo: {
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    textAlign: "left",
    position: "absolute",
  },
  bookPosition: {
    top: windowHeight * 0.51,
//    left: windowWidth * 0.5,
    height: 30,
    position: "absolute",
  },
  childShadowBox: {
    shadowOpacity: 2,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.8)",
    top: 0,
    height: 30,
    width: 93,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  bookiconLayout: {
    width: 21,
    height: 18,
    position: "absolute",
  },
  groupItemLayout: {
    height: 5,
    width: 5,
    left: 2,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  groupPosition: {
    left: 14,
    height: 5,
    width: 5,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  groupChildPosition: {
    left: 8,
    height: 5,
    width: 5,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  message1Position: {
    top: 7,
    position: "absolute",
  },
  servicePosition: {
    top: 0,
    left: 0,
  },
  sign: {
    fontWeight: "500",
    fontFamily: FontFamily.quicksandMedium,
    width: "100%"
  },
  Price: {
    fontFamily: FontFamily.questrialRegular,
    width: "100%"
  },

  price: {
    top: windowHeight * 0.055,
    fontSize: 32,
    letterSpacing: 1.6,
    lineHeight: 35,
    color: "#266f92",
    height: 30,
    textAlign: "left",
    width: windowWidth * 0.6,
    alignItems: "center",
    display: "flex",
    left: 0,
    position: "absolute",
  },
  service: {
    fontSize: 20,
    letterSpacing: 1,
    lineHeight: 20,
    width: 383,
    height: 53,
    top: 0,
    left: 0,
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    textAlign: "left",
    position: "absolute",
  },
  positioncontainer: {
    top: windowHeight * 0.565,
    left: 25,
    width: 380,
    height: 85,
    position: "absolute",
  },
  bookChild: {
    left: 89,
  },
  groupChild: {
    backgroundColor: "transparent",
    height: 18,
    top: 0,
    left: 0,
  },
  groupItem: {
    borderTopLeftRadius: Border.br_11xs,
    top: 5,
  },
  groupInner: {
    borderTopRightRadius: Border.br_11xs,
    top: 5,
  },
  rectangleView: {
    borderBottomLeftRadius: Border.br_11xs,
    top: 11,
  },
  groupChild1: {
    borderBottomRightRadius: Border.br_11xs,
    top: 11,
  },
  groupChild2: {
    top: 11,
  },
  groupChild3: {
    top: 2,
    left: 4,
    width: 14,
    height: 1,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  groupChild4: {
    top: 5,
  },
  rectangleParent: {
    height: 18,
    top: 0,
    left: 0,
  },
  bookicon: {
    left: 94,
    height: 18,
    top: windowHeight * 0.006,
  },
  bookNow: {
    top: 8,
    left: windowWidth * 0.29,
    position: "absolute",
    textAlign: "center",
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.quicksandRegular,
  },
  book: {
    left: windowWidth * 0.52,
    width: windowWidth * 0.424,
  },
  messageChild: {
    left: 0,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
  message1: {
    left: windowWidth * 0.075,
    width: 52,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.quicksandRegular,
  },
  messageicon: {
    left: windowWidth * 0.014,
    width: windowWidth * 0.058, 
    height: windowHeight * 0.018,
  },
  message: {
    left: windowWidth * 0.5,
    top: windowHeight * 0.74, 
    width: 93,
    top: 450,
  },
  addToFavorites: {
    top: windowHeight * 0.52,
    left:windowWidth * 0.123,
    fontSize: 11.5,
    letterSpacing: 0.5,
    lineHeight: 13,
    width: 100,
    height: 15,
    alignItems: "center",
    display: "flex",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
  },
  serviceimageIcon: {
    borderBottomRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
    height: windowHeight * 0.5,
    position: "absolute",
    width: windowWidth,
    flex: 1, // Fill available space
    resizeMode: 'cover',
  },
  serviceview: {
    height:  windowHeight * 0.67,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default ServiceTop;
