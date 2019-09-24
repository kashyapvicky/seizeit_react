"use strict";
import React from "react";
import DeviceInfo from 'react-native-device-info';

import * as type from "../actionType";
import { postRequest, getRequest } from "../request/Service";

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
export const removeCartSuccess = () => {
  return {
    type: type.REMOVE_CART_SUCCESS
  };
};
//Add To Wishlisrt
export const addToWishlistSuccess = payload => {
  return {
    type: type.ADD_REMOVE_WISHLIST_SUCCESS,
    payload
  };
};

// Add to cart Api 
 export const  addCartRequestApi = (payload) =>{
    let data = {}
    data['product_id']=payload.product_id
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
      if (res) {
          dispatch(addToCartSuccess(payload))
          return res
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