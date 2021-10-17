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

export default class BudgetingScreen extends Component {
  #navigation = this.props.navigation;
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
    };
  }
  render() {
    const onPressSwitch = () => {
      this.setState({ calculateTime: !this.state.calculateTime });
    };
    const onChangeDollar = (budget) => {
      this.setState({ budget: budget });
    };
    const onChangeHours = (hours) => {
      this.setState({ hours: hours });
    };
    const onChangeMins = (minutes) => {
      this.setState({ minutes: minutes });
    };
    const onPressCalculateTime = () => {
      Keyboard.dismiss();
      const budgetCalculator = new BudgetCalculator();
      this.setState({
        resultTime: budgetCalculator.calculateTime(this.state.budget),
      });
    };
    const onPressCalculateBudget = () => {
      const budgetCalculator = new BudgetCalculator();
      Keyboard.dismiss();
      this.setState({
        resultBudget: budgetCalculator.calculateBudget(
          this.state.hours,
          this.state.minutes
        ),
      });
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
      </View>
    );
  }
}
