import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

import { LoginManager, AccessToken, setAvatar } from "react-native-fbsdk";
//Local imports
import homelogo from "../../assets/images/Logo.png";
import backButton from "../../assets/images/ic_back.png";
import TextInputComponent from "../../components/TextInput";
import CustomeButton from "../../components/Button";
import styles from "../../styles";
import Text from '../../components/Text'

import { string } from "../../utilities/languages/i18n";
//Utilities
import Validation from "../../utilities/validations";
import colors from '../../utilities/config/colors';
import { normalize } from "../../utilities/helpers/normalizeText";
import { Images } from "../../utilities/contsants";

// import firebase from 'react-native-firebase';

// const initialState =
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailFieldFocus: false,
      passwordFieldFocus: false,
      loader: false,
      securePassword: true,
      visible: false,
      refreshToken: null
    };
  }
  componentDidMount(){
  this.configureGoogleSignIn();
}
  ValidationRules = () => {
    let { email, password } = this.state;
    let { lang } = this.props.userCommon;
    debugger;
    return [
      {
        field: email.trim(),
        name: string("email"),
        rules: "required|email|no_space",
        lang: lang
      },
      {
        field: password,
        name: string("password"),
        rules: "required|no_space|min:6",
        lang: lang
      }
    ];
  };
 
  loginByEmail = () => {
    // if (!this.props.userCommon.netStatus) {
    //     return this.props.actions.showOptionsAlert('Check your internet connection!')
    // }
    // else {
    //     let { email, password } = this.state
    //     let validation = Validation.validate(this.ValidationRules())
    //     if (validation.length != 0) {
    //         return ToastMessage(validation[0])
    //     }
    //     else {
    //         this.setState({ visible: true })
    //         let data = {}
    //         data['email'] = email.trim()
    //         data['password'] = password.trim()
    //         // data['fcm_id'] = this.state.refreshToken
    //         data['device_type'] = Platform.OS == 'ios' ? 'ios' : 'android'
    //         data['device_id'] = DeviceInfo.getUniqueID()
    //         // data['role_id'] = Math.floor(Math.random() * 11)
    //         // return ToastMessage(JSON.stringify(data))
    //         this.props.loginActions.totatCartItem(0)
    //         this.props.loginActions.logInUser(data).then((res) => {
    //             if (res && res.status == 200) {
    //                 debugger
    //                 if (res && res.data.status == 200) {
    //                     this.setState({ visible: false })
    //                     // ToastMessage(res.data.message)
    //                     ToastMessage(string('loginsuccess'))
    //                     this.props.loginActions.logInUserActionype(res.data)
    //                     this.props.loginActions.totatCartItem(JSON.parse(res.data.cart))
    //                     setTimeout(() => {
    //                         this.props.navigation.navigate('App')
    //                     }, 2000);
    //                 }
    //                 else if (res && res.data.status == 600) {
    //                     this.setState({
    //                         resendVerificationcode: true,
    //                         visible: false
    //                     })
    //                     ToastMessage(res.data.message)
    //                 }
    //                 else {
    //                     this.setState({ visible: false })
    //                     ToastMessage(res.data.message)
    //                 }
    //             }
    //             else {
    //                 if (res.response && res.response.data && res.response.data.msg != '') {
    //                     this.setState({ visible: false }, () => {
    //                         ToastMessage(res.response.data.msg)
    //                     })
    //                 }
    //                 else {
    //                     debugger
    //                     // alert("Something went wrong from server")
    //                     this.setState({ visible: false })
    //                 }
    //             }
    //         }).catch((err) => {
    //             debugger
    //             this.setState({ visible: false })
    //             // alert("Something went wrong")
    //         })
    //     }
    // }
  };
  configureGoogleSignIn =() =>{
    GoogleSignin.configure()
  }
  googleSignin = async () => {
    debugger
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      debugger
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  facebookLogin = async () => {
       // this.setState({ visible: true })
        LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
            if (result.isCancelled) {
                debugger
                this.setState({ visible: false })
               // ToastMessage(string('logincancelled'))
                // console.log("Login cancelled");
            } else {
                debugger
                AccessToken.getCurrentAccessToken().then((data) => {
                    debugger
                    const { accessToken } = data
                    this.getUserInfofacebook(accessToken)
                })
            }
        }).catch((error) => {
            debugger
            // ToastMessage(error)
            console.log("Login fail with error: " + error);
        })
  
  };

  getUserInfofacebook = token => {
    debugger
    //     fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture.height(480)&access_token=' + token)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // this.setState({ visible: false })
    //             console.log(json, "user data")
    //             let user = {}
    //             user.name = json.name
    //             user.social_id = json.id
    //             user.email = json.email
    //             user.image = json.picture.data.url
    //             user.device_id = DeviceInfo.getUniqueID()
    //             user.device_type = Platform.OS == 'ios' ? 'ios' : 'android'
    //             debugger
    //             this.props.loginActions.totatCartItem(0)
    //             this.props.loginActions.socialMediaLogin(user).then((res) => {
    //                 debugger
    //                 if (res && res.status == 200) {
    //                     if (res && res.data.status == 200) {
    //                         this.setState({ visible: false })
    //                         // ToastMessage(res.data.message)
    //                         ToastMessage(string('loginsuccess'))
    //                         this.props.loginActions.logInUserActionype(res.data)
    //                         this.props.loginActions.totatCartItem(JSON.parse(res.data.cart))
    //                         setTimeout(() => {
    //                             this.props.navigation.navigate('App')
    //                         }, 2000);
    //                     }
    //                     else if (res && res.data.status == 600) {
    //                         this.setState({
    //                             resendVerificationcode: true,
    //                             visible: false
    //                         })
    //                         ToastMessage(res.data.message)
    //                     }
    //                     else {
    //                         this.setState({ visible: false })
    //                         ToastMessage(res.data.message)
    //                     }
    //                 }
    //                 else {
    //                     this.setState({ visible: false })
    //                     // ToastMessage("Something went wrong from server")
    //                 }
    //             }).catch((err) => {
    //                 this.setState({ visible: false })
    //                 // ToastMessage("Something went wrong from server")
    //                 console.log(err)
    //             })
    //         })
    //         .catch((err) => {
    //             debugger
    //             this.setState({ visible: false })
    //             console.log('ERROR GETTING DATA FROM FACEBOOK')
    //         })
    // }
    // recentVerifcationCode = () => {
    //     if (this.state.email != "" || this.state.email != null) {
    //         this.setState({ visible: true })
    //         this.props.loginActions.recentVerifcationCode(this.state.email).then((res) => {
    //             if (res && res.status == 200) {
    //                 if (res && res.data && res.data.status == 200) {
    //                     this.setState({
    //                         visible: false
    //                     }, () => {
    //                         ToastMessage(res.data.message)
    //                     })
    //                 }
    //                 else {
    //                     this.setState({
    //                         visible: false
    //                     }, () => {
    //                         ToastMessage(res.data.message)
    //                     })
    //                 }
    //             }
    //             else {
    //                 this.setState({
    //                     visible: false
    //                 })
    //             }
    //         }).catch((err) => {
    //             this.setState({ visible: false })
    //             console.log(err)
    //         })
    //     }
    //     else {
    //         ToastMessage('Please enter the valid email')
    //     }
  };
  pressButton = () => {
    //this.googleSignin()
     this.props.navigation.navigate('TabNavigator')
  };
  renderButton = (title,transparent,imageLeft,color,fontSize) => {
    return (
      <CustomeButton
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius:8,
          borderColor:transparent ? '#EAEAEA' : 'transparent',
          backgroundColor:transparent ?'transparent':color
        }}
        imageSource={true}
        imageLeft={imageLeft}
        buttonTextStyle={{fontWeight:imageLeft ?'normal' :'bold'}}
        imageLeftLocal={imageLeft}
        fontSize={normalize(fontSize)}
        color={transparent ?'#455F6C':'#FFFFFF'}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1,paddingHorizontal:24 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={() => null}>
              {/* <View style={[styles.backButtonImage, { alignItems: "center" }]}>
                <Image source={backButton} />
              </View> */}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={9}
              onPress={() => this.props.navigation.navigate("TabNavigator")}
            >
              <View style={[styles.backButtonImage, { alignItems: "center" }]}>
                <Text
                  style={{ color: "#455F6C", fontSize: 16, lineHeight: 24 }}
                >
                  {string("skip")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.homelogo2,{marginTop: 25,}]}>
            <Image source={homelogo} />
          </View>
          <View  style={{ marginTop: 25 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.loginText}>{string("loginsmall")}</Text>
            </View>
            <View>
              {/* <Text></Text> */}
              <TextInputComponent
                user={this.props.user}
                label={string("enter/mobile")}
                inputMenthod={input => {
                  this.emailField = input;
                }}
                // placeholder={string('Email')}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewTextStyle}
                value={this.state.email}
                underlineColorAndroid="transparent"
                isFocused={this.state.emailFieldFocus}
                onFocus={() => this.setState({ emailFieldFocus: true })}
                onBlur={() => this.setState({ emailFieldFocus: false })}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={event => {
                  this.passwordField.focus();
                }}
              />
            </View>
            <View style={{ height: 20 }} />
            <TextInputComponent
              label={string("password")}
              inputMenthod={input => {
                this.passwordField = input;
              }}
              // placeholder={string('Password')}
              placeholderTextColor="rgba(62,62,62,0.55)"
              secureTextEntry={this.state.securePassword}
              returnKeyType="done"
              keyboardType="default"
              autoCorrect={false}
              blurOnSubmit={false}
              autoCapitalize="none"
              value={this.state.password}
              viewTextStyle={styles.viewTextStyle}
              onShowPassword={() =>
                this.setState({ securePassword: !this.state.securePassword })
              }
              isFocused={this.state.passwordFieldFocus}
              underlineColorAndroid="transparent"
              onFocus={() => this.setState({ passwordFieldFocus: true })}
              onBlur={() => this.setState({ passwordFieldFocus: false })}
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={event => {
                Keyboard.dismiss();
              }}
            />
            <View style={{ height: 16 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {this.state.resendVerificationcode ? (
                <TouchableOpacity
                  activeOpacity={9}
                  onPress={() => this.recentVerifcationCode()}
                >
                  <View style={styles.forgotPassView2}>
                    <Text style={styles.becomePartner}>
                      {string("resendverificationcode")}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              <TouchableOpacity
                activeOpacity={9}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <View style={styles.forgotPassView}>
                  <Text style={styles.becomePartner}>
                    {string("forgotpass")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 16 }} />
          <View style={styles.continueButton}>
                {this.renderButton('CONTINUE',false,false,colors.primary,16)}
            <View style={{ height: 30 }} />
            <View style={styles.dontHaveAnAccountView}>
              <View>
                <Text style={[styles.whatisPetPartner,{color:'#455F6C',fontSize:normalize(16)}]}>
                  {string("donthaveaccount")}
                  <Text
                    style={[styles.becomePartner,{color:colors.primary}]}
                    onPress={() => this.props.navigation.navigate("ChooseType")}
                  >
                    {" "}
                    {string("signUp")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.orView,{paddingTop:8}]}>
            <View style={{ flex: 0.5 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
            <View>
              <Text style={{ color: "rgba(0,0,0,0.56)" }}>
              {string("or")}
              </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
          </View>
          <View style={{ height: 20 }} />
          {this.renderButton(string("continueusingfacebook"),false,Images.facebookIcon,'#3E5F97',14)}
          <View style={{ height: 20 }} />
          {this.renderButton(string("continueusinggoogle"),true,Images.googleIcon,colors.transparent,14)}
          <View style={{ height: 20 }} />

        </ScrollView>
      </View>
    );
  }
}
export default Login;
