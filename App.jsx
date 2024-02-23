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
import { set } from 'date-fns';


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
        </NavigationContainer>

    );
}

export default App;