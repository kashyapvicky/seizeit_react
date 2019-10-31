"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import {TransitionConfig} from "../../AppNavigationConfiguration";

import Explore from "./Explore";
import Filter from "../Home/Filter";
const ModalStack = createStackNavigator(
  {
    ExploreFilter: {
      screen: Filter,
      params: { isModal: true }
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export const CardStack = createStackNavigator(
  {
    Explore: Explore
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
export const ExploreNavigator = createStackNavigator(
  {
    CardStack: CardStack,
    ModalStack: { screen: ModalStack, params: { isModalStack: true } }
  },
  {
    initialRouteName: "CardStack",
    headerMode: "none",
    mode: "modal",
    initialRouteParams: { transition: "horizontal" },
    transitionConfig: TransitionConfig
  }
);

export const ExploreNavigatorStack = createAppContainer(ExploreNavigator);
