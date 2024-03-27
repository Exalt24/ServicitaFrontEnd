import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Header_Category from '../components/Header_Category';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Result from "../components/Result";


const CategoryScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <Header_Category title="Category Name" />
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="gray"
          // Add any additional TextInput props as needed
        />
        <Ionicons name="filter-circle" size={24} color="gray" style={styles.filterIcon} />
        
      </View>
      
      <View style={{ marginTop: 1, marginBottom:200 }}>
        <Result />
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20, // Adjust border radius to change the roundness
    borderWidth: 1, // Add a border
    borderColor: 'gray', // Border color
    marginVertical: 15, // Adjust vertical margin
    marginHorizontal: 20, // Adjust horizontal margin
    height: 45, // Adjust the height of the search bar
    width: '90%', // Adjust the width of the search bar
  },
  searchIcon: {
    marginRight: 5,
  },
  filterIcon: {
    
    fontSize: 55,
    height: 50,
    position: 'relative', // Position the icon absolutely
    left: 35.8, // Adjust position as needed
    top: '2.6%', // Center vertically
    color:"#07374d",
    paddingHorizontal: 9,
    marginHorizontal: 10, // Adjust horizontal margin
    
   transform: [{ translateY: -12 }], // Adjust to center the icon vertically
   
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  
});