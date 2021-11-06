import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/CpSearch/SearchScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OTPScreen from "../screens/OTPScreen";
import CpSummaryScreen from "../screens/CpSummaryScreen";
import MainSearchScreen from "../screens/CpSearch/MainSearchScreen";
import BudgetingScreen from "../screens/BudgetingScreen";
import { useState } from "react";
import FavouritesScreen from "../screens/FavouritesScreen";
import MapScreen from "../screens/MapScreen";
import SearchHistoryTable from "../utils/db/SearchHistoryTable";
import * as firebase from "firebase";
import { Restart } from "fiction-expo-restart";
import { setSignedOut } from "../utils/DbServices";
import DropAll from "../utils/db/DropAll";

const Drawer = createDrawerNavigator();
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
  authDomain: "otpauth-a7ce0.firebaseapp.com",
  databaseURL:
    "https://otpauth-a7ce0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "otpauth-a7ce0",
  storageBucket: "otpauth-a7ce0.appspot.com",
  messagingSenderId: "872099527391",
  appId: "1:872099527391:web:c9f35e7bef7d4b599c876a",
};

export default class StackNav {
  StackNav() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: "black",
            headerShown: false,
            swipeEnabled: false,
          }}
          drawerContent={(props) => (
            <DrawerContentScrollView>
              <Image
                source={require("../assets/images/carparkourlogo.png")}
              ></Image>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Clear Search History"
                onPress={clearSearchHistory}
              />
              <DrawerItem label="Logout" onPress={logout} />
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen name="Search" component={stackNav} />
          <Drawer.Screen name="Favourites" component={stackNavFav} />
        </Drawer.Navigator>
      </NavigationContainer>
    );

    function clearSearchHistory() {
      const searchHistoryTable = new SearchHistoryTable();
      searchHistoryTable.dropSearchHistoryTable();
      setTimeout(() => searchHistoryTable.createSearchHistoryTable(), 500);
    }

    function logout() {
      try {
        if (FIREBASE_CONFIG.apiKey) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
      } catch (err) {
        // ignore app already initialized error on snack
      }
      const drop = new DropAll();
      drop.dropAll();
      setSignedOut();
      firebase.auth().signOut();
      Restart();
    }

    function stackNav() {
      const Stack = createNativeStackNavigator();
      const [loggedIn, setLoggedIn] = useState(false);
      const FIREBASE_CONFIG = {
        apiKey: "AIzaSyBvPpAz5raqy8-K3walmdScxLJoTjbj-Dc",
        authDomain: "otpauth-a7ce0.firebaseapp.com",
        databaseURL:
          "https://otpauth-a7ce0-default-rtdb.asia-southeast1.firebasedatabase.app",
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
        }
      });
      if (loggedIn) {
        return (
          //<NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CpSearch" component={MainSearchScreen} />
            <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
            <Stack.Screen name="Summary" component={CpSummaryScreen} />
            <Stack.Screen name="Budgeting" component={BudgetingScreen} />
            <Stack.Screen name="Favourites" component={FavouritesScreen} />
            <Stack.Screen name="Maps" component={MapScreen} />
          </Stack.Navigator>
          //</NavigationContainer>
        );
      }
      return (
        //<NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="CpSearch" component={MainSearchScreen} />
          <Stack.Screen name="SearchSuggestions" component={SearchScreen} />
          <Stack.Screen name="Summary" component={CpSummaryScreen} />
          <Stack.Screen name="Budgeting" component={BudgetingScreen} />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
          <Stack.Screen name="Maps" component={MapScreen} />
        </Stack.Navigator>
        //</NavigationContainer>
      );
    }

    function stackNavFav() {
      const Stack = createNativeStackNavigator();

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
  }
}
