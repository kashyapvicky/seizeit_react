"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Home from "./Home";
import SubCategory from "./SubCategory";
import Filter from "./Filter";
import SearchProduct from "./SearchProduct";
import ProductDetails from "../Products/ProductDetails";
import ChangeLocation from "./ChangeLocation";
import {TransitionConfig} from "../../AppNavigationConfiguration";
import VendorProduct from "./VendorProduct";

import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccessFull from "./OrderSuccessfull";
import Address from "../Settings/Address";
import AddNewAddress from "../Settings/AddNewAddress";
import EditProfile from "../Settings/EditProfile";
import Countries from "../Settings/Countries";


// Stack 
const ModalStack = createStackNavigator({
  Filter: {
      screen: Filter,
      params:{isModal : true},
    },
    SearchProduct: {
      screen: SearchProduct,
      params:{isModal : true},
    },
    ChangeLocation: {
      screen: ChangeLocation,
      params:{isModal : true},
    },
    Cart: {
      screen: Cart,
      params:{isModal : true},
    },
    Checkout: {
      screen: Checkout,
      params:{isModal : true},
    },
    OrderSuccessFull: {
      screen: OrderSuccessFull,
      params:{isModal : true},
    },
    AddNewAddress:AddNewAddress,
    Address:Address,
    Countries:Countries,
    EditProfile:EditProfile
  },
  
  {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forVertical,
    })
})
const CardStack =  createStackNavigator({
    Home:Home,
    SubCategory:SubCategory,
    ProductDetails:ProductDetails,
    VendorProduct:VendorProduct,
},
{
  initialRouteName: 'Home',
  headerMode:'none',
  mode:'card',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),})

export const HomeNavigator = createStackNavigator({
  CardStack:CardStack,
  ModalStack:{screen:ModalStack,
    params:{isModalStack : true},

  }
},{
  initialRouteName:'CardStack',
  headerMode:'none',
  mode:'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(8)),
      timing: Animated.timing
    }
  }),
  // transitionConfig: TransitionConfig,
})


 
export const HomeNavigatorStack = createAppContainer(HomeNavigator);
