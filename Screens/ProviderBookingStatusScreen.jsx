import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, TouchableOpacity,  TextInput, Modal  } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { ScrollView } from 'react-native-gesture-handler';
import RealTimeInfoSeeker from "../components/RealTimeInfoSeeker";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProviderBookingStatusScreen(props) {
    const navigation = useNavigation(); 
    const [statusText, setStatusText] = useState("Cancel");
    const [serviceName, setServiceName] = useState("Eunice Enrera Eunice EnreraEunice EnreraEunice Eun");//limit service name characters
    const [buttonsVisible, setButtonsVisible] = useState(true);
    const [buttonsVisible1, setButtonsVisible1] = useState(true);
    const [buttonsVisible2, setButtonsVisible2] = useState(true);
    const [acceptPressed, setAcceptPressed] = useState(false);
    const [startPressed, setStartPressed] = useState(false);
    const [isReportModalVisible, setReportModalVisible] = useState(false);
    const [complaintText, setComplaintText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [complaint, setComplaint] = useState('');


    const handleBackPress = () => {
        navigation.navigate('ProviderBookingScreen');
    };
    const handleAccept = () => {
      setStatusText("Accepted");
      setButtonsVisible(false);
      setAcceptPressed(true);
  };

  const handleDecline = () => {
      setStatusText("Rejected");
      setButtonsVisible(false);
      
  };
  const handleCancel = () => {
    setStatusText("Cancelled");
    setButtonsVisible1(false);
  };
  const handleStart = () => {
    setStatusText("In Progress");
    setButtonsVisible1(false);
    setStartPressed(true);
  };
  const handleCompleted = () => {
    setStatusText("Completed");
    setButtonsVisible2(false);
  };
  const handleStopService = () => {
    setStatusText("Failed");
    setButtonsVisible2(false);
  };
  const handleReport = () => {
    // Set the modalVisible state to true when the Report button is pressed
    setModalVisible(true);
  };
  const openReportModal = () => {
    setReportModalVisible(true);
  };
  
  const closeReportModal = () => {
    setReportModalVisible(false);
  };
  
  const handleSubmit = () => {
    // Handle submission of the complaint
    console.log('Complaint submitted:', complaint);
    // Reset the input field and close the modal
    setComplaint('');
    setModalVisible(false);
};
  
  
  
    

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.bookingscreen2]}>
      
      <View style={styles.header}>
      <Pressable onPress={handleBackPress}>
        <AntDesign name="left" size={24} color="white" style={styles.icon} />
      </Pressable>
        <Text style={styles.title}>{statusText}</Text>
      </View>


    
    {statusText !== "In Progress" && (
    <View  style={styles.centeredContainer1}>






<View style={[styles.servicecontainer2, styles.servicecontainer2Layout]}>
        <Image
          style={[styles.serviceimage2Icon, styles.servicecontainer2Layout]}
          contentFit="cover"
          source={require("../assets/serviceimage1.png")}
        />
        <View style={[styles.serviceinfo2, styles.serviceinfo2Layout]}>
          <View >
            <Text style={[styles.servicename2]}>
              {serviceName}
            </Text>
          </View>
          
          <View style={[styles.message2, styles.message2Layout]}>
            <View style={[styles.message2Child, styles.message2Layout]} />
            <Text style={[styles.role2, styles.role2FlexBox]}>
              Message Seeker
            </Text>
            <Image
              style={styles.lettericon2}
              contentFit="cover"
              source={require("../assets/letter.png")}
            />
          </View>
        </View>
      </View>

     



      <View style={[styles.bookingdets, styles.bookingdetsLayout]}>
        <View style={[styles.bookingdetsChild, styles.bookingdetsLayout]} />
        <Text
          style={[styles.bookingIdSeeker, styles.bookingPosition]}
        >{`Booking ID
Seeker
Contact
Location
Date
Time`}</Text>
        <Text style={[styles.booking, styles.bookingPosition]}>{`#236
Darmae Tan
+639283242034
Lahug, Cebu City
December 25, 2023
1:00 AM - 2:00 AM
`}</Text>
      </View>


      <View style={[styles.transactionDets, styles.transactionLayout1]}>
        <View style={[styles.transactionDetsChild, styles.childShadowBox]} />
        <Text
          style={[styles.transactionIdBooking, styles.transactionLayout]}
        >{`Transaction ID
Booking Time
Payment Time
Payment Method
Amount

`}</Text>
        <Text style={[styles.transaction, styles.bookingTypo]}>{`#0102
21-12-2023  19:47
21-12-2023  19:47
Gcash
 ₱ 499

`}</Text>
      </View>
      </View>

    )}
    <View style={styles.centeredContainer}>

      {buttonsVisible && (
          <>
            
            <View style={{bottom:windowHeight > 732 ? windowHeight * -0.34 : windowHeight * -0.375  }} >
            {/* height: windowHeight > 808 ? windowHeight : 770, */}
            
            <Button 
              title="Accept" 
              filled 
              Color={Color.colorWhite} 
              style={{ 
                height: 53,
                width: windowWidth * 0.890, 
                // top: 540,
                // bottom: windowHeight * 0.12, 
                position: "relative", 
              }} 
              onPress={handleAccept} 
            />
            <View style={{ marginBottom: 10 }} />
            <Button 
              title="Decline" 
              filled={false}
              style={{ 
                height: 53,
                width: windowWidth * 0.890, 
                // top: 600,
                // bottom: windowHeight * 0.05, 
                position: "relative", 
                
              }} 
              onPress={handleDecline} 
            />
            </View>
          </>
        )}
        
        {acceptPressed && buttonsVisible1 && (
          <>


          
          <View style={{bottom:windowHeight > 732 ? windowHeight * -0.34 : windowHeight * -0.375  }} >
            <Button 
              title="Start" 
              filled 
              Color={Color.colorWhite} 
              style={{ 
                height: 53,
                width: windowWidth * 0.890, 
                
                // top: 540,
                position: "relative", 
              }} 
              onPress={handleStart} 
            />
            <View style={{ marginBottom: 10 }} />
            <Button 
              title="Cancel" 
              filled={false}
              style={{ 
                height: 53,
                width: windowWidth * 0.890, 
                // top: 600,
                position: "relative", 
              }} 
              onPress={handleCancel} 
            />
          </View>
          </>
        )}
        {startPressed && buttonsVisible2 && (
  <>
    
    <View style={styles.container01}>
      <View style={styles.seekerInfo}>
        <RealTimeInfoSeeker />
      </View>
    </View>
 

    <View style={{bottom:windowHeight > 732 ? windowHeight * -0.34 : windowHeight * -0.375  }} >
      <Button 
        title="Completed" 
        filled 
        Color={Color.colorWhite} 
        style={{ 
          height: 53,
          width: windowWidth * 0.890, 
          //top: 540,
          position: "relative", 
        }} 
        onPress={handleCompleted} 
      />
      <View style={{ marginBottom: 10 }} />
      <Button 
        title="Stop Service" 
        filled={false}
        style={{ 
          height: 53,
          width: windowWidth * 0.890, 
          //top: 600,
          position: "relative", 
        }} 
        onPress={handleStopService} 
      />
    </View>
  </>
)}

        {(statusText === "Completed" || statusText === "Failed" || statusText === "Cancelled") && (
          // <View style={{top: windowHeight * 0.37}} >
          <View style={{bottom:windowHeight > 732 ? windowHeight * -0.385 : windowHeight * -0.42  }} > 
          <Button 
            title="Report" 
            filled={false}
            style={{ 
              height: 53,
              width: windowWidth * 0.890, 
              // top: 600,
              position: "relative", 
            }} 
            onPress={handleReport} 
          />
          </View>
        )}
  </View>
  <Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.modalHeader}>Report</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your complaint..."
        textAlignVertical="top"
        onChangeText={(text) => setComplaint(text)}
        value={complaint}
      />
      <Button title="Submit" onPress={handleSubmit} 
      filled 
      Color={Color.colorWhite} 
      style={{ 
        backgroundColor: "#07374d",
        borderColor: "#07374d",
      }} 
      />
    </View>
  </View>
