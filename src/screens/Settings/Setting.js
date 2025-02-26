import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Easing,
  Dimensions,
  StyleSheet,
  Animated,
  Alert,
  RefreshControl,
  InteractionManager
} from "react-native";

import FlipView from "react-native-flip-view";
import { LoginManager, AccessToken, setAvatar } from "react-native-fbsdk";
import {getRequest, postRequest} from '../../redux/request/Service'
import { GoogleSignin } from 'react-native-google-signin';
import LazyHOC from '../../LazyLoadScreen'
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import {GuestLoginView} from "../../components/GuestLoginView";

import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images, screenDimensions } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";

import Blogs from "./Blogs";
const deviceHeight = Dimensions.get("window").height;

const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 10 : 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      name: "",
      isbarShow: false,
      phone: "",
      phone_code:'',
      isFlipped: false,
      visible: false,
      userImage: null,
      modalY: new Animated.Value(-deviceHeight),
      facebookuser: null,
      isModalVisible: true,
      accountSettingArr: [
        {
          name: "Bank",
          value:'Bank',
          description: "Bank accounts added",
          routeName: "BankAccount"
        },
        {
          name: "Wishlist",
          value: "Wishlist",
          description: "Create your wishlist to buy in future",
          routeName: "Wishlist"
        },
        {
          name: "Address",
          value: "Address",
          description: "Add, Edit or remove your address",
          routeName: "Address"
        },
        // {
        //   name: "Cards",
        //   description: "2 cards Saved",
        //   routeName: "PaymentsCards"
        // }
      ],
      ordersArray: [
        {
          name: "Order History",
          value: "Order History",
          description: "History of upcoming and past orders",
          routeName: "Orders"
        },
        {
          name: "Order Placed",
          value: "Order Placed",
          description: "Your upcoming and past orders",
          routeName: "OrderPlaced"
        },
        {
          name: "Returns",
          value: "Returns",
          description: "You can track your return process",
          routeName: "Returns"
        }
      ]
    };
  }
  // Check User Type
  checkUserTypeAndShowMenu = () => {
    let { user } = this.props.screenProps.user;
    if (user && user.user_type == "customer") {
      let toRemoveAccountM = ["Bank"];
      let toRemoveOrderM = ["Order History"];
      let accountArray = this.state.accountSettingArr;
      let orderArray = this.state.ordersArray;
      const accountSettingArr = accountArray.filter(function(x) {
        return toRemoveAccountM.indexOf(x.value) < 0;
      });
      const ordersArray = orderArray.filter(function(x) {
        return toRemoveOrderM.indexOf(x.value) < 0;
      });
      this.setState({
        accountSettingArr,
        ordersArray
      });
    } else if (user && user.user_type == "vendor") {
      let toRemoveAccountM = ["Wishlist", "Address"];
      let toRemoveOrderM = ["Order Placed"];
      let accountArray = this.state.accountSettingArr;
      let orderArray = this.state.ordersArray;
      const accountSettingArr = accountArray.filter(function(x) {
        return toRemoveAccountM.indexOf(x.value) < 0;
      });
      const ordersArray = orderArray.filter(function(x) {
        return toRemoveOrderM.indexOf(x.value) < 0;
      });
      this.setState({
        accountSettingArr,
        ordersArray
      });
    }
  };
  componentDidMount() {
    let { user } = this.props.screenProps.user;
    if(user){
      this.getUserInfo()
      this.checkUserTypeAndShowMenu();
    }
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };

   // Open And Close modal 
   openModal() {
    Animated.timing(this.state.modalY, {
        duration: 300,
        toValue: 0
    }).start();
  }

