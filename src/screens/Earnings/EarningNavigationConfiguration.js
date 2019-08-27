"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Earning from "./Earning";


export const EarningNavigator = createStackNavigator(
    {
        Earning:Earning,
      },
  {
    initialRouteName: "Earning",
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
 
export const EarningNavigatorStack = createAppContainer(EarningNavigator);
