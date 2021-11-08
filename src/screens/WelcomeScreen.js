import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/AppStyles";
import WelcomeScreenManager from "../utils/ScreenManagers/WelcomeScreenManager";

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
  #manager = new WelcomeScreenManager();

  /**
   * Displays UI components of screen
   *
   * @returns {View} The UI components
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
      if (this.#manager.checkValidNumber(this.state.phoneNumber)) {
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
