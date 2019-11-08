"use strict";
import React from "react";
import DeviceInfo from 'react-native-device-info';

import * as type from "../actionType";
import { postRequest, getRequest } from "../request/Service";
import NavigationService from "../../utilities/NavigationServices";
import {string} from '../../utilities/languages/i18n'
import colors from "../../utilities/config/colors";
//Add To Cart
export const addToCartSuccess = payload => {
  return {
    type: type.ADD_REMOVE_CART_SUCCESS,
    payload
  };
};
export const addCartFromApi = payload => {
  return {
    type: type.ADD_CART_API_SUCCESS,
    payload
  };
};
export const getWishListFromApi = payload => {
  return {
    type: type.GET_WISLIST_API_SUCCESS,
    payload
  };
};
export const removeCartSuccess = () => {
  return {
    type: type.REMOVE_CART_SUCCESS
  };
};
export const removeWishListSuccess = ()=>{
  return {
    type: type.REMOVE_WISHLIST_SUCCESS
  };
}
//Add To Wishlisrt
export const addToWishlistSuccess = payload => {
  return {
    type: type.ADD_REMOVE_WISHLIST_SUCCESS,
    payload
  };
};
//Add Filter
export const addFilterSuccess = payload => {
  return {
    type: type.ADD_FILTER_SUCCESS,
    payload
  };
};


//Home Data
export const setHomeDataSuccess = payload => {
  return {
    type: type.SET_HOME_DATA_SUCCESS,
    payload
  };
};

// Add to cart Api 
 export const  addCartRequestApi = (payload) =>{
    let data = {}
    data['product_id']=payload.id
    data['device_id']=DeviceInfo.getUniqueID()
    return (dispatch, getState) => {
      let api_name;
      if(payload.isCart){
        api_name = `user/addtocart`
        data['quantity']=1
      }else if(!payload.isCart){
        api_name = `user/deletecart`
      }
      return postRequest(api_name,data).then((res) => {
        debugger
        if (res && res.statusCode == 200) {
          NavigationService.setToastMessage(true,colors.green1)
          NavigationService.showToastMessage(res.success)
          dispatch(addToCartSuccess(payload))
          return res
       }else{
        dispatch(addToCartSuccess(payload))
       }
    })
   }
}
// Add to cart Api 
export const  getCartRequestApi = () =>{
  let device_id=DeviceInfo.getUniqueID()
  return (dispatch, getState) => {
    return getRequest(`user/showcart?device_id=${device_id}`).then((res) => {
      debugger
      if(res && res.length > 0){
        let carts = res.map((x)=> {
          return {...x,isCart:true}
        })
         dispatch(addCartFromApi(carts))
      }
      return true
  })
 }
}

// Add to wishlist Api 
export const  addWishlitsRequestApi = (payload) =>{
  let data = {}
  data['product_id']=payload.id
  data['device_id']=DeviceInfo.getUniqueID()
  return (dispatch, getState) => {
    let api_name;
    if(payload.isFevorite){
      api_name = `user/addtowish`
    }else if(!payload.isFevorite){
      api_name = `user/deletewish`
    }
    debugger
    return postRequest(api_name,data).then((res) => {
    if (res && res.statusCode == 200) {
      NavigationService.setToastMessage(true,colors.green1)
      NavigationService.showToastMessage(res.success)
        dispatch(addToWishlistSuccess(payload))
        return res
     }
  })
 }
}

// get to cart Api 
export const  getWishListApi = () =>{
  let device_id=DeviceInfo.getUniqueID()
  return (dispatch, getState) => {
    return getRequest(`user/showwish?device_id=${device_id}`).then((res) => {
      debugger
      if(res && res.length > 0){
        let wishlists = res.map((x)=> {
          return {...x,isFevorite:true}
        })
         dispatch(getWishListFromApi(wishlists))
      }
      return true
  })
 }
}