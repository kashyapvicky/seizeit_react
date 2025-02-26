import React from "react";
import { Animated, Easing, Platform } from 'react-native';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import styles from "./styles";
// Import Navigation Stack
import { AuthNavigatorStack } from "./screens/Auth/AuthNavigationConfiguration";
import {VendorTabNavigator,CustomerTabNavigator} from './TabNavigator'

const {
  forHorizontal,
  forVertical,
  forFadeFromBottomAndroid,
  forFade,
} = CardStackStyleInterpolator;

export const MainNavigator = createSwitchNavigator(
  {
    AuthNavigatorStack: { screen: AuthNavigatorStack },
    VendorTabNavigator:{screen:VendorTabNavigator},
    CustomerTabNavigator:{screen:CustomerTabNavigator}
  },
  {
    initialRouteName: "AuthNavigatorStack",
    mode: Platform.OS === "ios" ? "card" : "card",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    },
    swipeEnabled: false,
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
const TransitionSpec = {
  duration: 300,
  // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  // timing: Animated.timing,
};
export const TransitionConfig = () => {
  // return {
  //   transitionSpec: TransitionSpec,
  //   screenInterpolator: (sceneProps) => {
  //     const params = sceneProps.scene.route.params || {};
  //     const transition = params.transition || Platform.OS;
  //     return {
  //       horizontal: forHorizontal(sceneProps),
  //       vertical: forVertical(sceneProps),
  //       modal: forVertical(sceneProps),
  //       fade: forFade(sceneProps),
  //       ios: forHorizontal(sceneProps),
  //       android: forFadeFromBottomAndroid(sceneProps),
  //     }[transition];
  //   }
  // }
};
// Main Stack Container
export const AppStack = createAppContainer(MainNavigator);
