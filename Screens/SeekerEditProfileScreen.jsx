import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert, Modal, TouchableWithoutFeedback  } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function SeekerEditProfileScreen(props){
  const [userData, setUserData] = useState("");
  const [storeData, setStoreData] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState('+63');
  const [birthdate, setBirthdate] = useState(new Date()); // Initial birthdate value
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker modal
  const navigation = useNavigation();
  const route = useRoute();
  const [nameError, setNameError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [image, setImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [addressLine2, setAddressLine2] = useState(""); // New state variable for Address Line 2
  const [addressLine3, setAddressLine3] = useState(""); // New state variable for Address Line 3
  const [addressLine4, setAddressLine4] = useState(""); // New state variable for Address Line 4
  const [addressLine5, setAddressLine5] = useState(""); // New state variable for Address Line 5
  const [barangayModalVisible, setBarangayModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [chosenBarangay, setChosenBarangay] = useState(false);
  const [chosenCity, setChosenCity] = useState(false);
  const [chosenRegion, setChosenRegion] = useState(false);
  

  // Define functions to toggle modal visibility
  const toggleBarangayModal = () => setBarangayModalVisible(!barangayModalVisible);
  const toggleCityModal = () => setCityModalVisible(!cityModalVisible);
  const toggleRegionModal = () => setRegionModalVisible(!regionModalVisible);
  
  

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  

  const handleBarangaySelection = (barangay) => {
    setAddressLine2(barangay); // Update the text input value
    setChosenBarangay(true); // Set chosenBarangay to true
    setBarangayModalVisible(false); // Close the modal
  };

  const handleCitySelection = (city) => {
    setAddressLine3(city); // Update the text input value
    setChosenCity(true); // Set chosenCity to true
    setCityModalVisible(false); // Close the modal
  };

  const handleRegionSelection = (region) => {
    setAddressLine4(region); // Update the text input value
    setChosenRegion(true); // Set chosenRegion to true
    setRegionModalVisible(false); // Close the modal
  };



  



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
    if (route.params && route.params.userData) {
      setUserData(route.params.userData);
      navigation.setParams({ userData: route.params.userData });
    } else {
      getUserData();
    }
  }, [route.params]);

  useEffect(() => {
    getStoreData();
  }, [userData]);
  
  useEffect(() => {
    if (storeData && storeData.name) {
      setName(storeData.name);
    }
    if (storeData && storeData.mobile) {
      setContactNumber(storeData.mobile);
    }
    if (storeData && storeData.birthdate) {
      setBirthdate(storeData.birthdate.toDate()); // Convert Timestamp back to Date
  }
    if (storeData && storeData.address) {
      setAddress(storeData.address);
    }
  }, [storeData]);

  useEffect(() => {
    setIsChanged( // Check if any data has changed
      name !== storeData.name ||
      contactNumber !== storeData.mobile ||
      address !== storeData.address ||
      birthdate.getTime() !== (storeData.birthdate ? storeData.birthdate.toDate().getTime() : null)
    );
  }, [name, contactNumber, address, birthdate, storeData]);



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker modal
    if (selectedDate) {
      // Validate the selected date
      if (isDateValid(selectedDate)) {
        setBirthdate(selectedDate); // Set the selected date as the birthdate
        setBirthdateError("");
      } else {
        setBirthdateError("Please select a valid birthdate or you should be at least 18 years old"); // Set an error message
      }
    }
  };
  
  // Validate the birthdate
  const isDateValid = (date) => {
    const currentDate = new Date();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);

  // Compare the selected date with eighteen years ago
  return date <= eighteenYearsAgo;
};

  const handleSave = () => {
    try {
      saveDetails(userData._id);
      navigation.navigate('Profile', { updatedData: { name, mobile: contactNumber, birthdate, address } });
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const saveDetails = async (userID) => {
    try{
      const userData = {
        userId: userID,
        name: name,
      }
      await axios.post("http://172.16.3.248:5000/user/updatedata", userData).then(async (res) => {
        console.log(`User details saved for user with ID: ${userID}`);
        }).catch((err) => {
          console.error('Error saving user details to MongoDB:', err);
        });
        const userRef = firestore().collection('users').doc(userID);
        await userRef.set({
            name: name,
            mobile: contactNumber,
            birthdate: firestore.Timestamp.fromDate(new Date(birthdate)),
            address: address,
        }, { merge: true })
        console.log(`User details saved for user with ID: ${userID}`);
        Alert.alert('User details saved successfully');
    } catch (error) {
        console.error('Error saving user details to Firestore:', error);
    }
}

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.seekereditprofile}>
      
        <Pressable style={styles.seekereditprofileChild}>
        <View  />
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" color='#FFFFFF' style={styles.backIcon} />
        </TouchableOpacity>

        
        <View style={styles.imageContainer}>
        <Pressable onPress={pickImage}> 
        {image ? (
  <Image style={styles.image14Icon} source={{ uri: image }} />
) : (
    <Image
          style={styles.image14Icon}
          contentFit="cover"
          source={require("../assets/image-14.png")}
        />
)}
</Pressable>
        <Text style={styles.carlWyndelAsoy}>{storeData.name}</Text>
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
        </View>
        </Pressable>

        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
  <TextInput
    style={styles.input}
    value={name}
    onChangeText={(text) => {
      setName(text);
      setNameError(text.length >= 1 && /^[A-Za-z\s]{0,50}$/.test(text) ? "" : "Name must not be blank and must contain only letters not exceeding 50 characters.");
    }}
    placeholder="Name"
  />
  {nameError ? <Text style={styles.errorMsg}>{nameError}</Text> : null}

  <Text style={styles.inputLabel}>Contact Number</Text>
<TextInput
  style={styles.input}
  value={contactNumber}
  onChangeText={(text) => {
    // Check if the entered text starts with '+63'
    if (text.startsWith('+63')) {
      setContactNumber(text);
      setContactNumberError(text.length === 13 && /^(\+63[89])[0-9]{9}$/.test(text) ? "" : "Please enter a valid Philippine mobile number in the format +63*********.");
    }
  }}
  placeholder="Contact Number"
/>
{contactNumberError ? <Text style={styles.errorMsg}>{contactNumberError}</Text> : null}
<Pressable onPress={() => setShowDatePicker(true)}>
  <Text style={styles.inputLabel}>Birthdate</Text>
  <TextInput
  style={[styles.input, styles.birthdateText]}
  value={format(birthdate, 'MM/dd/yyyy')} // Format the birthdate before displaying it
  editable={false}
/>
</Pressable>
{birthdateError ? <Text style={styles.errorMsg}>{birthdateError}</Text> : null}
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
  onChangeText={(text) => {
    setAddress(text);
    // Check if the length of the input exceeds 25 characters
    if (text.length > 25) {
      setAddressError("Street address must not exceed 25 characters.");
    } else if (text.trim().length < 1) {
      setAddressError("Street address must not be blank.");
    } else {
      setAddressError(""); // Clear the error message if input is valid
    }
  }}
  placeholder="Street Address"
/>

{addressError ? <Text style={styles.errorMsg}>{addressError}</Text> : null}


<Pressable onPress={toggleBarangayModal}>
  <TextInput
    style={[styles.input, chosenBarangay && styles.chosenInput]}
    value={addressLine2}
    editable={false} // Set editable to false
    placeholder="Barangay"
  />
</Pressable>

<Modal
  animationType="fade"
  transparent={true}
  visible={barangayModalVisible}
  onRequestClose={() => {
    setBarangayModalVisible(!barangayModalVisible);
  }}
>
  {/* Overlay */}
  {barangayModalVisible && (
    <TouchableWithoutFeedback onPress={() => setBarangayModalVisible(false)}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  )}

  {/* Modal Content */}
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleBarangaySelection("Basak")}
    >
      <Text style={styles.optionText}>Basak</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleBarangaySelection("Labangon")}
    >
      <Text style={styles.optionText}>Labangon</Text>
    </TouchableOpacity>
    {/* Add more options as needed */}
  </View>
