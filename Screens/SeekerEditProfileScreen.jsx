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
import { Picker } from '@react-native-picker/picker';


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
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [ZipCode, setZipCode] = useState(""); 

  
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
  fontSize={15}
/>

{addressError ? <Text style={styles.errorMsg}>{addressError}</Text> : null}


    <View style={styles.pickerContainer}>
    
      <Picker
      selectedValue={barangay}
      style={styles.input}
      onValueChange={(itemValue, itemIndex) => {
        setBarangay(itemValue);
      }}
    >
    
      <Picker.Item label="Barangay" value="Barangay" color= "gray" />
      <Picker.Item label="Adlaon" value="Adlaon" />
      <Picker.Item label="Agsungot" value="Agsungot" />
      <Picker.Item label="Apas" value="Apas" />
      <Picker.Item label="Babag" value="Babag" />
      <Picker.Item label="Bacayan" value="Bacayan" />
      <Picker.Item label="Banilad" value="Banilad" />
      <Picker.Item label="Basak Pardo" value="Basak Pardo" />
      <Picker.Item label="Basak San Nicolas" value="Basak San Nicolas" />
      <Picker.Item label="Basak" value="Basak" />
      <Picker.Item label="Bonbon" value="Bonbon" />
      <Picker.Item label="Buhisan" value="Buhisan" />
      <Picker.Item label="Bulacao" value="Bulacao" />
      <Picker.Item label="Buot-Taup" value="Buot-Taup" />
      <Picker.Item label="Busay" value="Busay" />
      <Picker.Item label="Calamba" value="Calamba" />
      <Picker.Item label="Camputhaw" value="Camputhaw" />
      <Picker.Item label="Capitol Site" value="Capitol Site" />
      <Picker.Item label="Carreta" value="Carreta" />
      <Picker.Item label="Cogon Pardo" value="Cogon Pardo" />
      <Picker.Item label="Cogon Ramos" value="Cogon Ramos" />
      <Picker.Item label="Day-as" value="Day-as" />
      <Picker.Item label="Duljo-Fatima" value="Duljo-Fatima" />
      <Picker.Item label="Ermita" value="Ermita" />
      <Picker.Item label="Guadalupe" value="Guadalupe" />
      <Picker.Item label="Guba" value="Guba" />
      <Picker.Item label="Hipodromo" value="Hipodromo" />
      <Picker.Item label="Inayawan" value="Inayawan" />
      <Picker.Item label="Kalubihan" value="Kalubihan" />
      <Picker.Item label="Kamagayan" value="Kamagayan" />
      <Picker.Item label="Kamputhaw" value="Kamputhaw" />
      <Picker.Item label="Kasambagan" value="Kasambagan" />
      <Picker.Item label="Lahug" value="Lahug" />
      <Picker.Item label="Lorega San Miguel" value="Lorega San Miguel" />
      <Picker.Item label="Lusaran" value="Lusaran" />
      <Picker.Item label="Luz" value="Luz" />
      <Picker.Item label="Mabini" value="Mabini" />
      <Picker.Item label="Mabolo" value="Mabolo" />
      <Picker.Item label="Malubog" value="Malubog" />
      <Picker.Item label="Mambaling" value="Mambaling" />
      <Picker.Item label="Pahina Central" value="Pahina Central" />
      <Picker.Item label="Pahina San Nicolas" value="Pahina San Nicolas" />
      <Picker.Item label="Pamutan" value="Pamutan" />
      <Picker.Item label="Pasil" value="Pasil" />
      <Picker.Item label="Poblacion Pardo" value="Poblacion Pardo" />
      <Picker.Item label="Poblacion" value="Poblacion" />
      <Picker.Item label="Pung-ol-Sibugay" value="Pung-ol-Sibugay" />
      <Picker.Item label="Punta Princesa" value="Punta Princesa" />
      <Picker.Item label="Quiot Pardo" value="Quiot Pardo" />
      <Picker.Item label="Quiot" value="Quiot" />
      <Picker.Item label="Sambag I" value="Sambag I" />
      <Picker.Item label="Sambag II" value="Sambag II" />
      <Picker.Item label="San Antonio" value="San Antonio" />
      <Picker.Item label="San Jose" value="San Jose" />
      <Picker.Item label="San Nicolas Proper" value="San Nicolas Proper" />
      <Picker.Item label="San Roque" value="San Roque" />
      <Picker.Item label="Santa Cruz" value="Santa Cruz" />
      <Picker.Item label="Santo Niño" value="Santo Niño" />
      <Picker.Item label="Sapangdaku" value="Sapangdaku" />
      <Picker.Item label="Sawang Calero" value="Sawang Calero" />
      <Picker.Item label="Sinsin" value="Sinsin" />
      <Picker.Item label="Sirao" value="Sirao" />
      <Picker.Item label="Suba" value="Suba" />
      <Picker.Item label="Sudlon I" value="Sudlon I" />
      <Picker.Item label="Sudlon II" value="Sudlon II" />
      <Picker.Item label="Tabunan" value="Tabunan" />
      <Picker.Item label="Tagbao" value="Tagbao" />
      <Picker.Item label="Talamban" value="Talamban" />
      <Picker.Item label="Taptap" value="Taptap" />
      <Picker.Item label="Tejero" value="Tejero" />
      <Picker.Item label="Tinago" value="Tinago" />
      <Picker.Item label="Tisa" value="Tisa" />
      <Picker.Item label="Toong" value="Toong" />
      <Picker.Item label="Zapatera" value="Zapatera" />
      <Picker.Item label="Agus" value="Agus" />
      <Picker.Item label="Alambijud" value="Alambijud" />
      <Picker.Item label="Balud" value="Balud" />
      <Picker.Item label="Biasong" value="Biasong" />
      <Picker.Item label="Bonbon" value="Bonbon" />
      <Picker.Item label="Buaya" value="Buaya" />
      <Picker.Item label="Cogon Pare" value="Cogon Pare" />
      <Picker.Item label="Cogon Ramos" value="Cogon Ramos" />
      <Picker.Item label="Day-as" value="Day-as" />
      <Picker.Item label="Duljo-Fatima" value="Duljo-Fatima" />
      <Picker.Item label="Ermita" value="Ermita" />
      <Picker.Item label="Guadalupe" value="Guadalupe" />
      <Picker.Item label="Guba" value="Guba" />
      <Picker.Item label="Hipodromo" value="Hipodromo" />
      <Picker.Item label="Inayawan" value="Inayawan" />
      <Picker.Item label="Kalubihan" value="Kalubihan" />
      <Picker.Item label="Kamagayan" value="Kamagayan" />
      <Picker.Item label="Kamputhaw" value="Kamputhaw" />
      <Picker.Item label="Kasambagan" value="Kasambagan" />
      <Picker.Item label="Lahug" value="Lahug" />
      <Picker.Item label="Lorega San Miguel" value="Lorega San Miguel" />
      <Picker.Item label="Lusaran" value="Lusaran" />
      <Picker.Item label="Luz" value="Luz" />
      <Picker.Item label="Mabini" value="Mabini" />
      <Picker.Item label="Mabolo" value="Mabolo" />
      <Picker.Item label="Malubog" value="Malubog" />
      <Picker.Item label="Mambaling" value="Mambaling" />
      <Picker.Item label="Pahina Central" value="Pahina Central" />
      <Picker.Item label="Pahina San Nicolas" value="Pahina San Nicolas" />
      <Picker.Item label="Pamutan" value="Pamutan" />
      <Picker.Item label="Pasil" value="Pasil" />
      <Picker.Item label="Poblacion Pardo" value="Poblacion Pardo" />
      <Picker.Item label="Poblacion" value="Poblacion" />
      <Picker.Item label="Pung-ol-Sibugay" value="Pung-ol-Sibugay" />
      <Picker.Item label="Punta Princesa" value="Punta Princesa" />
      <Picker.Item label="Quiot Pardo" value="Quiot Pardo" />
      <Picker.Item label="Quiot" value="Quiot" />
      <Picker.Item label="Sambag I" value="Sambag I" />
      <Picker.Item label="Sambag II" value="Sambag II" />
      <Picker.Item label="San Antonio" value="San Antonio" />
      <Picker.Item label="San Jose" value="San Jose" />
      <Picker.Item label="San Nicolas Proper" value="San Nicolas Proper" />
      <Picker.Item label="San Roque" value="San Roque" />
      <Picker.Item label="Santa Cruz" value="Santa Cruz" />
      <Picker.Item label="Santo Niño" value="Santo Niño" />
      <Picker.Item label="Sapangdaku" value="Sapangdaku" />
      <Picker.Item label="Sawang Calero" value="Sawang Calero" />
      <Picker.Item label="Sinsin" value="Sinsin" />
      <Picker.Item label="Sirao" value="Sirao" />
      <Picker.Item label="Suba" value="Suba" />
      <Picker.Item label="Sudlon I" value="Sudlon I" />
      <Picker.Item label="Sudlon II" value="Sudlon II" />
      <Picker.Item label="Tabunan" value="Tabunan" />
      <Picker.Item label="Tagbao" value="Tagbao" />
      <Picker.Item label="Talamban" value="Talamban" />
      <Picker.Item label="Taptap" value="Taptap" />
      <Picker.Item label="Tejero" value="Tejero" />
      <Picker.Item label="Tinago" value="Tinago" />
      <Picker.Item label="Tisa" value="Tisa" />
      <Picker.Item label="Toong" value="Toong" />
      <Picker.Item label="Zapatera" value="Zapatera" />
      <Picker.Item label="Agus" value="Agus" />
      <Picker.Item label="Alambijud" value="Alambijud" />
      <Picker.Item label="Balud" value="Balud" />
      <Picker.Item label="Biasong" value="Biasong" />
      <Picker.Item label="Bonbon" value="Bonbon" />
      <Picker.Item label="Buaya" value="Buaya" />
      <Picker.Item label="Cogon Pare" value="Cogon Pare" />


      
    </Picker>
  </View>
  
    <View style={styles.pickerContainer}>
    
      <Picker
      selectedValue={city}
      style={styles.input}
      onValueChange={(itemValue, itemIndex) => {
        setCity(itemValue);
      }}
    >
    
      <Picker.Item label="City/Town" value="City" color= "gray"/>
      <Picker.Item label="Alcantara" value="Alcantara" />
      <Picker.Item label="Alcoy" value="Alcoy" />
      <Picker.Item label="Alegria" value="Alegria" />
      <Picker.Item label="Aloguinsan" value="Aloguinsan" />
      <Picker.Item label="Argao" value="Argao" />
      <Picker.Item label="Asturias" value="Asturias" />
      <Picker.Item label="Badian" value="Badian" />
      <Picker.Item label="Balamban" value="Balamban" />
      <Picker.Item label="Bantayan" value="Bantayan" />
      <Picker.Item label="Barili" value="Barili" />
      <Picker.Item label="Boljoon" value="Boljoon" />
      <Picker.Item label="Borbon" value="Borbon" />
      <Picker.Item label="Carmen" value="Carmen" />
      <Picker.Item label="Catmon" value="Catmon" />
      <Picker.Item label="Compostela" value="Compostela" />
      <Picker.Item label="Consolacion" value="Consolacion" />
      <Picker.Item label="Cordova" value="Cordova" />
      <Picker.Item label="Daanbantayan" value="Daanbantayan" />
      <Picker.Item label="Dalaguete" value="Dalaguete" />
      <Picker.Item label="Dumanjug" value="Dumanjug" />
      <Picker.Item label="Ginatilan" value="Ginatilan" />
      <Picker.Item label="Liloan" value="Liloan" />
      <Picker.Item label="Madridejos" value="Madridejos" />
      <Picker.Item label="Malabuyoc" value="Malabuyoc" />
      <Picker.Item label="Medellin" value="Medellin" />
      <Picker.Item label="Minglanilla" value="Minglanilla" />
      <Picker.Item label="Moalboal" value="Moalboal" />
      <Picker.Item label="Oslob" value="Oslob" />
      <Picker.Item label="Pilar" value="Pilar" />
      <Picker.Item label="Pinamungajan" value="Pinamungajan" />
      <Picker.Item label="Poro" value="Poro" />
      <Picker.Item label="Ronda" value="Ronda" />
      <Picker.Item label="Samboan" value="Samboan" />
      <Picker.Item label="San Fernando" value="San Fernando" />
      <Picker.Item label="San Francisco" value="San Francisco" />
      <Picker.Item label="San Remigio" value="San Remigio" />
      <Picker.Item label="Santa Fe" value="Santa Fe" />
      <Picker.Item label="Santander" value="Santander" />
      <Picker.Item label="Sibonga" value="Sibonga" />
      <Picker.Item label="Sogod" value="Sogod" />
      <Picker.Item label="Tabogon" value="Tabogon" />
      <Picker.Item label="Tabuelan" value="Tabuelan" />
      <Picker.Item label="Tuburan" value="Tuburan" />
      <Picker.Item label="Tudela" value="Tudela" />
      <Picker.Item label="Cebu City" value="Cebu City" />
      <Picker.Item label="Lapu-Lapu City" value="Lapu-Lapu City" />
      <Picker.Item label="Mandaue City" value="Mandaue City" />
      <Picker.Item label="Danao City" value="Danao City" />
      <Picker.Item label="Talisay City" value="Talisay City" />
      <Picker.Item label="Naga City" value="Naga City" />
      <Picker.Item label="Carcar City" value="Carcar City" />


      
    </Picker>
  </View>
  
    <View style={styles.pickerContainer}>
      
    
      <Picker
      selectedValue={province}
      style={styles.input}
      onValueChange={(itemValue, itemIndex) => {
        setProvince(itemValue);
      }}
    >
    
      <Picker.Item label="State/Province/Region" value="Province" color= "gray"/>
      <Picker.Item label="Cebu" value="Cebu" />
      <Picker.Item label="Bohol" value="Bohol" />
      <Picker.Item label="Negros Oriental" value="Negros Oriental" />
      <Picker.Item label="Siquijor" value="Siquijor" />

      
    </Picker>
  </View>
  <TextInput
    style={styles.input}
    value={ZipCode}
    onChangeText={(text) => {
      // Check if the entered value contains only numeric characters and has a length of 4
      if (/^\d{0,4}$/.test(text)) {
        setZipCode(text); // Update the state if it meets the criteria
      }
    }}
    placeholder="Postal Code/Zip Code"
    keyboardType="numeric" // Set keyboardType to "numeric" to display numeric keyboard
    maxLength={4} // Limit the input length to 4 characters
    fontSize={15}
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
    bottom:  -195,
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
    color: '#002F45', // Change the text color here
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
  pickerContainer: {
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: windowHeight * 0.008,
    paddingHorizontal: windowWidth * 0.005,
    width: windowWidth * 0.698,
    height: windowHeight * 0.045,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  picker: {
    flex: 1,
    height: '100%', // Ensure the picker takes up full height of the container
    fontSize: FontSize.size_sm, // Font size of the selected item
  },
  

});

export default SeekerEditProfileScreen;
