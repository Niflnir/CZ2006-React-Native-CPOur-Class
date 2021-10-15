import React, { useEffect, useState, useRef, Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import styles from "../styles/AppStyles";

export default class BudgetingScreen extends Component {
  #navigation = this.props.navigation;
  render() {
    return (
      <View style={styles.container}>
        <Text>BudgetingScreen</Text>
      </View>
    );
  }
}
