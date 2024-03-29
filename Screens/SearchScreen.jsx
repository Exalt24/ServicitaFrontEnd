import { View, Text, Image, TextInput, SafeAreaView,  TouchableOpacity, Pressable, StyleSheet, Dimensions, FlatList} from 'react-native';
import React from 'react';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Result from "../components/Result";
import RecentSearch from "../components/RecentSearch";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SearchScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{marginTop:25}}>
      
      {/* Header */}

    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <AntDesign name="search1" size={24} color="#002D62" />
          <TextInput placeholder="Search for services or more" style={styles.searchInput} />
        </View>

        <Pressable onPress={()=>navigation.navigate("Filter")}>
        <Ionicons name="filter" size={24} color="white" style={styles.filter} />
        </Pressable>
      </View>
    </View>

    
        
        {/*<View style={{ marginTop: 15, marginBottom:200 }}>
        <Text style={styles.results}>Recent Searches</Text>
          <RecentSearch />
        </View>*/}

        <View style={{ marginTop: 15, marginBottom:200 }}>
        <Text style={styles.results}>Results</Text>
          <Result />
        </View>



    </SafeAreaView>
   
  )
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#07364B',
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 10, // Adjust horizontal margin to change space between search bar and filter icon
    marginRight: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 8, // Adjust vertical padding to change height
    paddingHorizontal: 5,
    borderColor: '#002147',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginLeft: 15
  },
  searchInput: {
    flex: 1, // Take remaining space within the searchBar
    marginLeft: 8, // Adjust left margin to create space between icon and input
  },

  filter: {
    marginLeft:15
  },

  container1: {
    flexDirection: 'row',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between them
    marginTop: 10,
    marginRight:20,
    marginLeft: 20,
    marginBottom: 10
  },
 
  viewAllText: {
    color: 'black',
    fontSize: 15,
    fontWeight:'bold'
  },

  categoriesText: {
    color: 'black',
    fontSize: 15,
    fontWeight:"bold"
  },
  results: {
    color: 'black',
    fontWeight:"bold",
    fontSize: 14,
    marginLeft:20,
    marginBottom:10,
  }
});

export default SearchScreen;
 
  