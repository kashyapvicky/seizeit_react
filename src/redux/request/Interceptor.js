import axios from 'axios'
import SERVER_URL from '../../utilities/config'
import {path} from 'ramda'

import {getAccessTokenFromCookies} from './Service' // ... Just a service to refresh auth tokens
const AxiosInstance = axios.create({
    baseURL: SERVER_URL.apiUrl,
    timeout: 20000,
    headers:{'Content-Type': 'application/json',}
})
AxiosInstance.interceptors.response.use((response) =>{
    return response;
}, (error) => {
    const originalRequest = error.config;
    if (!error.response) {
       return Promise.reject('Network Error')
    }
    else if ((error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true;
        return getAccessTokenFromCookies()
            .then(token => {
                debugger
                if(token){
                    const authTokenResponse = path(['data', 'response'], token)
                    AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }else{
                    return error.response
                }
            }).catch(err => {
                if(err == true){
                    return error.response
                }else{
                    return err.response
                }
              
            })
    } else {
        debugger
        return error.response
    }

})

export default AxiosInstance