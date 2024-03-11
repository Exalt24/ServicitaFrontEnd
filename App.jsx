import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import DrawerContent from './DrawerContent';

import UserRoleScreen from './Screens/UserRoleScreen';
import LoginPage from './Screens/Login&Register/Login';
import RegisterPage from './Screens/Login&Register/Register';
import HomeScreen from './Screens/HomeScreen';
import BookingScreen from './Screens/BookingScreen';
import MessageScreen from './Screens/MessageScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserScreen from './Screens/UserScreen';
import SeekerEditProfileScreen from './Screens/SeekerEditProfileScreen';
import ProviderProfileScreen from './Screens/ProviderProfileScreen';
import ProviderEditProfileScreen from './Screens/ProviderEditProfileScreen';
import VerificationScreen from './Screens/VerificationScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Color} from "./GlobalStyles";

console.log(Constants.systemFonts);

// SplashScreen.preventAutoHideAsync()
//   .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
//   .catch(console.warn); // it's good to explicitly catch and inspect any error

const StackNav = ()=>{
    const Stack = createNativeStackNavigator();
    const Navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            //headerShown: false,
            statusBarColor: 'blue',
            headerStyle: {
                backgroundColor: 'blue'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft:() => {
                return (
                    <Entypo
                    name = 'menu'
                    onPress = {() => Navigation.dispatch(DrawerActions.openDrawer())}
                    size = {30}
                    color = "#fff"/>
                )
            }}}>
            <Stack.Screen name = 'Home' component = {HomeScreen} />
            <Stack.Screen name = 'Booking' component = {BookingScreen} />
            <Stack.Screen name = 'Message' component = {MessageScreen} />
            <Stack.Screen name = 'Profile' component = {ProfileScreen} />
            <Stack.Screen name = 'User' component = {UserScreen} />
            <Stack.Screen name = 'Login' component = {LoginNav} />
        </Stack.Navigator>
    );
}

const DrawerNav = ()=>{
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props}/>} screenOptions={{
            headerShown: false}}>
            <Drawer.Screen name = "Home" component = {StackNav} />
        </Drawer.Navigator>
    )
    
}

const LoginNav = ()=>{
    const Stack = createNativeStackNavigator();
    return(
    <Stack.Navigator initial initialRouteName = 'VerificationScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'UserRole' component = {UserRoleScreen} />
        <Stack.Screen name = 'Login' component = {LoginPage} />
        <Stack.Screen name = 'Register' component = {RegisterPage} />
        <Stack.Screen name = 'Home' component = {TabNavigator} />
        <Stack.Screen name = 'ProviderProfileScreen' component = {ProviderProfileScreen} />
        <Stack.Screen name = 'SeekerEditProfileScreen' component = {SeekerEditProfileScreen} />
        <Stack.Screen name = 'ProviderEditProfileScreen' component = {ProviderEditProfileScreen} />
        <Stack.Screen name = 'VerificationScreen' component = {VerificationScreen} />

        {/* <Stack.Screen name = 'Home' component = {DrawerNav} /> */}
    </Stack.Navigator>)
    
}
const TabNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const tabBarIcon = (imageSource) => ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
            {focused && (
                <View
                    style={{position: 'absolute', width: 65, height: 73, backgroundColor: '#47ACC8', borderRadius: 7, top: -10, zIndex: -1,}}
                />
            )}
            <Image
                source={imageSource}
                style={{height: 40, width: 40, tintColor: focused ? Color.WHITE : undefined,}}
            />
        </View>
    );

    return (
        <Tab.Navigator
            initialRouteName='Home' screenOptions={{ headerShown: false, tabBarStyle: { display: 'flex', backgroundColor: 'white', height: 70 }, tabBarItemStyle: { paddingBottom: 10, paddingTop: 18 }}}
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{
                title: '',
                tabBarIcon: tabBarIcon(require("./assets/home.png")),
                tabBarActiveTintColor: Color.ORANGE,
            }} />
            <Tab.Screen name='Booking' component={BookingScreen} options={{
                title: '',
                tabBarIcon: tabBarIcon(require("./assets/booking.png")),
                tabBarActiveTintColor: Color.ORANGE,
            }} />
            <Tab.Screen name='Message' component={MessageScreen} options={{
                title: '',
                tabBarIcon: tabBarIcon(require("./assets/message.png")),
                tabBarActiveTintColor: Color.ORANGE,
            }} />
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                title: '',
                tabBarIcon: tabBarIcon(require("./assets/profile.png")),
                tabBarActiveTintColor: Color.ORANGE,
            }} />
        </Tab.Navigator>
    );
};



function App() {

  const [appIsReady, setAppIsReady] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
    
    
    async function checkIfLoggedIn(){
        const data = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(data);
    }

    useEffect(() => {
      
      // async function prepare() {
      //     try {
      //         // Pre-load fonts, make any API calls you need to do here
      //         await Font.loadAsync(Entypo.font);
      //         // Artificially delay for two seconds to simulate a slow loading
      //         // experience. Please remove this if you copy and paste the code!
      //         await new Promise(resolve => setTimeout(resolve, 1000));
      //     } catch (e) {
      //         console.warn(e);
      //     } finally {
      //         // Tell the application to render
      //         setAppIsReady(true);  // Assuming you want to show the app as ready after loading fonts
      //         await SplashScreen.hideAsync();
      //     }
      // }
      GoogleSignin.configure({
        webClientId: "916162526509-cafrd93roeekc80suoporajs002l5l9q.apps.googleusercontent.com"
      });
      checkIfLoggedIn();
      // prepare();
    }, []);

    
    const Stack = createNativeStackNavigator();



    
    return(
        <>
            <NavigationContainer>
                {isLoggedIn ? <DrawerNav /> : <LoginNav />}
            </NavigationContainer>
          
        </>

    );
}

export default App;