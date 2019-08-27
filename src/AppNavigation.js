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
class AppNavigation extends React.Component {
  static socket;
  constructor(props) {
    super(props);
    this.state = {
      isShowToast: false
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
  render() {
    return (
      <Fragment>
        {Platform.OS == "ios" && (
          <StatusBar barStyle="dark-content" translucent />
        )}
        {this.props.loader && <Indicator />}
        <SafeAreaView style={{ flex: 1 }}>
          <AppStack
            screenProps={{
              ...this.props,
              toastRef: { show: (text, color) => this.showMessage(text, color) }
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
