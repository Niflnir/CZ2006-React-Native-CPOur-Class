import { Alert } from "react-native";

export default class WelcomeScreenManager {
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
