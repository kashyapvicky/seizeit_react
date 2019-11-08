import React, { Component } from 'react';
import {
  Alert,
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import { LoginManager, AccessToken, setAvatar } from "react-native-fbsdk";
import { GoogleSignin } from 'react-native-google-signin';
import AxiosInstance from "./Interceptor";
import NavigationService from "../../utilities/NavigationServices";
import {string} from '../../utilities/languages/i18n'
import colors from "../../utilities/config/colors";

// Get Access Token
const getAccessTokenFromCookies = () => {
  return new Promise ((resolve,reject) =>{
          if(NavigationService.getUser() && NavigationService.getUser().token){
            resolve(NavigationService.getUser().token)
          }else{
            reject(true)
          }
  })
};
// Post Request
const postRequest = (apiName, data = {},hideLoader=false) => {
  if (!NavigationService.checkNetStatus()) {
    return  new Promise((resolve,reject) =>{
      NavigationService.showToastMessage(string('NetAlert'))
          resolve(null)
     })  
    }else{
    if(!hideLoader){
      NavigationService.setIndicator(true)

    }
    return AxiosInstance.post(apiName, data)
      .then(res => {
        NavigationService.setIndicator(false)
        if(res.status == 200){
          debugger
         return res.data
        }else {
        NavigationService.setToastMessage(true,colors.danger)
        if(res.status == 400){
         return NavigationService.showToastMessage(res.data.error)
        }else if(res.status == 300){
          debugger
            NavigationService.showToastMessage(res.data.error)
           return res.data
        }else if(res.status == 500){
          return NavigationService.showToastMessage(res.data.error || res.data.message)
         
        }else if(res.status == 401){
          logOutSuccess('Session has been expired. Please login again to continue')

          return NavigationService.showToastMessage(res.data.error)
         }else{
          return NavigationService.showToastMessage(res.data.message)
        }
      }
      })
      .catch(err => {
        NavigationService.setIndicator(false)
        return err;
      });
  }
 
};

// Get Request
const getRequest = apiName => {
  debugger
  if (!NavigationService.checkNetStatus()) {
   return  new Promise((resolve,reject) =>{
     NavigationService.showToastMessage(string('NetAlert'))
         resolve(null)
    })
  }else{
    NavigationService.setIndicator(true)
    return AxiosInstance.get(apiName)
      .then(res => {
        NavigationService.setIndicator(false)
        if(res.status == 200){
         return res.data
        }else{
          NavigationService.setToastMessage(true,colors.danger)
          if(res.status == 400){
            return NavigationService.showToastMessage(res.data.error)
           }else if(res.status == 401){
            logOutSuccess('Session has been expired. Please login again to continue')
             return false
            }else if(res.status == 500){
              debugger
             return NavigationService.showToastMessage(res.data.message)
            }
            else{
             return NavigationService.showToastMessage(res.data.message)
           }
        } 
      })
      .catch(err => {
        NavigationService.setIndicator(false)
        return err;
      });
  }
};

export { getAccessTokenFromCookies, postRequest, getRequest };

const logOutSuccess = (message) => {
  Alert.alert(
      '',
      message,
      [
          { text: string('cancel'), onPress: () => null },
          {

              text: string('OK'),
              onPress: () => {
                logout()
              },
              // style:'cancel'
          }
      ],
      { cancelable: false }
  )
}

const logout = async () => {
     let {logOutUserSuccess} = NavigationService.getScreenPropsOfNavigation().actions
      let {user} = NavigationService.getScreenPropsOfNavigation().user
      if(user && user.login_from && user.login_from == 'facebook') {
        await  LoginManager.logOut()
      }else if(user && user.login_from && user.login_from == 'google'){
       await GoogleSignin.revokeAccess();
       await GoogleSignin.signOut();
      }    
      logOutUserSuccess(true) 
       setTimeout(() =>{
        NavigationService.navigate('AuthNavigatorStack')
       },200)
    }
