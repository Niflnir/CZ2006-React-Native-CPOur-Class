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

/**
 * When user opens app for first time after app installation or logout, user is prompted to enter phone number for login/registration
 */
export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
    };
  }
  #navigation = this.props.navigation;

  /**
   * Displays UI components of screen
   */
  render() {
    /**
     * Updates value of phoneNumber as user inputs or deletes character
     * @param {number} number Phonenumber input by user
     */
    const onChangePhoneNumber = (number) => {
      this.setState({ phoneNumber: number });
    };

    /**
     * If user inputs valid phoneNumber, directs user to OTPScreen, otherwise displays relevant error message
     */
    const onPressContinueHandler = () => {
      if (this.state.phoneNumber.length != 8 || isNaN(this.state.phoneNumber)) {
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
