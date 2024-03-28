
import { View, StyleSheet, ScrollView,TouchableOpacity, Dimensions, Text} from 'react-native';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import ServiceTop from '../components/ServiceTop';
//import Navigator from '../components/Navigator';
import Review from '../components/Review';
import Post from '../components/Post';
import { useState } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ServiceViewScreen = () => {

  const [activeTab, setActiveTab] = useState("Post"); // State to track active tab

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        <View>
          <ServiceTop />
        </View>

        <View style={[styles.navigator, styles.navigatorContainer]}>

        <TouchableOpacity onPress={() => handleTabPress("Description")}>
          <Text style={[styles.tabText, activeTab === "Description" && styles.activeTab]}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress("Post")}>
          <Text style={[styles.tabText, activeTab === "Post" && styles.activeTab]}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress("Review")}>
          <Text style={[styles.tabText, activeTab === "Review" && styles.activeTab]}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress("Photos")}>
          <Text style={[styles.tabText, activeTab === "Photos" && styles.activeTab]}>Photos</Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeTab === "Review" && <Review />}
      </View>  
      <View>
        {activeTab === "Post" && <Post />}
      </View>
      

      
      

      

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: Color.colorWhite,
  },
  navigatorContainer: {
    borderTopWidth: 2,  // Add border to the top
    borderBottomWidth: 2,  // Add border to the bottom
    borderColor: '#CCCCCC',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandRegular,
    lineHeight: 13,
    letterSpacing: 0.6,
    fontSize: FontSize.size_xs,
    position: "relative",
    marginHorizontal: 25,
  },
  activeTab: {
    fontWeight: "bold", // You can customize the styling for active tab
    textDecorationLine: "underline",
    color: "#07374d",
  },
  navigator: {
    backgroundColor: Color.colorWhite,
    width: windowWidth,
    height: 40,
    overflow: "hidden",
    flexDirection: "row", // Arrange tabs horizontally
    alignItems: "center", // Align items vertically at the center
    justifyContent: "center", // Horizontally center the tabs
  },
});

export default ServiceViewScreen;
