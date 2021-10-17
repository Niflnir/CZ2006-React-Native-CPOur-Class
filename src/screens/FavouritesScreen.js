// Displays list of favourited carparks/locations

// TO DO: everything

import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../styles/AppStyles";

const FavouritesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Fav</Text>
      <TextInput placeholder="1" />
      <Text>Fav</Text>
      <View style={{ flex: 1 }}>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
        <Text>Fav</Text>
      </View>
    </View>
  );
};

export default FavouritesScreen;
