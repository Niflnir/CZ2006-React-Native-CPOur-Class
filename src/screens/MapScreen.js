// Displays list of favourited carparks/locations

// TO DO: everything

import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../styles/AppStyles";
import { ExpoLeaflet } from "expo-leaflet";

export default class MapsScreen extends Component {
  render() {
    // let mapLayer = {
    //   baseLayerName: "OpenStreetMap", // This will be seen in the layer selection control
    //   baseLayerIsChecked: "true", // If the layer is selected in the layer selection control
    //   layerType: "TileLayer",
    //   baseLayer: true,
    //   url: `https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png`,
    //   attribution:
    //     '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
    // };
    return (
      <View style={styles.container}>
        <Text>Maps</Text>
      </View>
    );
  }
}