closeModal() {
    Animated.timing(this.state.modalY, {
        duration: 0,
        toValue: -deviceHeight
    }).start();
}
  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  flipCard = () => {
    this.setState({ isFlipped: true });
  };
  _renderBack = () => {
    return (
      <Blogs navigation={this.props.navigation} flip={() => this._flip()} />
    );
  };

  _renderScrollViewContent = () => {
    return (
      <View style={[detailStyles.scrollViewContent]}>
        <View style={{ paddingHorizontal: 30 }}>
          <View style={{ marginBottom: 10,alignItems:'flex-start'}}>
            <Text style={styles.accountSetting}>
              {string("accountSettings")}
            </Text>
          </View>
          {this.state.accountSettingArr.map((account, i) => {
            return (
              <TouchableOpacity
                key={"account" + i}
                activeOpacity={0.8}

                style={[
                  this.state.accountSettingArr.length - 1 != i && styles.shadow,
                  {
                    backgroundColor: "white",
                    shadowRadius: 0.1,
                    marginBottom:
                      this.state.accountSettingArr.length - 1 != i ? 20 : 0
                  }
                ]}
                onPress={() =>{
                  if(account.name != 'Cards'){
                    this.props.navigation.navigate(account.routeName,{
                      fromSetting:true
                    })
                  }else{
                    alert('In Progress')
                  }
                }
                }
              >
                <View style={[styles.contactUsView, { borderBottomWidth: 0,alignItems:'flex-start',
 }]}>
                  <Text style={styles.titleOneText}>{string(account.name)}</Text>
                  <Text style={styles.titleTwoText}>{string(account.description)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bottomSpace2} />
        <View style={{ paddingHorizontal: 30 }}>
          <View style={{ marginBottom: 10,alignItems:'flex-start',
 }}>
            <Text style={styles.accountSetting}>{string("Orders")}</Text>
          </View>
          {this.state.ordersArray.map((res, index) => {
            return (
              <TouchableOpacity
                key={index + "order"}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate(res.routeName)}
              >
                <View style={[styles.contactUsView,{alignItems:'flex-start',
}]}>
                  <Text style={styles.titleOneText}>{string(res.name)}</Text>
                  <Text style={styles.titleTwoText}>{string(res.description)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomSpace2} />

        <View style={{ paddingHorizontal: 30 }}>
          <View style={{ marginBottom: 10,alignItems:'flex-start',
 }}>
            <Text style={styles.accountSetting}>{string("other")}</Text>
          </View>
          {/* {this.props && this.props.user && this.props.user.role_id == 3 ?
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCustomers')}>
                          <View style={styles.contactUsView}>
                              <Text style={styles.titleOneText}>{string('customers')}</Text>
                              <Text style={styles.titleTwoText}>{string('allCustomers')}</Text>
                          </View>
                      </TouchableOpacity>


                      :
                      null
                  } */}

          {/* {this.props && this.props.user && this.props.user.role_id == 3 ?
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfitStructure')}>
                          <View style={styles.contactUsView}>
                              <Text style={styles.titleOneText}>{string('profitSructure')}</Text>
                              <Text style={styles.titleTwoText}>{string('profitbydownline')}</Text>
                          </View>
                      </TouchableOpacity>


                      :
                      null
                  } */}

          <TouchableOpacity onPress={() => this.flipCard()}>
            <View style={[styles.contactUsView,{alignItems:'flex-start'}]}>
              <Text style={styles.titleOneText}>{string("blogs")}</Text>
              <Text style={styles.titleTwoText}>{string("readBlogs")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Contact")}
          >
            <View style={[styles.contactUsView, { borderBottomWidth: 0,alignItems:'flex-start' }]}>
              <Text style={styles.titleOneText}>{string("contactus")}</Text>
              <Text style={styles.titleTwoText}>{string("happytohelp")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpaceProfile} />
      </View>
    );
  };
  // Handle Scrolll
  handleScroll = event => {
    if (Platform.OS == "ios") {
      if (
        event.nativeEvent.contentOffset.y < 0 &&
        event.nativeEvent.contentOffset.y > -159
      ) {
        this.setState({
          isbarShow: true
        });
      } else if (
        event.nativeEvent.contentOffset.y < -160 &&
        event.nativeEvent.contentOffset.y > -200
      ) {
        this.setState({
          isbarShow: false
        });
      }
    } else if (Platform.OS == "android") {
      if (
        event.nativeEvent.contentOffset.y > 55 &&
        event.nativeEvent.contentOffset.y > 70
      ) {
        this.setState({
          isbarShow: true
        });
      } else if (
        event.nativeEvent.contentOffset.y < 55 &&
        event.nativeEvent.contentOffset.y > 0
      ) {
        this.setState({
          isbarShow: false
        });
      }
    }
  };
  _renderFront = () => {
    /************ Animation Type */
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const titleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    let { user } = this.props.screenProps.user;
    /**************** End Animation Type ************************/
    return (
      <View style={detailStyles.fill}>
        <Animated.ScrollView

          style={detailStyles.fill}
          scrollEventThrottle={1}
          showVerticalIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              listener: event => {
                this.handleScroll(event);
              }
            },
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            detailStyles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <TouchableOpacity
            activeOpacity={9}
            style={{ flex: 1 }}
            onPress={() => this.closeModal()}
          >
            <View style={{ flex: 1, paddingTop: 16 }}>
              {this.renderModal()}
              {/* {this.props && this.props.user ? */}
              <View style={styles.profileView} activeOpacity={0.7}>
                <View>
                  <TouchableOpacity onPress={() => null} style={styles.shadow}>
                    <Image
                      source={{uri:this.state.userImage}}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 80 / 2,
                        borderColor: "#FFFFFF",
                        borderWidth: 4
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.notificationTitle, { paddingTop: 5 }]}>
                    {`${this.state.name}`}
                   </Text>
                  {
                    this.state.phone ? 
                    <Text
                    style={[styles.mobileNumberText, { paddingTop: 5 }]}
                  >{`${this.state.phone_code} ${this.state.phone}`}</Text>:null
                  }
                
                </View>
                <TouchableOpacity onPress={() => this.rightButton()}>
                  <View>
                    <Image source={Images.setting} />
                  </View>
                </TouchableOpacity>
              </View>
              {/* :
                        null
                    } */}

              <View style={styles.bottomSpace2} />

              {/* {this.props && this.props.user ? */}
            </View>
          </TouchableOpacity>
        </Animated.View>
        {this.state.isbarShow ? (
          <Animated.View
            style={[
              detailStyles.bar,
              {
                opacity: titleOpacity,
                paddingHorizontal: 24,
                paddingVertical: 16
              }
            ]}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => null} style={styles.shadow}>
                <Image
                  source={{uri:this.state.userImage}}
                  style={{
                    height: 48,
                    width: 48,
                    borderRadius: 48 / 2,
                    borderColor: "#FFFFFF",
                    borderWidth: 4
                  }}
                />
              </TouchableOpacity>
              <View style={{ paddingLeft: 16 }}>
                <Text
                  style={[
                    styles.notificationTitle,
                    { paddingTop: 5, fontSize: normalize(14) }
                  ]}
                >
          {`${this.state.name}`} 
           </Text>
           {
                    this.state.phone ?
                <Text
                  style={[
                    styles.mobileNumberText,
                    { paddingTop: 5, fontSize: normalize(14) }
                  ]}
                  >{`${this.state.phone_code} ${this.state.phone}`}</Text>
                  :null}
              </View>
            </View>
            <TouchableOpacity disabled onPress={() =>null}>
              {/* <View>
                <Image source={Images.setting} />
              </View> */}
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
    );
  };
/******************** Modal Function  **************/
  rightButton = () => {
    this.openModal()
}
logout = async () => {
  let {logOutUserSuccess} = this.props.screenProps.actions
  getRequest('user/logout').then(async (res) => {
    if(res.success){
      let {user} = this.props.screenProps.user
      if(user && user.login_from && user.login_from == 'facebook') {
        await  LoginManager.logOut()
      }else if(user && user.login_from && user.login_from == 'google'){
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }     
       logOutUserSuccess(res.success)
       setTimeout(() =>{
        this.props.navigation.navigate('AuthNavigatorStack')
       },200)
    }
    setIndicator(false)
  }).catch((err) => {
  })

}
logOutSuccess = () => {
  Alert.alert(
      '',
      string('surelogout'),
      [
          { text: string('cancel'), onPress: () => this.closeModal() },
          {

              text: string('OK'),
              onPress: () => {
                  this.logout()
              },
              // style:'cancel'
          }
      ],
      { cancelable: false }
  )
}
editprofile = () => {
  this.closeModal()
  this.props.navigation.navigate('EditProfile', { 
    getUserInfo: () => this.getUserInfo() })
}

// Get User Info
getUserInfo = () =>{
  postRequest('user/user-details',{}).then((res) => {
          if (res && res.success) {
                  this.setState({
                      name:`${res.success.first_name ? res.success.first_name :res.success.email} ${res.success.first_name ? res.success.last_name : ''}` ,
                      phone_code:res.success.phone_code,
                      phone:res.success.phone,
                      userImage:res.success.pic
                  })
          }
    })
}
  
  renderModal() {
    return (
        <Animated.View style={[styles.modal,styles.shadow,
        { transform: [{ translateY: this.state.modalY }] }, {
            // height: height / 640 * 200,
            zIndex: 2000,
           backgroundColor: '#FAFAFA',
            shadowRadius:0.2,
            shadowOpacity:0.1,
        }]}>
          <TouchableOpacity onPress={() => this.editprofile()}
                underlayColor="green" style={[styles.button, {
                    paddingTop:8,
                    paddingBottom:16,

                    paddingLeft:8,
                    borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth
                }]}>
                <View>
                    <Text style={styles.buttonText}>{string('edit')}</Text>
                </View>
          </TouchableOpacity>
            {/* {
                this.state.facebookuser == null ?


                    <TouchableOpacity
                        onPress={() => this.changePassword()}
                        underlayColor="green" style={[styles.button, {
                            borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth
                        }]}>
                        <View>
                            <Text style={styles.buttonText}>{string('changepassword')}</Text>
                        </View>

                    </TouchableOpacity>
                    :
                    null
            } */}

            {/* {
                this.props.user && this.props.user.role_id == 2 ?
                    null
                    :
                    <TouchableOpacity
                        onPress={() => this.referForPetPartner()}
                        underlayColor="green" style={[styles.button, {
                            borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DCDCDC', borderBottomWidth: StyleSheet.hairlineWidth
                        }]}>
                        <View>
                            <Text style={styles.buttonText}>{string('refer')}</Text>
                        </View>

                    </TouchableOpacity>
            } */}
            <TouchableOpacity
                onPress={() => this.logOutSuccess()} underlayColor="green"
                 style={[styles.button,{ paddingLeft:8,paddingTop:16}]}>
                <Text style={styles.buttonText}>{string('logout')}</Text>
            </TouchableOpacity>
        </Animated.View>

    )
}
/******************** Modal Function  **************/
  renderMainView =()=>{
    let {user} = this.props.screenProps.user
    if(user){
      return <FlipView
      style={{ flex: 1 }}
      ref={input => (this.flip = input)}
      front={this._renderFront()}
      back={this._renderBack()}
      isFlipped={this.state.isFlipped}
      onFlipped={val => {
        console.log("Flipped: " + val);
      }}
      flipAxis="y"
      flipEasing={Easing.out(Easing.ease)}
      flipDuration={500}
      perspective={1000}
    />
    }else{
      return <GuestLoginView   
      image={Images.propfileimage}
      {...this.props}
      />
    }
  }
  render() {
    return this.renderMainView()
  }
}
export default Settings;
const detailStyles = StyleSheet.create({
  fill: {
    flex: 1
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    // overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "#F5F8FA",
    // marginTop: Platform.OS === "ios" ? 18 : 28,
    height: 65,
    alignItems: "center",
    //justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    right: 0
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: normalize(22)
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  }
});
