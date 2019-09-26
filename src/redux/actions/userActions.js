"use strict";
import React from "react";
import * as type from "../actionType";


/********************** CHECK ACTION TYPE *****************************/

export const checkInternet = (netStatus) => {
  return {
    type: type.CHECK_INTERNET_CONNECTION,
    netStatus
  }
}
// Set Logged User Data
export const setLoggedUserType = payload => {
    return {
      type: type.SET_LOGGED_USER_DATA,
      payload
    };
  };
// Set Logged User Data Dispatch
export const setLoggedUserData =(user)=>{
    return (dispatch, getState) => {
        return new Promise((resolve,reject) => {
            if(user){
                dispatch(setLoggedUserType(user));
                resolve(true)
            }
        })
    };
}
// Set Toast Message
export const setToastMessage = (message, errorColor) => {
    debugger;
    return {
      type: type.SET_TOAST_MESSAGE,
      toastMessage: message,
      errorColor: errorColor
    };
  };

export const setIndicator = loader => {
    return {
      type: type.SET_LOADER,
      loader: loader
    };
  };

// Succes Log Out User
export const logOutUser = () => {
  return {
    type: type.LOGOUT_SUCCESS
  };
};

export const logOutUserSuccess = lang => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(logOutUser());
      resolve(true);
    });
  };
};

// Add currentLoaction 
export const addCurrentLocation = (payload) => {
  return {
    type: type.ADD_CURRENT_LOCATION_SUCCESS,
    payload
  };
};

// Update user data
export const updateUserData = (payload) => {
  return {
    type: type.UPDATE_LOGGED_USER_DATA,
    payload
  };
};
