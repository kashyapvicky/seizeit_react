import React from "react";
import { Platform, Easing, Animated, Image } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import styles from "./styles";
// Import Navigation Stack
import { AuthNavigatorStack } from "./screens/Auth/AuthNavigationConfiguration";
import {VendorTabNavigator,CustorTabNavigator} from './TabNavigator'
const TabNavigator = CustorTabNavigator

export const MainNavigator = createSwitchNavigator(
  {
    AuthNavigatorStack: { screen: AuthNavigatorStack },
    TabNavigator:{screen:TabNavigator}
  },
  {
    initialRouteName: "TabNavigator",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 200,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    }),
    mode: Platform.OS === "ios" ? "modal" : "card",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
// Main Stack Container
export const AppStack = createAppContainer(MainNavigator);
