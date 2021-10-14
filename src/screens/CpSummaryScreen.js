// Displays detailed information about carpark

// TO DO: design and lot info for heavy vehicles and motorcycles
import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import styles from "../styles/AppStyles";

export default class CpSummaryScreen extends Component {
  #cpInfo = this.props.route.params.cpInfo;
  #navigation = this.props.navigation;
  #url = "https://www.google.com/maps/dir/?api=1&parameters";

  render() {
    const proceedToMapsHandler = () => {
      console.log("GMaps");
      console.log(this.#cpInfo);
    };
    return (
      <View style={styles.container}>
        <View syle={styles.containerWhite}>
          <Text style={styles.txtCPSummary}>Car Park Summary</Text>
          <Text style={styles.txtListItemsAddress}>
            Address: {this.#cpInfo.address}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Available car lots:
            {this.#cpInfo["c_lots_available"] != null
              ? this.#cpInfo["c_lots_available"]
              : "No information available"}
          </Text>
          {this.#cpInfo["h_lots_available"] != null ? (
            <Text style={styles.txtListItemsAddress}>
              Available heavy vehicle lots: {this.#cpInfo["h_lots_available"]}
            </Text>
          ) : undefined}
          {this.#cpInfo["y_lots_available"] != null ? (
            <Text style={styles.txtListItemsAddress}>
              Available motorcycle lots: {this.#cpInfo["y_lots_available"]}
            </Text>
          ) : undefined}
          <Text style={styles.txtListItemsAddress}>
            Car park type: {this.#cpInfo.car_park_type}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Payment type: {this.#cpInfo.type_of_parking_system}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Short term parking: {this.#cpInfo.short_term_parking}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Free parking: {this.#cpInfo.free_parking}
          </Text>
          <Text style={styles.txtListItemsAddress}>
            Night parking: {this.#cpInfo.night_parking}
          </Text>
        </View>
        <Button onPress={proceedToMapsHandler} title="Proceed to Google Maps" />
      </View>
    );
  }
}
