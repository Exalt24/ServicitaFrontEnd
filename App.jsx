import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserScreen from './Screens/UserScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './DrawerContent';
import SplashScreen from 'react-native-splash-screen';
import LoginPage from './Screens/Login&Register/Login';
import RegisterPage from './Screens/Login&Register/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', borderLeftWidth: 7, width: '90%', height: 70, borderRadius: 15, borderRightColor: 'green', borderRightWidth: 7, borderBottomColor: 'green', borderBottomWidth: 7, borderTopColor: 'green', borderTopWidth: 7}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{ borderLeftColor: 'red', borderLeftWidth: 7, width: '90%', height: 70, borderRadius: 15, borderRightColor: 'red', borderRightWidth: 7, borderBottomColor: 'red', borderBottomWidth: 7, borderTopColor: 'red', borderTopWidth: 7}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

const StackNav = ()=>{
    const Stack = createNativeStackNavigator();
    const Navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            statusBarColor: 'blue',
            headerStyle: {
                backgroundColor: 'blue'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft:() => {
                return (
                    <Icon
                    name = 'menu'
                    onPress = {() => Navigation.dispatch(DrawerActions.openDrawer())}
                    size = {30}
                    color = "#fff"/>
                )
            }}}>
            <Stack.Screen name = 'Home' component = {HomeScreen} />
            <Stack.Screen name = 'Profile' component = {ProfileScreen} />
            <Stack.Screen name = 'User' component = {UserScreen} screenOptions = {{
                headerShown: false
            }} />
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'Login' component = {LoginPage} />
        <Stack.Screen name = 'Register' component = {RegisterPage} />
        {/* <Stack.Screen name = 'Home' component = {DrawerNav} /> */}
    </Stack.Navigator>)
    
}

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    async function checkIfLoggedIn(){
        const data = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(data);
    }

    useEffect(() => {
        checkIfLoggedIn();
        setTimeout(() => {
            SplashScreen.hide()
        }, 500)
    }, []);

    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            {isLoggedIn ? <DrawerNav /> : <LoginNav />}
            <Toast config = {toastConfig}/>
        </NavigationContainer>

    );
}

export default App;