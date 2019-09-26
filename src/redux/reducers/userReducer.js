"use-strict";
import * as type from "../actionType";
const initialState = {
  user: null,
  errorColor: null,
  toastMessage: null,
  loader: false,
  lang: "en",
  netStatus: true,
  currentLocation: null
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_LOGGED_USER_DATA:
      return {
        ...state,
        user: action.payload
      };
    case type.UPDATE_LOGGED_USER_DATA:
        return {
          ...state,
          user: {...state.user,...action.payload}
      };
    case type.SET_LOADER:
      return {
        ...state,
        loader: action.loader
      };
    case type.SET_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: action.toastMessage,
        errorColor: action.errorColor
      };
    case type.CHECK_INTERNET_CONNECTION:
      return {
        ...state,
        netStatus: action.netStatus
      };
    case type.ADD_CURRENT_LOCATION_SUCCESS:
        return {
          ...state,
          currentLocation: action.payload
    };
    case type.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
export default user;
