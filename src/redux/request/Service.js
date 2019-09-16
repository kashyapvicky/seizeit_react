import AsyncStorage from "@react-native-community/async-storage";
import AxiosInstance from "./Interceptor";
import NavigationService from "../../utilities/NavigationServices";
import {string} from '../../utilities/languages/i18n'
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
const postRequest = (apiName, data = {}) => {
  if (!NavigationService.checkNetStatus()) {
    return NavigationService.showToastMessage(string('NetAlert'))
  }else{
    NavigationService.setIndicator(true)
    
    return AxiosInstance.post(apiName, data)
      .then(res => {
        NavigationService.setIndicator(false)
        if(res.status == 200){
          debugger
         return res.data
        }else if(res.status == 400){
         return NavigationService.showToastMessage(res.data.error)
        }else if(res.status == 401){
          return NavigationService.showToastMessage(res.data.error)
         }else{
          return NavigationService.showToastMessage(res.data.message)
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
  if (!NavigationService.checkNetStatus()) {
    return NavigationService.showToastMessage(string('NetAlert'))
  }else{
    NavigationService.setIndicator(true)
    return AxiosInstance.get(apiName)
      .then(res => {
        NavigationService.setIndicator(false)
        if(res.status == 200){
          debugger
         return res.data
        }else if(res.status == 400){
         return NavigationService.showToastMessage(res.data.error)
        }else if(res.status == 401){
          return NavigationService.showToastMessage(res.data.error)
         }else{
          return NavigationService.showToastMessage(res.data.message)
        }
      })
      .catch(err => {
        NavigationService.setIndicator(false)
        return err;
      });
  }
};
export { getAccessTokenFromCookies, postRequest, getRequest };
