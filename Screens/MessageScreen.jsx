import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../styles";

function MessageScreen(props) {
    return (
      <View style={ styles.viewStyle }>
        <View>
          <Text style={ styles.textStyle }>This is the Message Screen</Text>
        </View>
        <View style={ styles.buttonViewStyle }>
          <Button
            style={[styles.buttonStyle, { backgroundColor: 'red' }]}
            textColor="white"
            onPress={() => props.navigation.navigate('Profile', { name: "Daniel" })}
          >
            Profile
          </Button>
          <Button
            style={[styles.buttonStyle, { backgroundColor: 'green' }]}
            textColor="white"
            onPress={() => props.navigation.navigate('User')}
          >
            User
          </Button>
        </View>
      </View>
    );
  }
  
  export default MessageScreen;