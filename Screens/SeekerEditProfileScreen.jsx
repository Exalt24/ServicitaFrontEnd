import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

function SeekerEditProfileScreen(props){
  const [firstName, setFirstName] = useState("Carl");
  const [lastName, setLastName] = useState("Asoy");
  const [contactNumber, setContactNumber] = useState("1234567890");
  const [email, setEmail] = useState("carl@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(new Date(1990, 0, 1)); // Initial birthdate value
  const [address, setAddress] = useState("123 Main St");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker modal

  const updateImage = () => {
    // Implement save functionality here
    console.log("changeeee");
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker modal
    if (selectedDate) {
      setBirthdate(selectedDate); // Set the selected date as the birthdate
    }
  };
  const handleSave = () => {
    // Implement save functionality here
    console.log("saveeeee");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.seekereditprofile}>
        <Pressable onPress={updateImage} style={styles.seekereditprofileChild}>
        <View  />
        <Image
          style={styles.image14Icon}
          contentFit="cover"
          source={require("../assets/image-14.png")}
        />
        <Text style={styles.carlWyndelAsoy}>Carl Wyndel Asoy</Text>
        <View style={[styles.vectorParent, styles.frameChildLayout]}>
          <Image
            style={[styles.frameChild, styles.frameChildLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-517.png")}
          />
          <Image
            style={styles.cameraIcon}
            contentFit="cover"
            source={require("../assets/camera.png")}
          />
        </View>
        </Pressable>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="Contact Number"
          />
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text style={styles.inputLabel}>Birthdate</Text>
            <TextInput
              style={[styles.input, styles.birthdateText]} // Added birthdateText style
              value={birthdate.toLocaleDateString()}
              editable={false}
            />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="New Password"
          />
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <LinearGradient
            colors={['#7CC2E3', '#3b5998', '#002F45']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seekereditprofileChild: {
    top: 0,
    left: 0,
    backgroundColor: Color.colorDarkslategray_100,
    width: 430,
    height: 151,
    position: "absolute",
  },
  image14Icon: {
    top: 76,
    left: 27,
    width: 145,
    height: 141,
    position: "absolute",
  },
  carlWyndelAsoy: {
    top: 106,
    left: 169,
    fontSize: FontSize.size_6xl,
    fontWeight: "600",
    fontFamily: FontFamily.quicksandSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    width: 261,
    position: "absolute",
  },
  frameChild: {
    left: 0,
    top: 0,
  },
  cameraIcon: {
    top: 13,
    left: 16,
    width: 19,
    height: 24,
    position: "absolute",
  },
  vectorParent: {
    top: 176,
    left: 131,
  },
  frameChildLayout: {
    height: 41,
    width: 41,
    position: "absolute",
  },

  seekereditprofile: {
    backgroundColor: Color.colorWhite,
    width: "100%",
    minHeight: 932,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    flex: 1,
  },
  inputContainer: {
    marginTop: 240, // Adjust the margin here to lower the text fields
  },
  inputLabel: {
    marginBottom: 0,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    width: 300, // Adjust the width as needed
    color: '#002F45', // Change the text color here
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#002F45',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  birthdateText: {
    color: '#002F45', // Same text color as other fields
  },
  saveButton: {
    marginTop: 20, // Adjust the marginTop to lower the button
    marginBottom: 100,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SeekerEditProfileScreen;