</Modal>

<Pressable onPress={toggleCityModal}>
  <TextInput
    style={[styles.input, chosenCity && styles.chosenInput]}
    value={addressLine3}
    editable={false} // Set editable to false
    placeholder="City/Town"
  />
</Pressable>
<Modal
  animationType="fade"
  transparent={true}
  visible={cityModalVisible}
  onRequestClose={() => {
    setCityModalVisible(!cityModalVisible);
  }}
>
  {/* Overlay */}
  {cityModalVisible && (
    <TouchableWithoutFeedback onPress={() => setCityModalVisible(false)}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  )}

  {/* Modal Content */}
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleCitySelection("Mandaue City")}
    >
      <Text style={styles.optionText}>Mandaue Cit</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleCitySelection("Lapu - Lapu City")}
    >
      <Text style={styles.optionText}>Lapu-Lapu City</Text>
    </TouchableOpacity>
    {/* Add more options as needed */}
  </View>
</Modal>


<Pressable onPress={toggleRegionModal}>
  <TextInput
    style={[styles.input, chosenRegion && styles.chosenInput]}
    value={addressLine4}
    editable={false} // Set editable to false
    placeholder="State/Province/Region"
  />
</Pressable>

<Modal
  animationType="fade"
  transparent={true}
  visible={regionModalVisible}
  onRequestClose={() => {
    setRegionModalVisible(!regionModalVisible);
  }}
