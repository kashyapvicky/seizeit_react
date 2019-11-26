"use-strict";
import * as type from "../actionType";
const initialState = {
  user: null,
  errorColor: null,
  toastMessage: null,
  loader: false,
  lang: "en",
  fcm_id:null,
  walkThrough:false,
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
        user: { ...state.user, ...action.payload }
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
    case type.APP_LANG:
      return {
        ...state,
        lang: action.lang,
        isRTL: action.lang == "ar" ? true : false
        // fontFamilyBold: action.lang=='en'?'MyriadPro-Bold':'Mirza-Bold',
        //fontFamilySemibold: action.lang=='en'?'MyriadPro-Semibold':'Mirza-SemiBold',
        //fontFamilyRegular: action.lang=='en'?'MyriadPro-Regular':'Mirza-Regular',
        //fontFamilyBold: action.lang=='en'?'campton-book':'Noor-Bold',
        //fontFamilySemibold: action.lang=='en'?'campton-semibold':'Noor-Regular',
        //fontFamilyRegular: action.lang=='en'?'campton-light':'Noor-Regular',
        //flexDirection: (action.lang =='ar') ? 'row-reverse':'row',
        //textAlign: action.lang=='en'?'left':'right'
      };
      case type.NOTI_FCM_ID:
        return {
          ...state,
          fcm_id: action.fcm_id
      };
      case type.SET_WALK_THROUGH:
        return {
          ...state,
          walkThrough: action.payload
        };
    case type.LOGOUT_SUCCESS:
      return {...initialState,
        fcm_id:state.fcm_id,
        walkThrough:state.walkThrough};
    default:
      return state;
  }
};
export default user;
