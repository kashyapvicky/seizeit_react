"use strict";
// React
import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from "react-native";

// Navigation
import { AppStack } from "./AppNavigationConfiguration";
//Redux
import { connect } from "react-redux"; // Redux
import { bindActionCreators } from "redux";
// import SplashScreen from 'react-native-splash-screen'

//Actions
import * as userActions from "./redux/actions/userActions";
import * as todoActions from "./redux/actions/todoActions";
import Indicator from "./components/Indicator";
//Components
import Toast from "./components/Toast";
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
      topBarColor:'transparent',
      bottomBarColor:'transparent'
    };
    this._bootStrapApp();
  }

  _bootStrapApp = () => {
    //  (Platform.OS == 'android') ? SplashScreen.hide() : null;
  };
  /*********** Toast Method  *******************/
  showMessage = (text, color) => {
    debugger;
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
  changeSafeAreaViewColor = (screen)=>{
    let bottomBarArray = ['Cart','AddNewProduct','Checkout']
      if(bottomBarArray.findIndex(x=> x == screen) > -1){
        this.setState({
          bottomBarColor:'#96C50F'
        })
      }else{
        this.setState({
          bottomBarColor:'white'
        })
      }
  }
  render() {
    return (
      <Fragment>
        {Platform.OS == "ios" && (
          <StatusBar barStyle="dark-content" translucent />
        )}
        {this.props.loader && <Indicator />}
        <SafeAreaView style={{ flex: 0,backgroundColor:this.state.topBarColor }} />
        <SafeAreaView style={{flex:1,backgroundColor: this.state.bottomBarColor }}>
          <AppStack
            screenProps={{
              ...this.props,
              toastRef: { show: (text, color) => this.showMessage(text, color) }
            }}
            onNavigationStateChange={(prevState, currentState, action) => {
              this.currentScreen = getActiveRouteName(currentState);
              this.changeSafeAreaViewColor(this.currentScreen)
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
    errorColor: state.user.errorColor,
    loader: state.user.loader
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    todoActions: bindActionCreators(todoActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
