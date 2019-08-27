"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Notification from "./Notification";


export const NotificationNavigator = createStackNavigator(
    {
        Notification:Notification,
      },
  {
    initialRouteName: "Notification",
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
 
export const NotificationNavigatorStack = createAppContainer(NotificationNavigator);
