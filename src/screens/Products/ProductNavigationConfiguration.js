"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Products from "./Products";
import AddNewProduct from "./AddNewProduct";
import ProductDetails from "./ProductDetails";


export const ProductsNavigator = createStackNavigator(
    {
        Products:Products,
        AddNewProduct:AddNewProduct,
        ProductDetails:ProductDetails,

      },
  {
    initialRouteName: "Products",
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
 
export const ProductsNavigatorStack = createAppContainer(ProductsNavigator);
