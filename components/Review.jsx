
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import  { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const reviewsData = [
  {
    id: 1,
    userImage:require('../assets/rectangle-371.jpg') ,
    userName: 'Wyeth Obrero',
    ratingStar: 5,
    reviewText: 'Excellent service! Magbooking na kayo mga bhiee!',
    reviewImages: [
      require('../assets/review1.jpg'),
      require('../assets/review2.jpg'),
      require('../assets/review3.jpg'),
    ],
    date: '2024-03-26',
    time: '10:00 AM',
  },
  {
    id: 2,
    userImage: require('../assets/rectangle-370.jpg'),
    userName: 'Darmae Tan',
    ratingStar: 5,
    reviewText: 'Excellent service! Highly recommended.',
    reviewImages: [
      
    ],
    date: '2024-03-25',
    time: '11:30 AM',
  },
  {
    id: 3,
    userImage: require('../assets/rectangle-372.jpg'),
    userName: 'Alexis Padolina',
    ratingStar: 4,
    reviewText: "Great service! Really satisfied with my ate's look.",
    reviewImages: [
      require('../assets/review5.jpg'),
      require('../assets/review6.jpg'),

    ],
    date: '2024-03-26',
    time: '10:00 AM',
  },
  
  {
    id: 4,
    userImage: require('../assets/rectangle-374.jpg'),
    userName: 'John Dico',
    ratingStar: 5,
    reviewText: 'Great service! Really satisfied with my booking.',
    reviewImages: [

      
    ],
    date: '2024-03-25',
    time: '11:30 AM',
  },
  {
    id: 5,
    userImage: require('../assets/image-14.png'),
    userName: 'Wyndel Asoy',
    ratingStar: 3,
    reviewText: '',
    reviewImages: [
      require('../assets/review4.jpg'),
    ],
    date: '2024-03-24',
    time: '09:45 AM',
  },
  
  
  
  {
    id: 6,
    userImage: require('../assets/rectangle-372.jpg'),
    userName: 'Alexis Padolina',
    ratingStar: 3,
    reviewText: 'Good service. Could be better.',
    reviewImages: [
      
    ],
    date: '2024-03-24',
    time: '09:45 AM',
  },
  
  
];


const ReviewItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.reviewItemContainer}>
      <Image source={item.userImage} style={styles.userImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.userName}>{item.userName}</Text>
        {/* Render rating stars based on item.ratingStar */}
        <Text style={styles.ratingStar} >{'★'.repeat(item.ratingStar)}</Text>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
        {item.reviewImages && item.reviewImages.length > 0 && (
          <FlatList
            horizontal
            data={item.reviewImages}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => openModal(index)}>
                <Image source={item} style={styles.reviewImage} />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <Text style={styles.dateTime}>{item.date} - {item.time}</Text>
      </View>

      <Modal visible={modalVisible} transparent={false}>
        <View style={styles.modalContainer}>
          <Swiper
            index={selectedIndex}
            loop={false}
            showsPagination={false}
            onIndexChanged={(index) => setSelectedIndex(index)}
          >
            {item.reviewImages && item.reviewImages.map((image, index) => (
              <View key={index} style={styles.swiperImageContainer}>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Ionicons name="close-circle-outline" size={36} color="white" />
                </Pressable>
                <Image source={image} style={styles.swiperImage} resizeMode="contain" />
              </View>
            ))}
          </Swiper>
        </View>
      </Modal>
    </View>
  );
};

const Reviews = () => {
  return (
    <FlatList
      data={reviewsData}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  reviewItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewText: {
    marginBottom: 4,
    marginRight: 18,
    textAlign: 'justify'
  },
  reviewImage: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
  dateTime: {
    color: '#999999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  ratingStar: {
    color: "#07374d" ,
  },
});

export default Reviews;