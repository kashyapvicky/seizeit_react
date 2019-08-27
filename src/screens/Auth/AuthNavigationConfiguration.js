"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import StartupScreen from "./StartupScreen";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ChooseType from "./ChooseType";
import EnterMobile from "./EnterMobile";
import Verify from "./Verify";

const AuthStack = createStackNavigator(
  {
    StartupScreen:StartupScreen,
    Signup: { screen: Signup},
    ChooseType: { screen: ChooseType},
    Login: { screen: Login},
    ForgotPassword: { screen: ForgotPassword},
    EnterMobile: { screen: EnterMobile},
    Verify: { screen: Verify},
  },
  {
    initialRouteName: "StartupScreen",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
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
    }
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
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    })
  }
);
 
export const AuthNavigatorStack = createAppContainer(AuthNavigator);
