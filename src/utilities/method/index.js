import React, { Component } from 'react';
import {
  NetInfo,
  Alert,
  Platform
} from 'react-native';

export const updateProductCartValue = (array,product) => {
  let { carts,wishlists } = product;
  let newArray = array.map(x => {
    let findIndex=-1
    if(carts && carts.length > -1){
      findIndex = carts.findIndex(cart => cart.id == x.id);
    }
    let findIndexWishList=-1
    if(wishlists && wishlists.length > 0){
      findIndexWishList = wishlists.findIndex(cart => cart.id == x.id);
    }
    if (findIndex > -1 || findIndexWishList > -1) {
      return {
        ...x,
        isCart: carts.length>0 && findIndex > -1?
        carts[findIndex].isCart ? carts[findIndex].isCart : false:false,
        isFevorite:wishlists.length>0 &&  findIndexWishList > -1? 
        wishlists[findIndexWishList].isFevorite ? wishlists[findIndexWishList].isFevorite : false
        :false
      };
    } else {
      return {
        ...x
      };
    }
  });
  return newArray;
};
export const updateCartSuccess = (array,item) =>{
  return  array.map(x => {
    if (x.id == item.id){
      return {
        ...x,
         isCart: x.isCart ? false : true
      };
    } else {
      return {
        ...x
      };
    }
  })
}
export const updateWishListSuccess = (array,item) =>{
  return  array.map(x => {
    if (x.id == item.id) {
      return {
        ...x,
         isFevorite: x.isFevorite ? false : true
      };
    } else {
      return {
        ...x
      };
    }
  })
}