// Handles stack navigation between pages
// For now, only includes WelcomeScreen, OTPScrene, CpSearchScreen, and SearchScreen
// Later will add all the other features like navigation, cp summary, budgeting etc.

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/CpSearch/SearchScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OTPScreen from "../screens/OTPScreen";
import CpSummaryScreen from "../screens/CpSummaryScreen";
import MainSearchScreen from "../screens/CpSearch/MainSearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import BudgetingScreen from "../screens/BudgetingScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function StackNavFav() {
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fav" component={FavouritesScreen} />
      <Stack.Screen name="CpSearch" component={MainSearchScreen} />
      <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
      <Stack.Screen name="Summary" component={CpSummaryScreen} />
      <Stack.Screen name="Budgeting" component={BudgetingScreen} />
      <Stack.Screen name="Maps" component={MapScreen} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