>
  {/* Overlay */}
  {regionModalVisible && (
    <TouchableWithoutFeedback onPress={() => setRegionModalVisible(false)}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
  )}

  {/* Modal Content */}
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleRegionSelection("Cebu")}
    >
      <Text style={styles.optionText}>Cebu</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleRegionSelection("Bohol")}
    >
      <Text style={styles.optionText}>Bohol</Text>
    </TouchableOpacity>
    {/* Add more options as needed */}
  </View>
</Modal>


<TextInput
  style={styles.input}
  value={addressLine5}
  onChangeText={(text) => {
    // Check if the entered value contains only numeric characters and has a length of 4
    if (/^\d{0,4}$/.test(text)) {
      setAddressLine5(text); // Update the state if it meets the criteria
    }
  }}
  placeholder="Postal Code/Zip Code"
  keyboardType="numeric" // Set keyboardType to "numeric" to display numeric keyboard
  maxLength={4} // Limit the input length to 4 characters
/>






</View>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              opacity: nameError ||
                contactNumberError ||
                birthdateError ||
                addressError ||
                !address || !isChanged
                ? 0.5 // Set opacity to 0.5 when there are errors
                : 1,  // Set opacity to 1 when there are no errors
            },
          ]}
          onPress={handleSave}
          disabled={
            !!nameError ||
            !!contactNumberError ||
            !!birthdateError ||
            !!addressError || 
            !address || !isChanged
          }
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
    bottom:  -190,
    right: windowWidth * 0.625,
    width: windowWidth * 0.33, 
    height: windowWidth * 0.33, 
    position: "absolute",
    marginBottom: 15, 
  }, 
  vectorParent: {
    bottom: -190,
    right: windowWidth * 0.625,
    position: "absolute",
    marginBottom: 10, 
  },

  carlWyndelAsoy: {
    top: windowHeight * 0.07, // Adjusted for responsiveness
    left: windowWidth * 0.348, // Adjusted for responsiveness
    fontSize: FontSize.size_6xl,
    fontWeight: "600",
    fontFamily: FontFamily.quicksandSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    width: windowWidth * 0.605, // Adjusted for responsiveness
    position: "absolute",
  },
  frameChild: {
    left: 0,
    top: 0,
  },
  cameraIcon: {
    top: windowHeight * 0.015, 
    left: windowWidth * 0.03, 
    width: windowWidth * 0.044, 
    height: windowHeight * 0.029, 
    position: "absolute",
  },
  
  


  
  frameChildLayout: {
    height: windowHeight * 0.046, 
    width: windowHeight * 0.046, 
    position: "absolute",
  },

  seekereditprofile: {
    backgroundColor: Color.colorWhite,
    width: "100%",
    minHeight: windowHeight, 
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: windowHeight * 0.021, 
    flex: 1,
  },
  inputContainer: {
    marginTop: windowHeight * 0.285, 
  },
  inputLabel: {
     marginBottom: 0,
    fontSize: FontSize.size_md, 
    fontWeight: "bold",
    textAlign: "left",
    width: windowWidth * 0.7, 
  },
  input: {
    height: windowHeight * 0.045, 
    width: windowWidth * 0.698, 
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: windowHeight * 0.008, 
    paddingHorizontal: windowWidth * 0.025, 
    left: windowWidth * 0.004,
  },
  birthdateText: {
    color: '#002F45', 
  },
  saveButton: {
    marginTop: windowHeight * 0.025, 
    marginBottom: windowHeight * 0.116, 
    width: windowWidth * 0.698, 
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
  errorMsg: {
    color: 'red',
    fontSize: 12, 
    marginTop: windowHeight * 0.0001, 
    marginBottom: windowHeight * 0.01,
    width:  windowWidth * 0.698,
  },
  backIcon: {
    top: windowHeight * 0.045, 
    left: windowWidth * 0.058, 
    fontSize: FontSize.size_xl, 
  },
  modalContainer: {
    backgroundColor: 'white',
    borderColor: 'gray', // Add border color
    borderWidth: 1, // Add border width
    padding: 20,
    width: windowHeight * 0.375,
    marginTop: windowHeight * 0.4,
    alignSelf: "center",
    margin: 20,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  optionText: {
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  chosenInput: {
    color: 'black', 
  },
  

});

export default SeekerEditProfileScreen;
