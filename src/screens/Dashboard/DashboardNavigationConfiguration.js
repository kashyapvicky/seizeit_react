"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Dashboard from "./Dashboard";
import OrdeDetail from "../Settings/OrdeDetail";
export const DashboardNavigator = createStackNavigator(
    {
      Dashboard:Dashboard,
      OrdeDetail:OrdeDetail
      },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
 
export const DashboardNavigatorStack = createAppContainer(DashboardNavigator);
