

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import BookingSeeker from "../components/BookingSeeker";
import { Ionicons } from '@expo/vector-icons';

function SeekerBookingScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filters = ["Pending", "Accepted", "In Progress", "Completed", "Canceled", "Rejected", "Failed",  "All"];

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    setModalVisible(false);
    // Apply filter logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25  }}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={24} color={Color.colorWhite} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <View >
        <BookingSeeker />
      </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Select Filter</Text>
            </View>
            {filters.map((filter, index) => (
              <TouchableOpacity key={index} onPress={() => handleFilterPress(filter)}>
                <Text style={styles.modalItem}>{filter}</Text>
                {index !== filters.length - 1 && <View style={styles.separator} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

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
    marginLeft: 25,
  },
  filterIcon: {
    marginLeft: 350, // Adjust the spacing between title and icon
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // paddingHorizontal: 80,
    // paddingBottom: 30,
    elevation: 5,
    width: 280,
  },
  modalItem: {
    
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 15,
    color: '#333', // Customize the color of the text
    textAlign: 'center',
    fontWeight: "400"
    
    
  },
  separator: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#cc',
    marginBottom: 10, // Adjust the space between items
    width: 250, // Adjust the width of the separator
    alignSelf: 'center', // Align the separator to the center 
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    height:50,
    width: 280,
    backgroundColor: "#07374d",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.colorWhite,
    alignSelf: 'center',
    
  },
  
});


export default SeekerBookingScreen;