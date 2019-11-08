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
import DeviceInfo from 'react-native-device-info';
import InstagramLogin from 'react-native-instagram-login'

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
// import InstagramLogin from './Instagram';

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
      // {
      //   field: email.trim(),
      //   name: string("email"),
      //   rules: "required|email|no_space",
      //   lang: lang
      // },
      {
        field: password,
        name: string("password"),
        rules: "required|no_space|min:6",
        lang: lang
      }
    ];
  };
 
  loginByEmail = () => {
    debugger
    let { netStatus,fcm_id,lang } = this.props.screenProps.user;
    let {setToastMessage,setLoggedUserData} = this.props.screenProps.actions
    let { email, password } = this.state
    let {toastRef} = this.props.screenProps
    let validation = Validation.validate(this.ValidationRules());
    // Email Validation
    if (email.match(".*[a-zA-Z]+.*")) {
      debugger
       let ruleEmail =  [{
        field: email.trim(),
        name: string("email"),
        rules: "required|email|no_space",
        lang: lang
      }]
       let validationemail = Validation.validate(ruleEmail);
       debugger
       if(validationemail.length != 0){
        setToastMessage(true,colors.danger)
        return toastRef.show(validationemail[0].message)
       }else{
        this.signUpUser()
       }

    }else if(email.match(/^[0-9]*$/)){
      let ruleEmail =  [{
        field: email,
        name: string("mobilenumber"),
        rules: 'required|numeric|no_space|min:10|max:10',
        lang: lang
      }]
      let validationemail = Validation.validate(ruleEmail);
       if(validationemail.length != 0){
        setToastMessage(true,colors.danger)
        return toastRef.show(validationemail[0].message)
       }else{
        this.signUpUser()
       }
   }
  };
  signUpUser=()=>{
    let { netStatus,fcm_id,lang } = this.props.screenProps.user;
    let {setToastMessage,setLoggedUserData} = this.props.screenProps.actions
    let { email, password } = this.state
    let {toastRef} = this.props.screenProps
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      //this.setError(true,colors.danger)
      setToastMessage(true,colors.danger)
      return toastRef.show(validation[0].message)
  }else {
    let data = {}
    debugger
    data['email'] = email.trim()
    data['password'] = password.trim()
    data['device_token'] = '1234'+Math.random(10)
    data['device_id'] = DeviceInfo.getUniqueID()
    data['device_type'] = Platform.OS == 'ios' ? 'ios' : 'android'
    postRequest('user/login',data).then((res) => {
      if(res.data){
        this.props.navigation.navigate('EnterMobile',{
          user:{user:res.data}
         })
      } else if(res.success){
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
  configureGoogleSignIn =() =>{
    GoogleSignin.configure()
  }

// Facebook Signin
  googleSignin = async () => {
    debugger
    let {setToastMessage,setIndicator} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    let { netStatus } = this.props.screenProps.user;
    if(!netStatus){
      return toastRef.show(string('NetAlert'))
    }else{
    try {
      await GoogleSignin.hasPlayServices();
      debugger
      const userInfo = await GoogleSignin.signIn();
      debugger
      let json = userInfo.user
      if(json){
        let user = {}
        user.name = json.name
        user.provider_user_id = json.id
        user.email = json.email
        user.profile_pic = json.photo
        user.provider = 'google'
        user['device_id'] = DeviceInfo.getUniqueID()
        user.device_type = Platform.OS == 'ios' ? 'ios' : 'android'
        user.device_token ='1234'+Math.random(10)
        this.postSocialRequest(user)
      }else{
        toastRef.show('User info not getting')
      }
      // this.setState({ userInfo });
    } catch (error) {
      debugger
      debugger
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setToastMessage(true,colors.danger)
        setTimeout(()=>{
          toastRef.show('You user cancels the sign in flow')
        },500)
    
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setToastMessage(true,colors.danger)
        setTimeout(()=>{
          toastRef.show('Trying to invoke another sign in flow (or any of the other operations) when previous one has not yet finished',colors.danger)
        },500)
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setToastMessage(true,colors.danger)
        setTimeout(()=>{
          toastRef.show('Play services are not available or outdated,')
        },500)
        // play services not available or outdated
      } else {
        setToastMessage(true,colors.danger)
        setTimeout(()=>{
          toastRef.show('Error from api')
        },500)
        // some other error happened
      }
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
        if(result.isCancelled) {
           setIndicator(false)
           setToastMessage(true,colors.danger)
           setTimeout(()=>{
            toastRef.show(string('logincancelled'))
          },1000)
        } else {
            AccessToken.getCurrentAccessToken().then((data) => {
                const { accessToken } = data
                this.getUserInfofacebook(accessToken)
            })
        }
    }).catch((error) => {
        debugger
        setIndicator(false)
        setToastMessage(true,colors.danger)
        setTimeout(()=>{
          toastRef.show(error.message);
        },500)
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
      if(res.statuscode == 200){
        if(res.result && res.result.user && res.result.user.phone && (res.result.user.status_id == 1)){
          setLoggedUserData(res.result.user)
          if(res.result.user.user_type == 'customer'){
             this.props.navigation.navigate('CustomerTabNavigator')
           }else if(res.result.user.user_type == 'vendor'){
            this.props.navigation.navigate('VendorTabNavigator')
           }
          }else{
            this.props.navigation.navigate('EnterMobile',{
              user:{user:res.result.user.id}
             })
          }
      }
      setIndicator(false)
    }).catch((err) => {
    })
   }
  getUserInfofacebook = token => {
    let {setToastMessage} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture.height(480)&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                let user = {}
                user.name = json.name
                user.provider_user_id = json.id
                user.email = json.email
                user.profile_pic = json.picture.data.url
                user.provider = 'facebook'
                user['device_id'] = DeviceInfo.getUniqueID()
                user.device_type = Platform.OS == 'ios' ? 'ios' : 'android'
                user.device_token ='1234'+Math.random(10)
                this.postSocialRequest(user)
               })
            .catch((err) => {
              setToastMessage(true,colors.danger)
              setTimeout(()=>{
                toastRef.show('ERROR GETTING DATA FROM FACEBOOK')
              },500)
                console.log('ERROR GETTING DATA FROM FACEBOOK')
            })
    }
    // Instagram user info
    getInstagramUserInfo =(token)=>{    
      let {setToastMessage} = this.props.screenProps.actions
      let {toastRef} = this.props.screenProps
      fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
         .then((response) => response.json())
              .then((json) => {
                debugger
                  let user = {}
                  user.name = json.data.full_name
                  user.provider_user_id = json.data.id
                  // user.email = json.email
                  user.profile_pic = json.data.profile_picture
                  user.provider = 'instagram'
                  user['device_id'] = DeviceInfo.getUniqueID()
                  user.device_type = Platform.OS == 'ios' ? 'ios' : 'android'
                  user.device_token ='1234'+Math.random(10)
                  debugger
                   this.postSocialRequest(user)
                 })
              .catch((err) => {
                debugger
                setToastMessage(true,colors.danger)
                setTimeout(()=>{
                  toastRef.show('ERROR GETTING DATA FROM INSTAGRAM')
                },500)
                  console.log('ERROR GETTING DATA FROM INSTAGRAM')
              })
    }
  pressButton = (title) => {
    //this.googleSignin()
    if(title == 'CONTINUE'){
      this.loginByEmail()
    }else if(title == 'CONTINUE USING FACEBOOK'){
      this.facebookLogin()
    }else if(title == 'CONTINUE USING GOOGLE'){
      debugger
      this.googleSignin()
    }else if(title == 'CONTINUE USING INSTAGRAM'){
      this.instagramLogin.show()
    }
  };
  renderButton = (title,transparent,imageLeft,color,fontSize,center) => {
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
        buttonTextStyle={{fontWeight:imageLeft ?'normal' :'bold',
        paddingLeft:center ? 0 :16,
        justifyContent:center ? 'center' :'flex-start'}}
        imageLeftLocal={imageLeft}
        fontSize={normalize(fontSize)}
        color={transparent ?'#455F6C':'#FFFFFF'}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  renderSocialButton = (title,transparent,imageLeft,color,fontSize,center) =>{
    return <TouchableOpacity 
    activeOpacity={0.8}
    onPress={() => this.pressButton(title.toUpperCase())}
    style={{
      borderColor:transparent ? '#EAEAEA' : 'transparent',
      justifyContent:'center',
      borderWidth:1,
      height:48,width:48,backgroundColor:transparent ?'transparent':color
      ,borderRadius:48/2}}>
        <Image source={imageLeft} 
        style={{alignSelf:'center',height:fontSize,
        width:fontSize}}/>
    </TouchableOpacity>
  }
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
              onPress={() => this.props.navigation.navigate("CustomerTabNavigator")}
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
                {this.renderButton('CONTINUE',false,false,colors.primary,16,true)}
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
            <View style={{ flex: 0.48 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
            <View style={{justifyContent:'center',flex:0.07,
            alignItems:'center',
            marginTop:-7,
           }}>
              <Text style={{ color: "rgba(0,0,0,0.56)",lineHeight:15 }}>
              {string("or")}
              </Text>
            </View>
            <View style={{ flex: 0.48 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
          </View>
          <View style={{ height: 28 }} />
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View>
            {this.renderSocialButton(string("continueusingfacebook"),false,Images.facebookIcon,'#3E5F97',22)}
            </View>
            <View style={{paddingHorizontal:24}}>
            {this.renderSocialButton(string("continueusinggoogle"),true,Images.googleIcon,colors.transparent,24)}
            </View>   
            <View>
            {this.renderSocialButton(string("continueusinginstagram"),true,Images.instagram,'#E1306C',32)}
            </View>

          </View>
          {/* {this.renderButton(string("continueusingfacebook"),false,Images.facebookIcon,'#3E5F97',14)}
          <View style={{ height: 20 }} />
          {this.renderButton(string("continueusinggoogle"),true,Images.googleIcon,colors.transparent,14)}
          <View style={{ height: 20 }} />
          {this.renderButton(string("continueusinginstagram"),true,Images.instagram,'#E1306C',14)} */}
          <View style={{ height: 16 }} />
          <View>
    
       </View>
        </ScrollView>
        <InstagramLogin
        ref= {ref => this.instagramLogin= ref}
        clientId='851971e11b9a4a30b86f70a65b32200a'
        redirectUrl='https://www.seizeit-me.com/insta_callback'
        scopes={['basic']}
        onLoginSuccess={(token) => {
          this.getInstagramUserInfo(token)
        }}
        onLoginFailure={(data) => {
          debugger
        }}
       />
      </View>
    );
  }
}
export default Login;
