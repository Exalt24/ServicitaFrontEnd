import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, ScrollView, StyleSheet,  Dimensions, Pressable } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ProfileScreen(props) {

  
  const navigation = useNavigation();
  const route = useRoute();
  console.log(props);
  const [userData, setUserData] = useState("");
  const [storeData, setStoreData] = useState("");

  const signOut = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('token');
  
      const exitLoggedIn = await AsyncStorage.getItem('exitButLoggedIn');
        // User exited the app but was still logged in so redirect to login screen when logging out from user opening the app again
      if (exitLoggedIn) {
        await AsyncStorage.removeItem('exitButLoggedIn');
        navigation.navigate('Login')
      } // Same Session Logout
      else {
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }));
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
   /*

  async function getUserData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios.post("http://172.16.3.248:5000/user/userdata", {token: token}).then((res) => {
      console.log(res.data);
      setUserData(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  async function getStoreData() {
    try {
      const userRef = firestore().collection('users').doc(userData._id); // Assuming token is the document ID
      const doc = await userRef.get();
      if (doc.exists) {
        const storedData = doc.data();
        console.log(storedData);
        setStoreData(storedData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting user data from Firestore:', error);
    }
  }

  useEffect(() => {
    getStoreData();
  }, [userData]);

  useEffect(() => {
    if (route.params && route.params.userData) {
      // Update state with the updated data
      const { name, email, mobile, birthdate, address } = route.params.userData;
      setStoreData({ name, email, mobile, birthdate, address });
    } else {
      getUserData();
    }
  }, [route.params]);

  */

  const GoTo = () => {
    // Handle navigation logic here
    navigation.navigate("EditProfile"); // Replace "NextScreen" with the name of the screen you want to navigate to
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileScreen}>
      <View style={styles.profileScreenChild} />
      <View style={[styles.profileScreenItem, styles.myAccountPosition]} />
      <ImageBackground
        style={styles.image14Icon}
        resizeMode="cover"
        source={require("../assets/image-14.png")}
      />
      <Text style={styles.carlWyndelAsoy}>{storeData.name}</Text>
      <Text style={[styles.rewards, styles.rewardsTypo]}>Rewards</Text>
      <Text style={styles.general}>General</Text>
      
      <Image
        style={styles.profileScreenInner}
        resizeMode="cover"
        source={require("../assets/rectangle-468.png")}
      />
      <View style={[styles.lineView, styles.lineViewLayout]} />
      <View style={[styles.lineView1, styles.lineViewLayout]} />
      <View style={[styles.profileScreenChild1, styles.lineViewLayout]} />
      <View style={[styles.termsConditionsParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Terms & Conditions</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.settingsParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Settings</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.helpCenterParent, styles.parentLayout]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Help Center</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.emergencyContactsParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Emergency Contacts</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.bookingScheduledParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Booking Scheduled</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.paymentMethodParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Payment Method</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <View style={[styles.favouritesParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Favourites</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
      <Pressable onPress={GoTo}>
      <View style={[styles.myAccountParent, styles.parentLayout]}>
        <Pressable onPress={GoTo} style={styles.innerPressable}>
          <Text style={[styles.myAccount, styles.rewardsTypo]}>My Account</Text>
          <Image
            style={[styles.image130Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/image-127.png")}
          />
        </Pressable>
      </View>
    </Pressable>
      <View style={[styles.shareFeedbackParent, styles.parentLayout1]}>
        <Text style={[styles.termsConditions, styles.logOutTypo]}>Share Feedback</Text>
        <Image
          style={[styles.image130Icon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/image-127.png")}
        />
      </View>
    </View>
    <Text style={[styles.logOut, styles.logOutTypo]} onPress={signOut}>Log out</Text>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileScreen: {
    flex: 1,
    width: windowWidth, 
    height: windowHeight, 
    overflow: 'hidden',
    backgroundColor: Color.colorWhite,
  },
  myAccountPosition: {
  left: windowWidth * 0.0001, 
  top: windowHeight * 0.0001, 
},
  rewardsTypo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  logOutTypo: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.quicksandRegular,
    textAlign: "left",
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  lineViewLayout: {
    height: 1,
    width: windowWidth - 55,
    borderTopWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: "solid",
    position: "absolute",
  },
  parentLayout1: {
    height: 18,
    width: windowWidth - 100,
    left: 44,
    position: "absolute",
  },
  
  iconPosition: {
    top: 2,
    height: 14,
    width: 4,
    position: "absolute",
  },
  iconLayout: {
    top: 26,
    height: 14,
    width: 4,
    position: "absolute",
  },
  parentLayout: {
    width: windowWidth - 100,
    height: 18,
    left: 43,
    position: "absolute",
  },
  
  profileScreenItem: {
    backgroundColor: "#05364c",
    width: windowWidth,
    height: windowHeight * 0.16,
    position: "absolute",
  },
  image14Icon: {
    top: windowHeight * 0.08,
    width: windowHeight  * 0.17,
    height: windowHeight * 0.17,
    left: windowWidth * 0.065,
    position: 'absolute',
  },
  carlWyndelAsoy: {
    top: windowHeight * 0.11,
    left: windowWidth * 0.35,
    fontSize: 25,
    color: Color.colorWhite,
    textAlign: 'center',
    width: windowWidth * 0.6,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: '600',
    position: 'absolute',
  },
  rewards: {
    left: windowWidth * 0.1,
    textAlign: 'left',
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    top: windowHeight * 0.285,
  },
  general: {
    top: windowHeight * 0.64,
    left: windowWidth * 0.1,
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  logOut: {
    top: windowHeight * 0.865, 
    left: windowWidth * 0.110, 
  },
  profileScreenInner: {
    left: windowWidth * 0.86,
    width: windowWidth * 0.08,
    height: windowHeight * 0.021,
    top: windowHeight * 0.283,
    position: 'absolute',
  },
  lineView: {
    top: windowHeight * 0.335,
    left: windowWidth * 0.0625,
  },
  lineView1: {
    top: windowHeight * 0.395,
    left: windowWidth * 0.0625,
  },
  profileScreenChild1: {
    top: windowHeight * 0.61,
    left: windowWidth * 0.0615,
  },
  termsConditions: {
    left: windowWidth * 0.0001, 
    top: windowHeight * 0.0001,
  },
  
  termsConditionsParent: {
    top: windowHeight * 0.775, 
  },
  settingsParent: {
    top: windowHeight * 0.730,
  },
  
  helpCenterParent: {
    top: windowHeight * 0.685,
  },
  emergencyContactsParent: {
    top: windowHeight * 0.555,
  },
  bookingScheduledParent: {
    top: windowHeight * 0.505,
  },
  paymentMethodParent: {
    top: windowHeight * 0.460,
  },
  favouritesParent: {
    top: windowHeight * 0.415,
  },
  myAccount: {
  left: windowWidth * 0, 
  top: windowHeight * 0.03, 
},
  myAccountParent: {
    top: windowHeight * 0.325,
  },
  shareFeedbackParent: {
    top: windowHeight * 0.825,
  },


  
  image130Icon: {
    left: windowWidth * 0.790, 
    top: windowHeight * 0.002, 
  },


  innerPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;