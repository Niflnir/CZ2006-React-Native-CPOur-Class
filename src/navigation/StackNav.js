// Handles stack navigation between pages
// For now, only includes WelcomeScreen, OTPScrene, CpSearchScreen, and SearchScreen
// Later will add all the other features like navigation, cp summary, budgeting etc.

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/CpSearch/SearchScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
//import { useFonts } from "expo-font";
import OTPScreen from "../screens/OTPScreen";
import CpSummaryScreen from "../screens/CpSummaryScreen";
import MainSearchScreen from "../screens/CpSearch/MainSearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import BudgetingScreen from "../screens/BudgetingScreen";
import Login from "../utils/Login";
import { useEffect } from "react";
import * as firebase from "firebase";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
    authDomain: "otpauth-a7ce0.firebaseapp.com",
    projectId: "otpauth-a7ce0",
    storageBucket: "otpauth-a7ce0.appspot.com",
    messagingSenderId: "872099527391",
    appId: "1:872099527391:web:c9f35e7bef7d4b599c876a",
  };
  try {
    if (FIREBASE_CONFIG.apiKey) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  } catch (err) {
    // ignore app already initialized error on snack
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      console.log(loggedIn);
    }
  });
  if (loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CpSearch" component={MainSearchScreen} />
          <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
          <Stack.Screen name="Summary" component={CpSummaryScreen} />
          <Stack.Screen name="Budgeting" component={BudgetingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="CpSearch" component={MainSearchScreen} />
        <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
        <Stack.Screen name="Summary" component={CpSummaryScreen} />
        <Stack.Screen name="Budgeting" component={BudgetingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
