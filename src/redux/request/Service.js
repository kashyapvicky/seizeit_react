import AsyncStorage from "@react-native-community/async-storage";
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
const postRequest = (apiName, data = {}) => {
  if (!NavigationService.checkNetStatus()) {
    return  new Promise((resolve,reject) =>{
      NavigationService.showToastMessage(string('NetAlert'))
          resolve(null)
     })  
    }else{
    NavigationService.setIndicator(true)
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
        }else if(res.status == 500){
          return NavigationService.showToastMessage(res.data.error)
         
        }else if(res.status == 401){
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
             return NavigationService.showToastMessage(res.data.error)
            }else if(res.status == 500){
              debugger
             return NavigationService.showToastMessage(res.data.error)
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
