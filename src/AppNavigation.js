"use strict";
// React
import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import NavigationService from "./utilities/NavigationServices";
import colors from "./utilities/config/colors";

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

  
class AppNavigation extends React.Component {
  static socket;
  constructor(props) {
    super(props);
    this.state = {
      isShowToast: false,
      topBarColor: "transparent",
      bottomBarColor: "transparent"
    };
    this._bootStrapApp();
  }

  componentDidMount() {
    this._getNetInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  //_getNetInfo isConnected Or IsReachable
  _getNetInfo = () => {
    NetInfo.isConnected.fetch().then().done(() => {

    this.unsubscribe = NetInfo.addEventListener(state => {
      let value = state.isInternetReachable && state.isConnected ? true : false;
      this.props.actions.checkInternet(value);
    });
  });
  };
  _bootStrapApp = () => {
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

          <AppStack
             ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}

            screenProps={{
              ...this.props,
              
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