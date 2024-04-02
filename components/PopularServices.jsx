import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';

const PopularServices = () => {
    //Data
    const data = [
        {
            id: 1,
            title: 'Mr. Daniel Clean',
            description: 'Cleaning Service',
            image: require('../assets/images/slide1.png'),
        },
        {
            id: 2,
            title: 'Barbie Salon',
            description: 'Hair and Make up Service',
            image: require('../assets/images/slide2.png'),
        },
        {
            id: 3,
            title: 'service 3',
            description: 'lami kaayu',
            image: require('../assets/images/slide3.png'),
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList 
                data={data} 
                renderItem={({ item }) => (
                    <View style={styles.flatListContainer}>
                        <Image 
                            source={item.image}
                            style={{ width: '100%', height: 200 }}
                        />
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text1}>{item.description}</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Book Now!</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default PopularServices;

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: "white",
        marginVertical: 10,
        marginHorizontal: 16,
        paddingBottom: 32,
        borderRadius: 15,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        paddingTop: 6,
        paddingLeft: 10
    },
    text1: {
        fontSize: 15,
        paddingLeft: 10
    },
    button: {
        backgroundColor: '#07364B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        textAlign: 'justify',
        fontWeight: 'bold',
    },
});
