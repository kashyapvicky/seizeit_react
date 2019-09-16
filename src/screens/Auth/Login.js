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
import {postRequest} from '../../redux/request/Service'

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
    let { lang } = this.props.screenProps.user;
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
    let { netStatus,fcm_id } = this.props.screenProps.user;
    let {setToastMessage,setLoggedUserData} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
        //this.setError(true,colors.danger)
        setToastMessage(true,colors.danger)
        return toastRef.show(validation[0].message)
    }
    else {
      if (!netStatus) {
        return toastRef.show(string('NetAlert'))
      }else{
        let { email, password } = this.state
        let data = {}
        debugger
        data['email'] = email.trim()
        data['password'] = password.trim()
        data['device_token'] = '1234'+Math.random(10)
        data['device_type'] = Platform.OS == 'ios' ? 'ios' : 'android'
        postRequest('user/login',data).then((res) => {
          if(res.success){
            setLoggedUserData(res.success)
            if(res.success.user_type == 'customer'){
              this.props.navigation.navigate('CustomerTabNavigator')
             }else if(res.success.user_type == 'vendor'){
              this.props.navigation.navigate('VendorTabNavigator')
             }
          }
        }).catch((err) => {
        })
      }
    }
  };
  configureGoogleSignIn =() =>{
    GoogleSignin.configure()
  }

// Facebook Signin
  googleSignin = async () => {
    alert ('In Progress')
    return
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
  // Facebook Login
  facebookLogin = async () => {
    let { netStatus,fcm_id } = this.props.screenProps.user;
    let {setToastMessage,setIndicator} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    if(!netStatus){
      return toastRef.show(string('NetAlert'))
    }else{
      setIndicator(true)
      LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
        if (result.isCancelled) {
           setIndicator(false)
           toastRef.show(string('logincancelled'))
        } else {
            AccessToken.getCurrentAccessToken().then((data) => {
                const { accessToken } = data
                this.getUserInfofacebook(accessToken)
            })
        }
    }).catch((error) => {
        debugger
        toastRef.show(error)
        // ToastMessage(error)
        console.log("Login fail with error: " + error);
    })
    }

  };
  // Save Social Request
   postSocialRequest = (user) =>{
    let {setToastMessage,setIndicator,setLoggedUserData} = this.props.screenProps.actions
    postRequest('user/verifySocialAccount',user).then((res) => {
      debugger
      if(res.success){
        setLoggedUserData(res.success)
        if(res.success.user_type == 'customer'){
          this.props.navigation.navigate('CustomerTabNavigator')
         }else if(res.success.user_type == 'vendor'){
          this.props.navigation.navigate('VendorTabNavigator')
         }
      }
      setIndicator(false)
    }).catch((err) => {
    })
   }
  getUserInfofacebook = token => {
    let {toastRef} = this.props.screenProps
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture.height(480)&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                let user = {}
                user.name = json.name
                user.provider_user_id = json.id
                user.email = json.email
                user.profile_pic = json.picture.data.url
                user.device_id = 'tetttee'
                user.provider = 'facebook'
                
                user.device_type = Platform.OS == 'ios' ? 'ios' : 'android'
                user.device_token ='1234'+Math.random(10)
                this.postSocialRequest()
               })
            .catch((err) => {
              toastRef.show('ERROR GETTING DATA FROM FACEBOOK')
                console.log('ERROR GETTING DATA FROM FACEBOOK')
            })
    }
  pressButton = (title) => {
    //this.googleSignin()
    if(title == 'CONTINUE'){
      this.loginByEmail()
    }else if(title == 'CONTINUE USING FACEBOOK'){
      this.facebookLogin()
    }else if(title == 'CONTINUE USING GOOGLE'){
      this.googleSignin()
    }
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
