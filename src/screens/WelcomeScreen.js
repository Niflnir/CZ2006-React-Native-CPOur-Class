// Login/Registration page
// When user opens app for first time, prompted to enter phone number for login/registration
// When user presses continue, redirected to OTP page and OTP sent to registered phone number
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { set } from "react-native-reanimated";

export default function WelcomeScreen({ navigation }) {
  state = {
    username: "",
    password: "",
    token: "",
  };

  // to update value of phone number as it is entered by user
  const [phoneNumber, setPhoneNumber] = useState();
  const [value, setValue] = useState("");
  const saveValue = () => {
    if (phoneNumber) {
      AsyncStorage.setItem("any_key_here", phoneNumber);
      setPhoneNumber("");
      alert("Data Saved");
    } else {
      alert("Please fill in data");
    }
  };

  const getValue = () => {
    AsyncStorage.getItem("any_key_here").then((value) => {
      setValue(value);
    });
  };
  const onChangePhone = (number) => {
    // updates value of phone number
    setPhoneNumber(number);
  };

  // when user presses "Continue" redirected to OTP page
  const handleContinue = () => {
    if (phoneNumber) {
      console.log(" continue pressed ");
      navigation.navigate("OTPScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/carparkourlogo.png")}
      ></Image>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          keyboardType="numeric"
          onChangeText={(data) => setPhoneNumber(data)}
          value={phoneNumber}
          secureTextEntry={false}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleContinue}>
          <View onPress={saveValue} style={styles.btnContinue}>
            <Text style={styles.textContinue}>continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerAvoidingView: {
    flex: 1,

    alignItems: "center",
    padding: 10,
  },
  logo: {
    height: "65%",
    top: "-10%",
  },
  textInput: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "lexendexa",
    left: 5,
  },
  textInputContainer: {
    backgroundColor: "#FAFAFA",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: "#F3F3F3",
    width: "85%",
    bottom: "10%",
  },

  btnContinue: {
    bottom: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  textContinue: {
    color: "#4f8BFF",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontFamily: "lexendexa",
    bottom: "5%",
  },
});
