// Login/Registration page
// When user opens app for first time, prompted to enter phone number for login/registration
// When user presses continue, redirected to OTP page and OTP sent to registered phone number
import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import styles from "../styles/AppStyles";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
    };
  }
  #navigation = this.props.navigation;

  render() {
    // Updates value of phone number
    const onChangePhoneNumber = (number) => {
      this.setState({ phoneNumber: number });
    };

    // User is directed to OTP screen when "continue" is pressed
    const onPressContinueHandler = () => {
      if (this.state.phoneNumber.length != 8 || this.state.phoneNumber.isNaN) {
        Alert.alert(
          "Error",
          "Please enter a valid 8 digit Singapore-registered phone number"
        );
      } else {
        this.#navigation.navigate("OTPScreen", {
          phoneNumber: this.state.phoneNumber,
        });
      }
    };
    return (
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("../assets/images/carparkourlogo.png")}
        ></Image>

        <TextInput
          style={styles.txtInpPhoneNumber}
          placeholder="Phone number"
          keyboardType="phone-pad"
          onChangeText={onChangePhoneNumber}
          secureTextEntry={false}
        />
        <TouchableOpacity
          style={styles.btnContinue}
          onPress={onPressContinueHandler}
        >
          <Text style={styles.txtContinue}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
