"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Setting from "./Setting";
import Orders from "./Orders";
import Returns from "./Returns";
import OrderDetails from "./OrdeDetail";
import ReturnDetail from "./ReturnDetail";
import BankAccount from "./BankAccount";
import AddNewBankAccount from "./AddNewBankAccount";
import Wishlist from "./Wishlist";
import Address from "./Address";
import AddNewAddress from "./AddNewAddress";
import CustomerReturnOrderRequest from "./CustomerReturnOrderRequest";
import OrderPlaced from "./OrderPlaced";
import CustomerReturOrders from "./CustomerReturnOrders";
import Contact from "./Contact";
import AddNewCard from "./AddNewCard";

import PaymentsCards from "./PaymentsCards";
import Blogs from "./Blogs";
import BlogDetail from "./BlogDetail";
import {TransitionConfig} from "../../AppNavigationConfiguration";
import EditProfile from "./EditProfile";

export const SettingNavigator = createStackNavigator(
      {
        Setting:Setting,
        Orders:Orders,
        Returns:Returns,
        OrderDetails:OrderDetails,
        ReturnDetail:ReturnDetail,
        BankAccount:BankAccount,
        AddNewBankAccount:AddNewBankAccount,
        Wishlist:Wishlist,
        Address:Address,
        AddNewAddress:AddNewAddress,
        OrderPlaced:OrderPlaced,
        CustomerReturOrders:CustomerReturOrders,
        CustomerReturnOrderRequest:CustomerReturnOrderRequest,
        Contact:Contact,
        PaymentsCards:PaymentsCards,
        AddNewCard:AddNewCard,
        Blogs:Blogs,
        BlogDetail:BlogDetail,
        EditProfile:EditProfile,
    },
  {
    initialRouteName: "Setting",
    headerMode: "none",
    mode: "card",
    initialRouteParams: { transition: 'horizontal' },
    transitionConfig: TransitionConfig
  }
);
 
export const SettingNavigatorStack = createAppContainer(SettingNavigator);
