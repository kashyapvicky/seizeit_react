"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Explore from "./Explore";


export const ExploreNavigator = createStackNavigator(
    {
        Explore:Explore,
      },
  {
    initialRouteName: "Explore",
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
 
export const ExploreNavigatorStack = createAppContainer(ExploreNavigator);
