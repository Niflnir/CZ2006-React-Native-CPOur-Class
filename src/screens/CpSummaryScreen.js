// Displays detailed information about carpark

// TO DO: design and lot info for heavy vehicles and motorcycles
import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/AppStyles";

const CpSummaryScreen = ({ route, navigation }) => {
  const cpInfo = route.params.cpInfo;
  return (
    <View style={styles.container}>
      <View syle={styles.containerWhite}>
        <Text style={styles.txtCPSummary}>Car Park Summary</Text>
        <Text style={styles.txtListItemsAddress}>
          Address: {cpInfo.address}
        </Text>
        <Text style={styles.txtListItemsAddress}>
          Available car lots:{" "}
          {cpInfo["c_lots_available"] != null
            ? cpInfo["c_lots_available"]
            : "No information available"}
        </Text>
        {/* <Text style={styles.txtListItemsAddress}>Available motorcycle lots: {cpInfo["c_lot_ratio"].split("/")[0]}</Text>
        <Text style={styles.txtListItemsAddress}>Total motorcyle lots: {cpInfo["c_lot_ratio"].split("/")[1]}</Text>
        <Text style={styles.txtListItemsAddress}>Available heavy vehicle lots: {cpInfo["c_lot_ratio"].split("/")[0]}</Text>
        <Text style={styles.txtListItemsAddress}>Total heavy vehicle lots: {cpInfo["c_lot_ratio"].split("/")[1]}</Text> */}
        <Text style={styles.txtListItemsAddress}>
          Car park type: {cpInfo.car_park_type}
        </Text>
        <Text style={styles.txtListItemsAddress}>
          Payment type: {cpInfo.type_of_parking_system}
        </Text>
        <Text style={styles.txtListItemsAddress}>
          Short term parking: {cpInfo.short_term_parking}
        </Text>
        <Text style={styles.txtListItemsAddress}>
          Free parking: {cpInfo.free_parking}
        </Text>
        <Text style={styles.txtListItemsAddress}>
          Night parking: {cpInfo.night_parking}
        </Text>
      </View>
    </View>
  );
};

export default CpSummaryScreen;
