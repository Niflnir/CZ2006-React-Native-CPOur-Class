// Handles stack navigation between pages
// For now, only includes WelcomeScreen, OTPScrene, CpSearchScreen, and SearchScreen
// Later will add all the other features like navigation, cp summary, budgeting etc.

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CpSearchScreen from "../screens/CpSearch/CpSearchScreen";
import SearchScreen from "../screens/CpSearch/SearchScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
// import { useFonts } from "expo-font";
import OTPScreen from "../screens/OTPScreen";
import CpSummaryScreen from "../screens/CpSummaryScreen";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  // let [fontsLoaded] = useFonts({
  //   lexendexa: require("./assets/fonts/LexendExa.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return <Text>loading</Text>;
  // }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="OTPScreen" component={OTPScreen} /> */}
      <Stack.Screen name="CpSearch" component={CpSearchScreen} />
      <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
      <Stack.Screen name="Summary" component={CpSummaryScreen} />
    </Stack.Navigator>
  );
}
