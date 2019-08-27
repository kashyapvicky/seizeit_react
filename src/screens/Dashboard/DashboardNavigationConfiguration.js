"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Dashboard from "./Dashboard";


export const DashboardNavigator = createStackNavigator(
    {
      Dashboard:Dashboard,
      },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    })
  }
);
 
export const DashboardNavigatorStack = createAppContainer(DashboardNavigator);
