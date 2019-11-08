"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Explore from "./Explore";
import Filter from "../Home/Filter";


export const CardStack = createStackNavigator(
  {
    Explore: Explore,
    ExploreFilter: {
      screen: Filter,
      params: { isModal: true }
    }
  },
  {
    initialRouteName: "Explore",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
  }
);
export const ExploreNavigator = createStackNavigator(
  {
    CardStack: CardStack,
    // ModalStack: { screen: ModalStack, params: { isModalStack: true } }
  },
  {
    initialRouteName: "CardStack",
    headerMode: "none",
    mode: "modal",
    initialRouteParams: { transition: "horizontal" },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
  }
);

export const ExploreNavigatorStack = createAppContainer(ExploreNavigator);
