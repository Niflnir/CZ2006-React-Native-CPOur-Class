import React, { useEffect, useState, useRef, Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Keyboard,
} from "react-native";
import styles from "../styles/AppStyles";
import BudgetCalculator from "../utils/BudgetCalculator";

/**
 * Allows user to input maximum budget and displays corresponding amount of time user can park
 * Or allows user to input time they wish to park and displays corresponding estimated parking fee
 * @property {Object} cpInfo Carpark information received from CpSummaryScreen
 */
export default class BudgetingScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  constructor(props) {
    super(props);
    this.state = {
      calculateTime: true,
      resultTime: "",
      hours: 0,
      minutes: 0,
      budget: 0,
      resultBudget: "",
      vehicleType: 0,
    };
  }
  /**
   * Displays UI components of screen
   */
  render() {
    /**
     * Switches between budget calculating and time calculating mode when user presses "Switch" button
     */
    const onPressSwitch = () => {
      this.setState({ calculateTime: !this.state.calculateTime });
    };

    /**
     * Updates value of budget every time user inputs or deletes a character
     * @param {string} budget Value of budget input by user in textInput
     */
    const onChangeDollar = (budget) => {
      this.setState({ budget: budget });
    };

    /**
     * Updates value of hours every time user inputs or deletes a character     *
     * @param {string} hours Value of hours input by user in textInput
     */
    const onChangeHours = (hours) => {
      this.setState({ hours: hours });
    };

    /**
     * Updates value of minutes every time user inputs or deletes a character
     * @param {string} minutes Value of minutes input by user in textInput
     */
    const onChangeMins = (minutes) => {
      this.setState({ minutes: minutes });
    };

    /**
     * Calculates duration of time user can park when user enters maximum budget
     */
    const onPressCalculateTime = () => {
      Keyboard.dismiss();
      const budgetCalculator = new BudgetCalculator();
      this.setState({
        resultTime: budgetCalculator.calculateTime(
          this.state.budget,
          this.state.vehicleType,
          this.#cpInfo
        ),
      });
    };

    /**
     * Calculates estimated parking fee when user enters duration they wish to park
     */
    const onPressCalculateBudget = () => {
      const budgetCalculator = new BudgetCalculator();
      Keyboard.dismiss();
      this.setState({
        resultBudget: budgetCalculator.calculateBudget(
          this.state.hours,
          this.state.minutes,
          this.state.vehicleType,
          this.#cpInfo
        ),
      });
    };

    /**
     * Switches between vehicle types when user presses button
     */
    const onPressIndicateVehicleType = () => {
      if (this.state.vehicleType == 0) this.setState({ vehicleType: 1 });
      else if (this.state.vehicleType == 1) this.setState({ vehicleType: 2 });
      else if (this.state.vehicleType == 2) this.setState({ vehicleType: 0 });
    };

    if (this.state.calculateTime) {
      return (
        <View style={styles.containerBudgetingMainWhite}>
          <View style={[styles.containerBudgetingGrey, { height: "47%" }]}>
            <Text style={styles.txtBudgetingWhiteHeading}>Budget</Text>
            <View style={styles.containerBudgetingDollar}>
              <Text style={styles.txtBudgetingDollar}>$</Text>
              <TextInput
                onChangeText={onChangeDollar}
                style={styles.txtInpBudgetingWhite}
                textAlign="left"
                keyboardType="number-pad"
                placeholder="0.00"
                placeholderTextColor="lightgrey"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnBudgetingSwitch}
            onPress={onPressSwitch}
          >
            <Text style={styles.txtBudgetingSwitch}>Switch</Text>
          </TouchableOpacity>
          <View style={[styles.containerBudgetingWhite, { height: "35%" }]}>
            <Text style={styles.txtBudgetingGreyHeading}>Parking Time</Text>
            <Text style={styles.txtBudgetingTime}>{this.state.resultTime}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnBudgetingCalculateGrey}
            onPress={onPressCalculateTime}
          >
            <Text style={styles.txtBudgetingCalculateWhite}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnIndicateVehicleType}
            onPress={onPressIndicateVehicleType}
          >
            <Text style={styles.txtVehicleType}>
              {this.state.vehicleType == 0
                ? "C"
                : this.state.vehicleType == 1
                ? "Y"
                : "H"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.containerBudgetingMainGrey}>
        <View style={[styles.containerBudgetingWhite, { height: "47%" }]}>
          <Text style={styles.txtBudgetingGreyHeading}>Parking Time</Text>
          <View style={styles.containerBudgetingDollar}>
            <TextInput
              onChangeText={onChangeHours}
              style={styles.txtInpBudgetingGrey}
              textAlign="center"
              keyboardType="number-pad"
              placeholder="0"
            />
            <Text style={styles.txtBudgetingTime}>h</Text>

            <TextInput
              onChangeText={onChangeMins}
              style={styles.txtInpBudgetingGrey}
              textAlign="center"
              keyboardType="number-pad"
              placeholder="00"
            />
            <Text style={styles.txtBudgetingTime}>m</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnBudgetingSwitch}
          onPress={onPressSwitch}
        >
          <Text style={styles.txtBudgetingSwitch}>Switch</Text>
        </TouchableOpacity>
        <View style={[styles.containerBudgetingGrey, { height: "35%" }]}>
          <Text style={styles.txtBudgetingWhiteHeading}>Parking Fee</Text>
          <Text style={styles.txtBudgetingDollar}>
            $ {this.state.resultBudget}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnBudgetingCalculateWhite}
          onPress={onPressCalculateBudget}
        >
          <Text style={styles.txtBudgetingCalculateGrey}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnIndicateVehicleType2}
          onPress={onPressIndicateVehicleType}
        >
          <Text style={styles.txtVehicleType2}>
            {this.state.vehicleType == 0
              ? "C"
              : this.state.vehicleType == 1
              ? "Y"
              : "H"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
