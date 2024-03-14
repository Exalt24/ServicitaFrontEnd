import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);

    const isEmailValid = email.length > 0 && emailVerify;

    const handlePress = () => {
        if (isEmailValid) {
            // Perform password recovery process
        } else {
            // Show error message for invalid email
            alert("Please enter a valid email address.");
        }
    };

    const handleEmailChange = (e) => {
        // Trim email and perform email validation
        const trimmedEmail = e.nativeEvent.text.trim();
        setEmail(trimmedEmail);
        setEmailVerify(trimmedEmail.length > 1 && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(trimmedEmail));
    };
    

    return (
        <View style={styles.forgetpasswordscreen}>
            <Text style={[styles.passwordRecovery, styles.passwordFlexBox]}>
                Password recovery
            </Text>
            <Text style={[styles.enterYourEmail, styles.passwordFlexBox]}>
                Enter your email to recover your password
            </Text>

            <View style={[styles.emailInputContainer, styles.childBorder]}>
                <Ionicons name="mail" size={24} color={Color.colorDarkslategray_200} style={styles.emailIcon} />
                <TextInput
                    style={styles.emailInput}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
                {email.length < 1 ? null : emailVerify ? (
                    <Feather name="check-circle" color="green" size={20} style={styles.validationIcon} />
                ) : (
                    <Feather name="x-circle" color="red" size={20} style={styles.validationIcon} />
                )}
            </View>
            {email.length < 1 ? null : emailVerify ? null : (
                <Text style={styles.errorMsg}>Please enter a valid email address.</Text>
            )}

            <LinearGradient
                style={styles.continueButton}
                locations={[0, 1]}
                colors={["#4e8daa", "#023349"]}
            >
                <TouchableOpacity
                    style={[styles.continueButtonInner, !isEmailValid && styles.disabledButton]}
                    onPress={handlePress}
                    disabled={!isEmailValid}
                >
                    <Text style={styles.contText}>Recover Password</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    passwordFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: 23,
        position: "absolute",
    },
    frameChildLayout: {
        height: hp('7%'),
        width: wp('80%'),
    },
    childBorder: {
        borderStyle: "solid",
        position: "absolute",
    },
    passwordRecovery: {
        top: hp('22%'),
        left: wp('18%'),
        fontSize: FontSize.size_6xl,
        color: Color.colorDarkslategray_100,
        width: wp('70%'),
        height: hp('3%'),
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: hp('4%'),
    },
    enterYourEmail: {
        top: hp('26%'),
        left: wp('6%'),
        fontSize: FontSize.size_mini,
        letterSpacing: 1.1,
        fontWeight: "300",
        fontFamily: FontFamily.quicksandLight,
        color: Color.colorBlack,
        width: wp('90%'),
        height: hp('3%'),
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: hp('3.5%'),
    },
    frameChild: {
        top: 0,
        left: 0,
        borderRadius: Border.br_7xs,
        shadowColor: "#afc7d2",
        shadowOffset: {
            width: wp('1%'),
            height: hp('1.5%'),
        },
        shadowRadius: wp('1%'),
        elevation: 3,
        shadowOpacity: 1,
        borderColor: Color.colorDarkslategray_200,
        borderWidth: 0.2,
        backgroundColor: "transparent",
        height: hp('7%'),
        width: wp('80%'),
    },
    recoverPassword: {
        top: hp('2%'),
        left: wp('9%'),
        fontSize: FontSize.size_5xl,
        color: Color.colorWhite,
        width: wp('60%'),
        height: hp('4%'),
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
        lineHeight: hp('4%'),
    },
    rectangleParent: {
        top: hp('56%'),
        left: wp('20%'),
        position: "absolute",
        width: wp('80%'),
    },
    forgetpasswordscreenChild: {
        top: hp('34%'),
        left: wp('18%'),
        backgroundColor: Color.colorGainsboro,
        borderColor: Color.colorGray_100,
        borderWidth: 1,
        width: wp('84%'),
        height: hp('6%'),
    },
    forgetpasswordscreen: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    emailInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.colorGainsboro,
        borderColor: Color.colorDarkslategray_100,
        borderWidth: 1,
        width: wp('84%'),
        height: hp('6%'),
        top: hp('38%'),
        left: wp('8%'),
    },
    emailInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: wp('2%'), // Add padding for text input
    },
    emailIcon: {
        marginHorizontal: wp('2%'), // Adjust icon position
    },
    validationIcon: {
        marginHorizontal: wp('2%'), // Adjust icon position
    },
    continueButton: {
        width: wp('80%'),
        height: hp('7%'),
        borderRadius: 6,
        overflow: "hidden",
        position: "absolute",
        top: hp('85%'),
        left: wp('10%'),
        ...Platform.select({
          android: {
            elevation: 4,
          },
        }),
      },
      continueButtonInner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
      contText: {
        color: "white",
        fontSize: wp('5%'),
        fontWeight: "700",
        fontFamily: FontFamily.quicksandBold,
      },
      errorMsg: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        top: hp('44%'), // Adjust the position according to your layout
        left: wp('8%'), // Adjust the position according to your layout
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default ForgotPasswordScreen;