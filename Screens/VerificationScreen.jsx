import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";



function VerificationScreen(props) {

    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const handleVerifyPress = () => {
        console.log("verify");;
    };
    
    const handleSendAgainPress = () => {
        console.log("send again");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.verificationscreen}>
            <View style={[styles.frame1, styles.frameLayout2]}>
                <View style={[styles.frame2, styles.frameLayout2]}>
                    <Text style={[styles.checkYourPhone, styles.sendAgainFlexBox]}>
                        Check your phone
                    </Text>
                    <Text style={[styles.weveSentThe, styles.verifyFlexBox]}>
                        We’ve sent the code to your phone
                    </Text>
                </View>
            </View>
            <View style={styles.frame}>
                <Text style={styles.codeExpiresIn}>Code expires in: {formatTime(timer)}</Text>
            </View>
            <TouchableOpacity onPress={handleVerifyPress}>
                <LinearGradient
                    style={[styles.verifyWrapper, styles.wrapperShadowBox]}
                    locations={[0, 1]}
                    colors={["#4e8daa", "#023349"]}
                >
                    <Text style={[styles.verify, styles.verifyLayout]}>Verify</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSendAgainPress}>
                <View style={[styles.sendAgainWrapper, styles.wrapperShadowBox]}>
                    <Text style={[styles.sendAgain, styles.sendAgainFlexBox]}>
                        Send Again
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.frame3, styles.frameLayout1]}>
                <TextInput
                    style={[styles.frameChild, styles.textInput, styles.textInputText]}
                    keyboardType="numeric" // Restrict input to numeric characters
                    maxLength={1} // Limit input to 1 character
                />
                <TextInput
                    style={[styles.frameItem, styles.textInput, styles.textInputText]}
                    keyboardType="numeric" // Restrict input to numeric characters
                    maxLength={1} // Limit input to 1 character
                />
                <TextInput
                    style={[styles.frameInner, styles.textInput, styles.textInputText]}
                    keyboardType="numeric" // Restrict input to numeric characters
                    maxLength={1} // Limit input to 1 character
                />
                <TextInput
                    style={[styles.rectangleView, styles.textInput, styles.textInputText]}
                    keyboardType="numeric" // Restrict input to numeric characters
                    maxLength={1} // Limit input to 1 character
                />
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    verificationscreen: {
        flex: 1,
        width: "100%",
        height: 932,
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
    },
    frame1: {
        top: 198,
        left: 56,
        width: 318,
    },
    frame2: {
        left: 20,
        width: 298,
        top: 0,
    },
    frameChild: {
        left: 0,
    },
    frameItem: {
        left: 74,
    },
    frameInner: {
        left: 148,
    },
    rectangleView: {
        left: 222,
    },
    frame4: {
        width: 282,
        left: 0,
        top: 0,
    },
    frame3: {
        top: 315,
        left: 71,
        width: 288,
    },
    checkYourPhone: {
        left: 34,
        fontSize: 25,
        width: 229,
        height: 39,
        top: 0,
    },
    weveSentThe: {
        top: 39,
        height: 31,
        width: 298,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        color: Color.colorBlack,
        fontFamily: FontFamily.quicksandLight,
        fontWeight: "300",
        letterSpacing: 1.1,
        fontSize: FontSize.size_mini,
        left: 0,
    },
    frame: {
        top: 427,
        left: 61,
        width: 308,
        height: 15,
        position: "absolute",
        overflow: "hidden",
    },
    codeExpiresIn: {
        width: 298,
        textAlign: "center",
        lineHeight: 15,
        color: Color.colorBlack,
        fontFamily: FontFamily.quicksandLight,
        fontWeight: "300",
        letterSpacing: 1.1,
        fontSize: FontSize.size_mini,
        left: 0,
        top: 0,
        height: 15,
        position: "absolute",
    },
    verify: {
        color: Color.colorWhite,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: 30,
        position: "absolute",
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        height: 37,
        width: 136,
        fontSize: FontSize.size_5xl,
        left: 75,
        top: 8,
    },
    verifyWrapper: {
        top: 540,
        borderColor: "#0e4c69",
        backgroundColor: "transparent",
    },
    sendAgain: {
        height: 37,
        width: 136,
        fontSize: FontSize.size_5xl,
        left: 75,
        top: 8,
        color: Color.colorDarkslategray_100,
    },
    sendAgainWrapper: {
        top: 614,
        borderColor: Color.GRAY_LIGHT,
        backgroundColor: Color.colorWhite,
        height: 54,
        width: 286,
        borderWidth: 0.2,
        borderStyle: "solid",
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowColor: "#afc7d2",
        borderRadius: Border.br_7xs,
        left: 72,
    },
    wrapperShadowBox: {
        height: 54,
        width: 286,
        borderWidth: 0.2,
        borderStyle: "solid",
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 3,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowColor: "#afc7d2",
        borderRadius: Border.br_7xs,
        left: 72,
        position: "absolute",
    },
    verifyLayout: {
        height: 37,
        width: 136,
        fontSize: FontSize.size_5xl,
        left: 75,
        top: 8,
    },
    sendAgainFlexBox: {
        color: Color.colorDarkslategray_100,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 30,
        position: "absolute",
    },
    frameLayout2: {
        height: 70,
        position: "absolute",
        overflow: "hidden",
    },
    verifyFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: 20,
        position: "absolute",
    },
    frameLayout1: {
        height: 60,
        position: "absolute",
        overflow: "hidden",
    },
    textInput: {
        width: 60,
        borderWidth: 1,
        borderColor: Color.colorGray,
        backgroundColor: Color.colorGainsboro,
        borderRadius: Border.br_3xs,
        height: 60,
        textAlign: 'center',
        top: 0,
        position: 'absolute',
    },
    textInputText: {
        color: Color.colorSteelblue, // Set text color to blue
        fontWeight: 'bold', // Set font weight to bold
        fontSize: 30, // Set font size to 24
    },
});

export default VerificationScreen;
