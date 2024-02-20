import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function LoginPage(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateFields = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = () => {
        const userData = {
            email: email,
            password: password,
        }
        axios.post("http://192.168.1.2:5000/user/login", userData).then((res) => {
        console.log(res.data)
        if (res.data.status === 'SUCCESS') {
            Alert.alert( 'Success', 'You have successfully logged in.', [{ text: 'OK' }]);
        }
    }).catch((err) => {
        if(err.response.data.message === "Email has not been verified yet."){
            Alert.alert('Error', 'Email has not been verified yet.', [{ text: 'OK' }]);
        } else if (err.response.data.message === "Invalid credentials entered!"){
            Alert.alert('Error', 'Invalid credentials entered!', [{ text: 'OK' }]);
        } else if (err.response.data.message === "Invalid password entered!"){
            Alert.alert('Error', 'Invalid password entered!', [{ text: 'OK' }]);
        } else {
            Alert.alert('Error', 'An error occurred while processing your request. Please try again later.', [{ text: 'OK' }]);
        }
        });
    }

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/Logo.png')}/>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Login</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user" color='#38AEE6' style={styles.smallIcon} />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            onChange={e => setEmail(e.nativeEvent.text)}
                        /> 
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color='#38AEE6' style={styles.smallIcon} />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            onChange={e => setPassword(e.nativeEvent.text)}
                        /> 
                    </View>
                    <View style={styles.click_footer_view}>
                        <Text style={{...styles.click_footer, color: '#38AEE6'}}>Forgot password?</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.inBut, !validateFields() && styles.disabledButton]}
                        onPress={() => validateFields() && handleSubmit()}>
                        <View>
                            <Text style={styles.textSign}>Register</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{padding: 15}}>
                        <Text style={{...styles.click_footer_two, color: '#919191'}}>
                            ---Or Login Using---
                        </Text>
                    </View>
                    <View style={styles.bottomButton}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.inBut2}>
                                <FontAwesome name="user-circle-o" color='#fff' style={styles.smallIcon2} />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Guest</Text>                    
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.inBut2}>
                                <FontAwesome name="facebook-f" color='#fff' style={styles.smallIcon2} />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Facebook</Text>                    
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.inBut2}>
                                <FontAwesome name="google" color='#fff' style={styles.smallIcon2} />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Google</Text>                    
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.inBut2}>
                                <FontAwesome name="twitter" color='#fff' style={styles.smallIcon2} />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Twitter</Text>                    
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ ...styles.bottomText, color: '#919191' }}>
                            Don't have an account?{' '}
                            <Text style={{ textDecorationLine: 'underline', color: '#38AEE6' }} onPress={() => {navigation.navigate('Register')}}>
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

export default LoginPage;
