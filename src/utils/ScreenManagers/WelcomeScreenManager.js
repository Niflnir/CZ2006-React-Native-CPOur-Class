import { Alert } from "react-native";
/**
 * Manages main logic behind WelcomeScreen class
 */
class WelcomeScreenManager {
  /**
   * Checks if the input phone number is valid
   *
   * @param {String} phoneNumber The phone number input by the user
   * @returns {boolean} Whether the input phone number is valid
   */
  checkValidNumber(phoneNumber) {
    if (phoneNumber.length != 8 || isNaN(phoneNumber)) {
      Alert.alert(
        "Error",
        "Please enter a valid 8 digit Singapore-registered phone number"
      );
      return false;
    }
    return true;
  }
}

export default WelcomeScreenManager;