</Modal>
    
    
    </View>

    </ScrollView>
     
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
  header: {
    backgroundColor: "#07374d",
    height: Dimensions.get('window').height * 0.1, // Adjust height according to screen size
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  title: {
    fontSize:  23,
    lineHeight: 50,
    fontWeight: "700",
    fontFamily: "Lobster-Regular",
    color: Color.colorWhite,
    display: "flex",
    alignItems: "center",
    width: 326,
    textAlign: "left",
    position: "absolute",
    marginLeft: 45,
  },
  icon: {
    marginLeft: 10, // Add some space before the icon
  },
  acceptLayout: {
    height: 53,
    width: 371,
    left: 32,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    height: 53,
    width: 371,
    position: "absolute",
  },
  accept1Typo: {
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 50,
    position: "absolute",
  },
  transactionLayout1: {
    height: 188,
    //width: 350,
    width: windowWidth * 0.890, 
    position: "absolute",
  },
  childShadowBox: {
    borderWidth: 0.2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 7,
    shadowRadius: 7,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  transactionLayout: {
    height: 156,
    color: Color.colorBlack,
    lineHeight: 30,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  bookingTypo: {
    textAlign: "right",
    fontFamily: FontFamily.quicksandMedium,
    fontWeight: "500",
  },
  bookingdetsLayout: {
    height: 164,
    width: windowWidth * 0.890, 
    position: "absolute",
  },
  bookingPosition: {
    lineHeight: 27,
    top: 13,
    color: Color.colorBlack,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  messageLayout: {
    height: 21,
    width: 139,
    position: "absolute",
  },
  servicenamePosition: {
    top: 106,
    position: "absolute",
  },
  headerPosition: {
    height: 76,
    width: 430,
    left: 0,
    top: 0,
    position: "absolute",
  },
  acceptChild: {
    backgroundColor: Color.colorDarkslategray_500,
  },
  accept1: {
    top: 1,
    left: 88,
    textAlign: "center",
    justifyContent: "center",
    width: 196,
    height: 51,
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    lineHeight: 50,
  },
  accept: {
    top: 781,
  },
  cancelChild: {
    backgroundColor: Color.colorGray,
  },
  cancel: {
    top: 844,
  },
  transactionDetsChild: {
    height: 188,
    width: windowWidth * 0.890, 
    position: "absolute",
  },
  transactionIdBooking: {
    top: 17,
    width: 108,
    textAlign: "left",
    // left: 21,
    left: windowWidth * 0.051,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
  },
  transaction: {
    top: 19,
    // left: 219,
    right: windowWidth * 0.051,
    width: 110,
    height: 156,
    color: Color.colorBlack,
    lineHeight: 30,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  transactionDets: {
    top: 340,
    // left: 40,
    //  justifyContent: 'center', 
    // alignItems: 'center'
  },
  bookingdetsChild: {
    borderWidth: 0.2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 7,
    shadowRadius: 7,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  bookingIdSeeker: {
    width: 77,
    height: 136,
    textAlign: "left",
    left: windowWidth * 0.051,
    // left: 21,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
  },
  booking: {
    // left: 158,
    right: windowWidth * 0.051,
    width: 172,
    height: 142,
    textAlign: "right",
    fontFamily: FontFamily.quicksandMedium,
    fontWeight: "500",
  },
  bookingdets: {
    top: 160,
    // left: 40,
  },
  messageChild: {
    borderRadius: 4,
    backgroundColor: "#dbdbdb",
    left: 0,
    top: 0,
    height: 21,
    width: 139,
  },
  messageSeeker: {
    top: 3,
    left: 28,
    fontWeight: "600",
    fontFamily: FontFamily.quicksandSemiBold,
    color: Color.colorDarkslategray_500,
    textAlign: "left",
    lineHeight: 15,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  letterIcon: {
    top: 4,
    left: 9,
    width: 17,
    height: 13,
    position: "absolute",
  },
  message: {
    top: 176,
    left: 130,
  },
  servicename: {
    left: 130,
    letterSpacing: 1,
    lineHeight: 20,
    fontFamily: FontFamily.quicksandRegular,
    width: 227,
    height: 56,
    textAlign: "left",
    color: Color.colorBlack,
    top: 106,
    alignItems: "center",
    display: "flex",
    fontSize: FontSize.size_xl,
  },
  serviceimageIcon: {
    width: 118,
    height: 118,
    left: 0,
  },
  headerChild: {
    backgroundColor: Color.colorDarkslategray_500,
  },
  chevronLeftIcon: {
    top: 14,
    left: 15,
    width: 35,
    height: 48,
    position: "absolute",
  },
  forApproval: {
    top: 12,
    left: 52,
    fontSize: FontSize.size_21xl,
    width: 326,
    textAlign: "left",
  },
  providerbookingdetails: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    position:"relative",
    justifyContent: 'center',
},
centeredContainer1: {
  
  alignItems: 'center',
  position:"relative",
  justifyContent: 'center',
},
servicecontainerLayout: {
height: 118,
position: "absolute",

},
servicecontainer: {
    top: -80,
    width: windowWidth * 0.890, 
    
    
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  maxHeight: '80%',
},
modalHeader: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  height:200,
  maxHeight: 200,
  // minHeight: 200,
},
closeIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
},
bookingscreen2: {
  flex: 1,
  width: "100%",
  height:  760,
  height: windowHeight > 732 ? windowHeight : 770,
  overflow: "hidden",
  // backgroundColor: Color.colorWhite,
  
  
},


container01: {
  // flex: 1,
  // justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#ffffff",
},
seekerInfo: {
  position: "absolute",
  top: windowHeight* -0.355,
//  alignItems: "center",  
},



//////////////
servicecontainer2Layout: {
  height: 118,
  position: "absolute",
},
serviceinfo2Layout: {
  width: 246,
  top: 0,
},
role2FlexBox: {
  textAlign: "left",
  position: "absolute",
},
message2Layout: {
  height: 21,
  width: 139,
  left: 0,
  // position: "absolute",
},
serviceimage2Icon: {
  width: 118,
  left: 0,
  top: 0,
},
servicename2: {
  fontSize: FontSize.size_xl,
  letterSpacing: 1,
  lineHeight: 20,
  fontFamily: FontFamily.quicksandRegular,
  color: Color.colorBlack,
  display: "flex",
  alignItems: "center",
  width: windowWidth * 0.6,
  textAlign: "left",
  
  
  paddingBottom: 1,
  
},
message2Child: {
  borderRadius: Border.br_9xs,
  backgroundColor: Color.colorGainsboro_100,
  top: 0,
},
role2: {
  top: 3,
  left: 24,
  fontSize: FontSize.size_xs,
  letterSpacing: 0.6,
  lineHeight: 15,
  fontWeight: "600",
  fontFamily: FontFamily.quicksandSemiBold,
  color: Color.colorDarkslategray_500,
},
lettericon2: {
  top: 4,
  left: 4,
  width: 17,
  height: 13,
  position: "absolute",
},
message2: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
},
serviceinfo2: {
  left: 126,
  height: 85,
  position: "absolute",
},
servicecontainer2: {
  top: 20,
  width: windowWidth * 0.890, 
    
},
serviceinfo: {
  backgroundColor: Color.colorWhite,
  flex: 1,
  width: "100%",
  height: 932,
  overflow: "hidden",
},


});
  



export default ProviderBookingStatusScreen;