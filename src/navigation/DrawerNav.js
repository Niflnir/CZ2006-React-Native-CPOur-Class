// Sidebar with Favourites, Clear Search History, and Logout

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import FavouritesScreen from "../screens/FavouritesScreen";
import StackNav from "./StackNav";
import clearSearchHistory from "../utils/db/ClearSearchHistory";

const Drawer = createDrawerNavigator();

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

// Allows access to logout and clear search history
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Clear Search History" onPress={clearSearchHistory} />
      <DrawerItem label="Logout" />
    </DrawerContentScrollView>
  );
}
