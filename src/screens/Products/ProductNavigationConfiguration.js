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
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import Cart from "../Home/Cart";
import AllReviews from "../Home/AllReview";


export const ProductsNavigator = createStackNavigator(
    {
        Products:Products,
        AddNewProduct:AddNewProduct,
        ProductDetails:ProductDetails,
        Cart:Cart,
        AllReviews:AllReviews,

      },
  {
    initialRouteName: "Products",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);
 
export const ProductsNavigatorStack = createAppContainer(ProductsNavigator);
