// NavigationService.js
import { NavigationActions } from 'react-navigation';
let _navigator;
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;

}
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
function navigateToSubRoute(routeName,params,subRoute,subParam){
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action: NavigationActions.navigate({ routeName: subRoute,
        params:subParam
      }),
    })
  );
}
function goBackScreen(routeName, params) {
  _navigator.dispatch(
     NavigationActions.back()
  );
}
function getNavigationProps() {
  return _navigator
}
function getScreenPropsOfNavigation(){
  return _navigator.props.screenProps
}
function showToastMessage(message,color){
  return _navigator.props.screenProps.toastRef.show(message,color)
}
function setToastMessage(status,color){
  return _navigator.props.screenProps.actions.setToastMessage(status,color)
}
function setIndicator(status){
  return _navigator.props.screenProps.actions.setIndicator(status)
}
function checkNetStatus(status){
  return _navigator.props.screenProps.user.netStatus
}
function getUser(){
  return _navigator.props.screenProps.user.user ? _navigator.props.screenProps.user.user : null
}

// add other navigation functions that you need and export them
export default {
  navigate,
  goBackScreen,
  setTopLevelNavigator,
  getNavigationProps,
  navigateToSubRoute,
  getScreenPropsOfNavigation,
  showToastMessage,
  setIndicator,
  checkNetStatus,
  getUser,
  setToastMessage
};