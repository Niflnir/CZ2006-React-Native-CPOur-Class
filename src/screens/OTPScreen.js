import React, { Component, createRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import styles from "../styles/AppStyles";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import OTPScreenManager from "../utils/ScreenManagers/OTPScreenManager";

class OTPScreen extends Component {
  /**
   * Sends out OTP to user's input phone number, prompts user to enter OTP, and verifies OTP
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      otpDigit: [],
      timeLeft: 60,
    };
  }
  ref1 = createRef();
  ref2 = createRef();
  ref3 = createRef();
  ref4 = createRef();
  ref5 = createRef();
  ref6 = createRef();
  #otpArray = [];
  #FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
    authDomain: "otpauth-a7ce0.firebaseapp.com",
    databaseURL:
      "https://otpauth-a7ce0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "otpauth-a7ce0",
    storageBucket: "otpauth-a7ce0.appspot.com",
    messagingSenderId: "872099527391",
    appId: "1:872099527391:web:c9f35e7bef7d4b599c876a",
  };

  #recaptchaVerifier = createRef(null);
  #navigation = this.props.navigation;
  #phoneNumber = this.props.route.params.phoneNumber;
  #temp;
  #verificationId = "";
  #manager = new OTPScreenManager();
  componentDidMount() {
    try {
      if (this.#FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(this.#FIREBASE_CONFIG);
      }
    } catch (error) {
      console.log(error);
    }
    this.sendOTP();
  }

  /**
   * Sends OTP to user's input phone number and starts timer for OTP expiry
   */
  async sendOTP() {
    if (this.ref1.current) {
      setTimeout(() => this.ref1.current.focus(), 200);
    }
    this.ref1.current.clear();
    this.ref2.current.clear();
    this.ref3.current.clear();
    this.ref4.current.clear();
    this.ref5.current.clear();
    this.ref6.current.clear();

    this.setState({ timeLeft: 60 });
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      this.#verificationId = "";
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+65" + this.#phoneNumber,
        this.#recaptchaVerifier.current
      );
      this.#verificationId = verificationId;
      this.timer();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  /**
   * Timer for OTP expiry
   */
  async timer() {
    for (var i = 0; i < 60; i++) {
      this.#temp = setTimeout(
        () => this.setState({ timeLeft: --this.state.timeLeft }),
        1000 * i
      );
    }
  }

  /**
   * Verifies and validates OTP entered by OTP and displays corresponding error message if validation fails
   */
  async verifyOTP() {
    clearTimeout(this.#temp);
    var otp = [];
    for (var i = 0; i < 6; i++) {
      otp += this.#otpArray[i];
    }
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.#verificationId,
        otp
      );
      const authResult = await firebase.auth().signInWithCredential(credential);
      this.setState({ verificationId: "", verificationCode: "" });
      const validSignIn = this.#manager.checkValidSignIn();
      if (validSignIn) {
        this.#navigation.navigate("CpSearch");
      } else {
        this.#navigation.navigate("WelcomeScreen");
      }
    } catch (err) {
      if (
        err.message ==
        "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user."
      ) {
        Alert.alert(
          "Error",
          "OTP is incorrect. Please press “Resend OTP” to try again."
        );
      }
    }
  }

  /**
   * Displays UI components of screen
   *
   * @returns {View} The UI components
   */
  render() {
    /**
     * When user presses "Verify OTP" button, calls verifyOTP() function or displays error message if OTP expired
     */
    const onPressBtn = () => {
      if (this.state.timeLeft == 0) {
        Alert.alert(
          "Error",
          "OTP has expired. Please press 'Resend OTP' to retry"
        );
        return;
      }
      this.verifyOTP();
    };

    /**
     * Resends OTP if user presses "Resend OTP button"
     */
    const resendOTP = () => {
      this.sendOTP();
    };

    /**
     * Updates value of each OTP digit whenever inputs or delets a character
     * @param {number} digit Digit input by user
     * @param {number} index Index of textInput in which user input digit
     */
    const onOTPInput = (digit, index) => {
      const refs = [
        this.ref1,
        this.ref2,
        this.ref3,
        this.ref4,
        this.ref5,
        this.ref6,
      ];

      this.setState({ otpDigit: digit });
      if (index <= 5 && !isNaN(digit) && digit != "") {
        if (index < 5) {
          refs[index + 1].current.focus();
        }
        this.#otpArray[index] = digit;
      } else if (index > 0 && digit == "") {
        refs[index - 1].current.focus();
        this.#otpArray[index] = null;
      }
    };
    return (
      <View style={styles.containerLogo}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={this.#recaptchaVerifier}
          firebaseConfig={this.#FIREBASE_CONFIG}
        />
        <Image
          style={styles.logo}
          source={require("../assets/images/carparkourlogo.png")}
        ></Image>
        <View style={styles.containerOTP}>
          <TextInput
            ref={this.ref1}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 0)}
            secureTextEntry={true}
            maxLength={1}
          />
          <TextInput
            ref={this.ref2}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 1)}
            secureTextEntry={true}
            maxLength={1}
          />
          <TextInput
            ref={this.ref3}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 2)}
            secureTextEntry={true}
            maxLength={1}
          />
          <TextInput
            ref={this.ref4}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 3)}
            secureTextEntry={true}
            maxLength={1}
          />
          <TextInput
            ref={this.ref5}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 4)}
            secureTextEntry={true}
            maxLength={1}
          />
          <TextInput
            ref={this.ref6}
            style={styles.txtInpOTP}
            keyboardType="numeric"
            onChangeText={(otpDigit) => onOTPInput(otpDigit, 5)}
            secureTextEntry={true}
            maxLength={1}
          />
        </View>
        {this.state.timeLeft > 0 ? (
          <Text style={styles.txtGrey}>
            This OTP will expire in {this.state.timeLeft}s
          </Text>
        ) : (
          <Text style={styles.txtRed}>Warning: OTP has expired</Text>
        )}
        <View style={styles.containerResendOTP}>
          <Text style={styles.txtGrey}>Didn't receive OTP? </Text>
          <TouchableOpacity style={styles.btnContinue} onPress={resendOTP}>
            <Text style={styles.txtResendOTP}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnContinue} onPress={onPressBtn}>
          <Text style={styles.txtContinue}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OTPScreen;
