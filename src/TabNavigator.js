import React from "react";
import { Platform, Easing, Animated, Image } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import styles from "./styles";
// Import Navigation Stack
import { DashboardNavigatorStack } from "./screens/Dashboard/DashboardNavigationConfiguration";
import { HomeNavigatorStack } from "./screens/Home/HomeNavigationConfiguration";
import { SettingNavigatorStack } from "./screens/Settings/SettingNavigationConfiguration";
import { ProductsNavigatorStack } from "./screens/Products/ProductNavigationConfiguration";
import { EarningNavigatorStack } from "./screens/Earnings/EarningNavigationConfiguration";
import { NotificationNavigatorStack } from "./screens/Notifications/NotificationNavigationConfiguration";
import { ExploreNavigatorStack } from "./screens/Explore/ExploreNavigationConfiguration";
// Get Active route to particular screen
const getActiveRouteState = route => {
    if (
      !route.routes ||
      route.routes.length === 0 ||
      route.index >= route.routes.length
    ) {
      return route;
    }
    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
  };
  // Hide Tab Bar On Perticular screen
  HomeNavigatorStack.navigationOptions = ({ navigation }) => {
    const activeRoute = getActiveRouteState(navigation.state);
    let tabBarVisible = false;
    if (activeRoute.routeName == "Home") {
        tabBarVisible = true
    }
    return {
      tabBarVisible
    };
  };

  SettingNavigatorStack.navigationOptions = ({ navigation }) => {
    const activeRoute = getActiveRouteState(navigation.state);
    let tabBarVisible = true;
    if (activeRoute.routeName == "Setting") {
      tabBarVisible = true;
    }else{
        tabBarVisible = false;

    }
    return {
      tabBarVisible
    };
  };
//VendorTabNavigator
export const VendorTabNavigator = createBottomTabNavigator(
  {
      DashBoard: {
          screen: DashboardNavigatorStack,
          navigationOptions: {
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ tintColor, focused }) => {
                  const image = focused
                      ? require('./assets/images/ic_dash_active.png')
                      : require('./assets/images/ic_dash_inactive.png')
                  return (
                      <Image
                          source={image}
                          style={styles.tabIcon}
                      />
                  )
              }
          }
      },
      Products: {
          screen: ProductsNavigatorStack,
          navigationOptions: {
              tabBarLabel: "Products",
              tabBarIcon: ({ tintColor, focused }) => {
                  const image = focused
                      ? require('./assets/images/ic_products_active.png')
                      : require('./assets/images/ic_products_inactive.png')
                  return (
                      <Image
                          source={image}
                          style={styles.tabIcon}
                      />
                  )
              }
          },
          // params: { title: 'myOrders', isBusinessMan: true },

      },
      Earnings: {
          screen: EarningNavigatorStack,
          navigationOptions: {
              tabBarLabel: "Earning",
              tabBarIcon: ({ tintColor, focused }) => {
                  const image = focused
                      ? require('./assets/images/ic_earnings_active.png')
                      : require('./assets/images/ic_earnings_inactive.png')
                  return (
                      <Image
                          source={image}
                          style={styles.tabIcon}
                      />
                  )
              }
          },
          // params: { title: 'notifications', isBusinessMan: true },
      },
      Setting: {
          screen: SettingNavigatorStack,
          navigationOptions: {
              tabBarLabel: "Profile",
              tabBarIcon: ({ tintColor, focused }) => {
                  const image = focused
                      ? require('./assets/images/user_profile.png')

                      : require('./assets/images/user_profile.png')
                  return (
                      <Image
                          source={image}
                          style={[styles.tabIcon,{ borderRadius: 25 / 2 }]}
                      />
                  )
              }
          },
          params: { isBusinessMan: true },

      },

  }, {
      
      tabBarOptions: {
          activeTintColor: '#96C50F',
          inactiveTintColor: 'rgba(140,140,140,0.3)',
          style: {
              backgroundColor: 'white',
              padding: 8,
              height: 60

          },
          labelStyle: {
              fontWeight: '500',
              fontSize: 12,
              // color:'rgba(0,0,0,0.7)',
          },
          tabStyle: {
              width: 100,
          },

      }
  }
);

//CustorTabNavigator
export const CustorTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigatorStack,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor, focused }) => {
                    const image = focused
                        ? require('./assets/images/ic_home_active.png')
                        : require('./assets/images/ic_home_inactive.png')
                    return (
                        <Image
                            source={image}
                            style={styles.tabIcon}
                        />
                    )
                }
            }
        },
        Explore: {
            screen: ExploreNavigatorStack,
            navigationOptions: {
                tabBarLabel: "Explore",
                tabBarIcon: ({ tintColor, focused }) => {
                    const image = focused
                        ? require('./assets/images/ic_search_active.png')
                        : require('./assets/images/ic_search_inactive.png')
                    return (
                        <Image
                            source={image}
                            style={styles.tabIcon}
                        />
                    )
                }
            },
            // params: { title: 'myOrders', isBusinessMan: true },
  
        },
        Notifications: {
          screen: NotificationNavigatorStack,
          navigationOptions: {
              tabBarLabel: "Notifications",
              tabBarIcon: ({ tintColor, focused }) => {
                  const image = focused
                      ? require('./assets/images/ic_notification_active.png')
                      : require('./assets/images/ic_notification_inactive.png')
                  return (
                      <Image
                          source={image}
                          style={styles.tabIcon}
                      />
                  )
              }
          },
          // params: { title: 'myOrders', isBusinessMan: true },
  
      },
        Setting: {
            screen: SettingNavigatorStack,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor, focused }) => {
                    const image = focused
                        ? require('./assets/images/user_profile.png')
  
                        : require('./assets/images/user_profile.png')
                    return (
                        <Image
                            source={image}
                            style={[styles.tabIcon,{ borderRadius: 25 / 2 }]}
                        />
                    )
                }
            },
            params: { isBusinessMan: true },
  
        },
  
    }, {
        
        tabBarOptions: {
            activeTintColor: '#96C50F',
            inactiveTintColor: 'rgba(140,140,140,0.3)',
            style: {
                backgroundColor: 'white',
                padding: 8,
                height: 60
  
            },
            labelStyle: {
                fontWeight: '500',
                fontSize: 12,
                // color:'rgba(0,0,0,0.7)',
            },
            tabStyle: {
                width: 100,
            },
  
        }
    }
  );
  

