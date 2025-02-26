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
import AppIntro from "./AppIntro";
import EmailVerifiedScreen from "./EmailVerifiedScreen";

// import EnterEmail from "./EnterEmail";

const AuthStack = createStackNavigator(
  {
    StartupScreen:StartupScreen,
    EmailVerifiedScreen:EmailVerifiedScreen,
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
    AppIntro:{ screen: AppIntro},

  },
  {
    initialRouteName: "AppIntro",
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
