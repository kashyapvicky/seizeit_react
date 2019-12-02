"use strict";
// React
import React, { Fragment } from "react";
import {
  SafeAreaView,
  View,
  Text,
  BackHandler,
  InteractionManager,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import firebase from 'react-native-firebase';

import NetInfo from "@react-native-community/netinfo";
import * as RNLocalize from "react-native-localize";
import RNRestart from "react-native-restart";
import SplashScreen from "react-native-splash-screen";

import NavigationService from "./utilities/NavigationServices";
import colors from "./utilities/config/colors";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

// Navigation
import { AppStack } from "./AppNavigationConfiguration";
//Redux
import { connect } from "react-redux"; // Redux
import { bindActionCreators } from "redux";

//Actions
import * as userActions from "./redux/actions/userActions";
import * as productActions from "./redux/actions/productActions";

import Indicator from "./components/Indicator";
//Components
import Toast from "./components/Toast";
import OfflineNotice from "./components/OfflineNotice";
import { styles } from "./styles";
import { setI18nConfig, string } from "./utilities/languages/i18n";
import LazyHOC from "./LazyLoadScreen";
//Get Active Screen
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
String.currency = "AED"
class AppNavigation extends React.Component {
  static socket;
  constructor(props) {
    super(props);
    this.state = {
      isShowToast: false,
      topBarColor: "transparent",
      bottomBarColor: "transparent",
      hidden: true
    };
    // set initial config
    this.setI18nConfigReload();
    this._bootStrapApp();
  }

  async componentDidMount() {
    this._getNetInfo();
    this.checkPermission();
    this.createNotificationListeners(); //add this line
    GoogleSignin.configure({})
    BackHandler.addEventListener("hardwareBackPress", this._backhandle);

     RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }
  

  componentWillUnmount() {
    if(this.unsubscribe){
      this.unsubscribe();
    }
  
    this.notificationListener();
    this.notificationOpenedListener();
    BackHandler.removeEventListener("hardwareBackPress", this._backhandle);
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  /*********************************  Notification Listner  *********************************/
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
   const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
   .setDescription('SeizeItapp description')
   firebase.notifications().android.createChannel(channel);
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const localNotification = new firebase.notifications.Notification({
        show_in_foreground: true,
    })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/icon') // create this icon in Android Studio
        .android.setColor(colors.primary) // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications()
        .displayNotification(localNotification)

  
    })
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {


        //this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        //this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  async checkPermission() {
    debugger
    const enabled = await firebase.messaging().hasPermission();
    debugger
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
    //3
async getToken() {
   let {fcm_id} = this.props.user
    if (!fcm_id) {
     let fcmToken = await firebase.messaging().getToken();
     if (fcmToken) {
       // user has a device token
       console.log(this.props,"this.props")
      this.props.actions.setFCM_ID(fcmToken)
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
/*********************************  Notification Listner  End *********************************/

  setI18nConfigReload = async () => {
    let { lang, isRTL } = this.props.user;
    setI18nConfig(lang, isRTL);
  };
  handleLocalizationChange = (lang, isRTL) => {
    setI18nConfig(lang, isRTL);
    this.forceUpdate();
  };

  // Abck Handler
  _backhandle = async () => {
    const currentScreen = this.currentScreen;
    const prevScreen = this.prevScreen;
     NavigationService.goBackScreen()
      return true;
    
  };
  //_getNetInfo isConnected Or IsReachable
  _getNetInfo = () => {
    NetInfo.isConnected
      .fetch()
      .then()
      .done(() => {
        this.unsubscribe = NetInfo.addEventListener(state => {
          let value =
            state.isInternetReachable && state.isConnected ? true : false;
           this.props.actions.checkInternet(value);
        });
      });
  };
  _bootStrapApp = () => {
    if (Platform.OS == "android") {
      SplashScreen.hide();
    }
  };

  /*********** Toast Method  *******************/
  showMessage = (text, color) => {
    this.setState(
      { errorMessage: text, errorColor: color, isShowToast: true },
      () => this.closeToast()
    );
  };
  closeToast = () => {
    setTimeout(
      () =>
        this.setState({
          isShowToast: false
        }),
      2000
    );
  };
  /*********** Toast Method Close  *******************/

  //Change SafeAreaViewColor
  changeSafeAreaViewColor = screen => {
    let bottomBarArray = ["Cart", "AddNewProduct", "Checkout"];
    if (bottomBarArray.findIndex(x => x == screen) > -1) {
      this.setState({
        bottomBarColor: "#96C50F"
      });
    } else {
      this.setState({
        bottomBarColor: "white"
      });
    }
  };

  render() {
    return (
      <Fragment>
        {Platform.OS == "ios" && (
          <StatusBar barStyle="dark-content" translucent />
        )}
        {Platform.OS == "android" && (
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        )}
        <SafeAreaView
          style={{ flex: 0, backgroundColor: this.state.topBarColor }}
        />

        <SafeAreaView
          style={{ flex: 1, backgroundColor: this.state.bottomBarColor }}
        >
          {this.props.loader && <Indicator />}
          {this.props.user.netStatus ? null : <OfflineNotice {...this.props} />}
          {/* <Line name="Translation example" value={string("hello")} /> */}
          <AppStack
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{
              ...this.props,
              setI18nConfig: (lang, isRtl) => setI18nConfig(lang, isRtl),
              toastRef: { show: (text, color) => this.showMessage(text, color) }
            }}
            onNavigationStateChange={(prevState, currentState, action) => {
              this.currentScreen = getActiveRouteName(currentState);
              this.changeSafeAreaViewColor(this.currentScreen);
            }}
          />

          {this.state.isShowToast && (
            <Toast
              message={this.state.errorMessage}
              color={this.props.errorColor}
            />
          )}
        </SafeAreaView>
      </Fragment>
    );
  }
}

// Dispatch Store Method
const mapStateToProps = state => {
  return {
    user: state.user,
    product: state.product,
    errorColor: state.user.errorColor,
    loader: state.user.loader
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
