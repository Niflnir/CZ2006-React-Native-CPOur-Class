// Handles stack navigation between pages
// For now, only includes WelcomeScreen, OTPScrene, CpSearchScreen, and SearchScreen
// Later will add all the other features like navigation, cp summary, budgeting etc.

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import OTPScreen from "../screens/OTPScreen";
import MainSearchScreen from "../screens/CpSearch/MainSearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./StackNav";

const Stack = createNativeStackNavigator();

export default function StackNavLogin() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="CpSearch" component={MainSearchScreen} />
        <Stack.Screen name="App" component={StackNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
