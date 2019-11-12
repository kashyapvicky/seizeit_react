import React, { Component } from 'react';
import {
  NetInfo,
  Alert,
  Platform
} from 'react-native'
import moment from 'moment'

export const setAllFalseValue = (array,type) =>{
  if(type == 'wishlist'){
    return  array.map(x => {
      return {
        ...x,
        isFevorite: false
      };
  })
  }else{
    return  array.map(x => {
      return {
        ...x,
        isCart: false
      };
  })
  }
}
// Update Cart And Wishlist 
export const updateProductCartValue = (array,product) => {
  debugger
  let { carts,wishlists } = product;
  let newArray = array.map(x => {
    let findIndex=-1
    if(carts && carts.length > 0){
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


// Update Cart Success
export const updateCartSuccess = (array,item) =>{
  debugger
  return  array.map(x => {
    console.log(x.isCart)
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

// Update Wishlist Success
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

// Calculate Size Status 
export const sizeStatus = (status) =>{
  switch(status){
    case 1 :
    return  {
      id:1,
      name:'X',
    }
    case 2 :
    return {
      id:2,
      name:'M',
    }
    case 3 :
     return  {
      id:3,
      name:'XL',
    }
    case 4 :
     return  {
      id:4,
      name:'XXL',
    }
     default:
     return {
      id:1,
      name:'X',
    }
  }
}

// Group by date
export const getGroups = (data) => {
  debugger
 return data.reduce((groups, game) => {
  const date = moment(game.created_at).format('DD-MM-YYYY');
  if (!groups[date]) {
    groups[date] = [];
  }
  groups[date].push(game);
  return groups;
}, {});
}

