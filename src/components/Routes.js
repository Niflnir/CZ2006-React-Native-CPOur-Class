import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Chip } from "react-native-elements/dist/buttons/Chip";
import styles from "../styles/AppStyles";
const Routes = (props) => {
  const mapShape = props.mapShape;
  var titles = [];
  for (var i = 1; i < mapShape.length; i++) {
    titles = [...titles, { id: i, title: "Route " + i }];
  }
  var buttons = titles.map((btnInfo) => (
    <TouchableOpacity key={btnInfo.id} onPress={props.onPress}>
      <Text style={styles.txtMapInfo}>{btnInfo.title}</Text>
    </TouchableOpacity>
  ));
  return buttons;
};

export default Routes;
