"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

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
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
 
export const EarningNavigatorStack = createAppContainer(EarningNavigator);
