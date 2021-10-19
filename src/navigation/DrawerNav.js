// Sidebar with Favourites, Clear Search History, and Logout

import React from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import FavouritesScreen from "../screens/FavouritesScreen";
import StackNav from "./StackNav";
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

export default function DrawerNav() {
  return (
    <NavigationContainer>
      <ActualDrawer />
    </NavigationContainer>
  );
}

// Allows navigation between Search and Favourites
function ActualDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 100,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Search" component={StackNav} />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
    </Drawer.Navigator>
  );
}

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

// Allows access to logout and clear search history
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Clear Search History" onPress={clearSearchHistory} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
}
