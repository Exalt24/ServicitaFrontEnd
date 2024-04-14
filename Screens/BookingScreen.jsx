
import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, Dimensions, TextInput, TouchableOpacity, Pressable, Modal } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import Button from '../components/Button';
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from "react-native-modern-datepicker";
import {Dropdown} from 'react-native-element-dropdown';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
  {label: '8:00 - 9:00 AM', value: '1'},
  {label: '9:00 - 10:00 AM', value: '2'},
  {label: '10:00 - 11:00 AM', value: '3'},
  {label: '11:00 - 12:00 PM', value: '4'},
  {label: '12:00 - 1:00 PM', value: '5'},
  
]


const BookingScreen = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [city, setCity] = React.useState('');
  const [barangay, setBarangay] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [contactNumber, setContactNumber] = useState('+63');
  const [contactNumberError, setContactNumberError] = useState("");
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  
  
  const handleContinue = () => {
    // Handle continue button press
  };
  
  
  
    

    
    const startDate = getFormatedDate(
      today.setDate(today.getDate() + 1),
      // "DD/MM/YYYY"
    );


    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("");

    function handleChangeStartDate(propDate) {
      setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker);
    };


  

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <ScrollView>
    <View style={[styles.bookingscreen2, { marginBottom: 0 }]}>
        <View style={[styles.bookingscreen2Child, styles.childPosition]} />

        
        <Text style={[styles.bookingtext]}>{`Start Booking`}</Text>

        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          
          <View style={[styles.groupChild, styles.groupChildLayout]} />
          <View style={styles.inputRow}>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input1}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel1}>Last Name</Text>
            <TextInput
              style={styles.input2}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          </View>

          <Text style={styles.inputLabel}>Province</Text>
          <TextInput
            style={styles.input}
            value={province}
            onChangeText={setProvince}
          />

          <Text style={styles.inputLabel}>City / Municipality </Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.inputLabel}>Barangay</Text>
          <TextInput
            style={styles.input}
            value={barangay}
            onChangeText={setBarangay}
          />

          <Text style={styles.inputLabel}>ZIP Code</Text>

          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={(text) => {
              if (/^\d{0,4}$/.test(text)) {
                setZipCode(text); // Update the state if it meets the criteria
              }
            }}
            
            keyboardType="numeric" // Set keyboardType to "numeric" to display numeric keyboard
            maxLength={4} // Limit the input length to 4 characters
            fontSize={15}
          />

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
            
            keyboardType="numeric" 
          />
          {contactNumberError ? <Text style={styles.errorMsg}>{contactNumberError}</Text> : null}
          







          <Pressable onPress={handleOnPressStartDate}>
            <Text style={styles.inputLabel}>Date</Text>
            <TextInput
              style={styles.input}
              value={date }  // Display selected date
              editable={false} // Disable editing of the input field
            />
          </Pressable>

          {/* {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? date : new Date()} // Initialize with current date if not set
              mode="calendar"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              
            />
          )} */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setDate(date)}
                  options={{
                    backgroundColor: "#7C7878",
                    textHeaderColor: "#07374d",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#07374d",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


    <Text style={styles.inputLabel}>Time</Text>
    <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select time' : '...'}
          value={time}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTime(item.value);
            setIsFocus(false);
          }}
        />
        </View>
        
        <Button title="Continue" filled Color={Color.colorWhite} 
        style={{ height: 53,
            width: 350, 
            top: 850,
            position: "absolute", 
             }} 
            onPress={handleContinue} 
        />

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  childPosition: {
    backgroundColor: Color.colorDarkslategray_500,
    left: 0,
    position: "absolute",
  },
  groupChildLayout: {
    height: 650,
    width: 345,
    position: "absolute",

    
  },
  
  groupLayout: {
    width: 293,
    height: 34,
    borderWidth: 0.2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  zipCodePosition: {
    left: 26,
    position: "absolute",
  },
  
  continuebutton: {
    top: 780,
    height: 53,
    width: 358,
    left: 36,
    position: "absolute",
  },
  bookingscreen2Child: {
    top: -19,
    width: 430,
    height: 378,
  },
  groupChild: {
    shadowColor: "rgba(0, 0, 0, 1s)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    elevation: 5,
    shadowOpacity: 0.5,
    left: 0,
    height: 534,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
 
  rectangleParent: {
    justifyContent: 'center',
    top:170,
    // marginTop:10,
    //alignItems: 'center',
  },
  bookingtext: {
    top: 47,
    fontSize: 55,
    width: 210,
    textAlign: "left",
    left: 36,
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 55,
    position: "absolute", 
   
    
    
  },
  bookingscreen2: {
    flex: 1,
    width: "100%",
    height: 925,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  errorMsg: {
    color: 'red',
    fontSize: 12, 
    marginTop: windowHeight * 0.0001, 
    marginBottom: windowHeight * 0.01,
    width:  windowWidth * 0.698,
    left: 25,
  },

  input: {
    height: windowHeight * 0.045, 
    width:295, 
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: windowHeight * 0.008, 
    paddingHorizontal: windowWidth * 0.025, 
    fontSize: 14,
    color: 'black',
    left: 25,
  },
  input1: {
    height: windowHeight * 0.045, 
    width: 140,
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: windowHeight * 0.008, 
    paddingHorizontal: windowWidth * 0.025, 
    fontSize: 14,
    color: 'black',
    left: 25,
    
  },
  input2: {
    height: windowHeight * 0.045, 
    width: 145, 
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: windowHeight * 0.008, 
    paddingHorizontal: windowWidth * 0.025,
    fontSize: 14,
    color: 'black',
  
    
    // left: 175,
    
  },
  inputLabel: {
    marginBottom: 0,
    fontWeight: "bold",
    textAlign: "left",
    width: windowWidth * 0.7, 
    left: 25,
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_mini,
    
  },
  inputLabel1: {
    marginBottom: 0,
    fontWeight: "bold",
    textAlign: "left",
    width: windowWidth * 0.7, 
    // left: 175,
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_mini,
    
    
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
    
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  
  dropdown: {
    height: windowHeight * 0.045, 
    width:295, 
    borderColor: Color.colorDarkgray,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: windowHeight * 0.008, 
    paddingHorizontal: windowWidth * 0.025, 
    marginTop:8,
    left: 25,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color:'gray'
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#7C7878",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 35,
    width: 331,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  
});

export default BookingScreen;