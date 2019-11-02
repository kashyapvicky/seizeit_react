"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import StartupScreen from "./StartupScreen";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ChooseType from "./ChooseType";
import EnterMobile from "./EnterMobile";
import Verify from "./Verify";
// import EnterEmail from "./EnterEmail";

const AuthStack = createStackNavigator(
  {
    StartupScreen:StartupScreen,
    Signup: { screen: Signup},
    ChooseType: { screen: ChooseType},
    Login: { screen: Login},
    ForgotPassword: { screen: ForgotPassword},
    EnterMobile: { screen: EnterMobile},
    // EnterEmail: { screen: EnterEmail},

    Verify: { screen: Verify},
  },
  {
    initialRouteName: "StartupScreen",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
const SwitchStack = createSwitchNavigator(
  {
    AuthStack: { screen: AuthStack},
  },
  {
    initialRouteName: "AuthStack",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);

export const AuthNavigator = createStackNavigator(
  {
    SwitchStack: { screen: SwitchStack },
  },
  {
    initialRouteName: "SwitchStack",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
 
export const AuthNavigatorStack = createAppContainer(AuthNavigator);
