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
import DeviceInfo from "react-native-device-info";
import InstagramLogin from "react-native-instagram-login";

import { postRequest } from "../../redux/request/Service";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { LoginManager, AccessToken, setAvatar } from "react-native-fbsdk";
import { Images } from "../../utilities/contsants";
import backButton from "../../assets/images/ic_back.png";
import TextInputComponent from "../../components/TextInput";
import CustomeButton from "../../components/Button";
import styles from "../../styles";
import Text from "../../components/Text";

import { string } from "../../utilities/languages/i18n";
//Utilities
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
import { normalize } from "../../utilities/helpers/normalizeText";

//Utilities
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  partnerId: "",
  firstNameFieldFocus: false,
  lastNameFieldFocus: false,
  emailFieldFocus: false,
  passwordFieldFocus: false,
  partnerIdFieldFocus: false,
  isModalVisible: false,
  loader: false,
  securePassword: true,
  visible: false
};
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.configureGoogleSignIn();
  }
  //Form validations
  ValidationRules = () => {
    let { firstName, lastName, email, password } = this.state;
    let { lang } = this.props.screenProps.user;
    debugger;
    return [
      {
        field: firstName.trim(),
        name: string("firstname"),
        rules: "required",
        lang: lang
      },
      {
        field: lastName.trim(),
        name: string("lastName"),
        rules: "required",
        lang: lang
      },

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
      // {
      //     field: partnerId.trim(),
      //     name: 'Partner id',
      //     rules: 'required',
      //    lang: lang

      // },
    ];
  };

  //Signup process
  signUpRequest = () => {
    let { netStatus, fcm_id } = this.props.screenProps.user;
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      //this.setError(true,colors.danger)
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else {
      if (!netStatus) {
        return toastRef.show(string("NetAlert"));
      } else {
        let { firstName, lastName, email, password } = this.state;
        let { params } = this.props.navigation.state;
        let data = {};
        data["email"] = email.trim();
        data["firstname"] = firstName.trim();
        data["lastname"] = lastName.trim();
        data["type"] = params.role == "Customer" ? 1 : 2;
        data["password"] = password.trim();
        data["device_id"] = DeviceInfo.getUniqueID();
        data["device_token"] =fcm_id
        postRequest("user/register", data)
          .then(res => {
            if (res) {
              this.props.navigation.navigate("EmailVerifiedScreen", {
                user: res
              });
            }
          })
          .catch(err => {
            debugger;
          });
      }
    }
  };
  configureGoogleSignIn = () => {
    GoogleSignin.configure();
  };
  // Facebook Signin
  googleSignin = async () => {
    debugger;
    let { toastRef } = this.props.screenProps;
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;

    let { netStatus,fcm_id } = this.props.screenProps.user;
    if (!netStatus) {
      return toastRef.show(string("NetAlert"));
    } else {
      try {
        const serviceHas = await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        let json = userInfo.user;
        if (json) {
          let user = {};
          let { params } = this.props.navigation.state;
          user.name = json.name;
          user.provider_user_id = json.id;
          user.email = json.email;
          user.profile_pic = json.photo;
          user["device_id"] = DeviceInfo.getUniqueID();
          user.provider = "google";
          user["type"] = params.role == "Customer" ? 1 : 2;
          user.device_type = Platform.OS == "ios" ? "ios" : "android";
          user.device_token =fcm_id
          this.postSocialRequest(user);
        } else {
          toastRef.show("User info not getting");
        }
        // this.setState({ userInfo });
      } catch (error) {
        debugger;
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          setToastMessage(true, colors.danger);
          setTimeout(() => {
            toastRef.show("You user cancels the sign in flow");
          }, 500);

          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          setToastMessage(true, colors.danger);
          setTimeout(() => {
            toastRef.show(
              "Trying to invoke another sign in flow (or any of the other operations) when previous one has not yet finished",
              colors.danger
            );
          }, 500);
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          setToastMessage(true, colors.danger);
          setTimeout(() => {
            toastRef.show("Play services are not available or outdated,");
          }, 500);
          // play services not available or outdated
        } else {
          setToastMessage(true, colors.danger);
          setTimeout(() => {
            toastRef.show("Error from api");
          }, 500);

          debugger;
          // some other error happened
        }
      }
    }
  };
  // Facebook Login
  facebookLogin = async () => {
    let { netStatus, fcm_id } = this.props.screenProps.user;
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    if (!netStatus) {
      return toastRef.show(string("NetAlert"));
    } else {
      setIndicator(true);
      LoginManager.logInWithPermissions(["public_profile", "email"])
        .then(result => {
          // alert(result.isCancelled)
          if (result.isCancelled) {
            setIndicator(false);
            setToastMessage(true, colors.danger);
            setTimeout(() => {
              toastRef.show(string("logincancelled"));
            }, 1000);
            //
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const { accessToken } = data;
              this.getUserInfofacebook(accessToken);
            });
          }
        })
        .catch(error => {
          debugger;
          setIndicator(false);

          setToastMessage(true, colors.danger);
          setTimeout(() => {
            toastRef.show(error.message);
          }, 1000);

          // ToastMessage(error)
          console.log("Login fail with error: " + error);
        });
    }
  };
  // Save Social Request
  postSocialRequest = user => {
    let {
      setToastMessage,
      setIndicator,
      setLoggedUserData
    } = this.props.screenProps.actions;
    postRequest("user/verifySocialAccount", user)
      .then(res => {
        if (res.statuscode == 200) {
          if (
            res.result &&
            res.result.user &&
            res.result.user.phone &&
            res.result.user.status_id == 1
          ) {
            setLoggedUserData(res.result.user);
            if (res.result.user.user_type == "customer") {
              this.props.navigation.navigate("CustomerTabNavigator");
            } else if (res.result.user.user_type == "vendor") {
              this.props.navigation.navigate("VendorTabNavigator");
            }
          } else {
            this.props.navigation.navigate("EnterMobile", {
              user: { user: res.result.user.id }
            });
          }
        }
        setIndicator(false);
      })
      .catch(err => {
        setIndicator(false);
      });
  };
  getUserInfofacebook = token => {
    debugger;
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { netStatus,fcm_id } = this.props.screenProps.user;

    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,picture.height(480)&access_token=" +
        token
    )
      .then(response => response.json())
      .then(json => {
        let user = {};
        let { params } = this.props.navigation.state;
        user.name = json.name;
        user.provider_user_id = json.id;
        user.email = json.email;
        user.profile_pic = json.picture.data.url;
        user.provider = "facebook";
        user["device_id"] = DeviceInfo.getUniqueID();
        user["type"] = params.role == "Customer" ? 1 : 2;
        user.device_type = Platform.OS == "ios" ? "ios" : "android";
        user.device_token = fcm_id;
        this.postSocialRequest(user);
      })
      .catch(err => {
        setIndicator(false);
        setToastMessage(true, colors.danger);
        setTimeout(() => {
          toastRef.show("ERROR GETTING DATA FROM FACEBOOK");
        }, 1000);

        console.log("ERROR GETTING DATA FROM FACEBOOK");
      });
  };

  pressButton = title => {
    if (title == "CONTINUE") {
      this.signUpRequest();
      //this.props.navigation.navigate('EnterMobile')
    } else if (title == "CONTINUE USING FACEBOOK") {
      this.facebookLogin();
    } else if (title == "CONTINUE USING GOOGLE") {
      this.googleSignin();
    } else if (title == "CONTINUE USING INSTAGRAM") {
      this.instagramLogin.show();
    }
  };
  renderSocialButton = (
    title,
    transparent,
    imageLeft,
    color,
    fontSize,
    center
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.pressButton(title.toUpperCase())}
        style={{
          borderColor: transparent ? "#EAEAEA" : "transparent",
          justifyContent: "center",
          borderWidth: 1,
          height: 48,
          width: 48,
          backgroundColor: transparent ? "transparent" : color,
          borderRadius: 48 / 2
        }}
      >
        <Image
          source={imageLeft}
          style={{ alignSelf: "center", height: fontSize, width: fontSize }}
        />
      </TouchableOpacity>
    );
  };
  // Instagram user info
  getInstagramUserInfo = token => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { netStatus,fcm_id } = this.props.screenProps.user;

    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(response => response.json())
      .then(json => {
        let user = {};
        user.name = json.data.full_name;
        user.provider_user_id = json.data.id;
        //user.email = json.email
        user.profile_pic = json.data.profile_picture;
        user.provider = "instagram";
        user["device_id"] = DeviceInfo.getUniqueID();
        user.device_type = Platform.OS == "ios" ? "ios" : "android";
        user.device_token =fcm_id
        this.postSocialRequest(user);
      })
      .catch(err => {
        setToastMessage(true, colors.danger);
        setTimeout(() => {
          toastRef.show("ERROR GETTING DATA FROM INSTAGRAM");
        }, 500);
        console.log("ERROR GETTING DATA FROM INSTAGRAM");
      });
  };
  renderButton = (title, transparent, imageLeft, color, fontSize, center) => {
    return (
      <CustomeButton
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          borderColor: transparent ? "#EAEAEA" : "transparent",
          backgroundColor: transparent ? "transparent" : color
        }}
        imageSource={true}
        imageLeft={imageLeft}
        buttonTextStyle={{
          fontWeight: imageLeft ? "normal" : "bold",
          paddingLeft: center ? 0 : 16,
          justifyContent: center ? "center" : "flex-start"
        }}
        imageLeftLocal={imageLeft}
        fontSize={normalize(fontSize)}
        color={transparent ? "#455F6C" : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={{ paddingTop: 20 }}>
                <Image source={backButton} />
              </View>
            </TouchableOpacity>
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.loginText}>{string("signupsmall")}</Text>
            </View>
            <View style={styles.firstNameLastNameView}>
              <View style={{ flex: 0.5, marginRight: 5 }}>
                {/* <Text></Text> */}
                <TextInputComponent
                  // user={this.props.user}
                  label={string("firstname")}
                  inputMenthod={input => {
                    this.firstNameField = input;
                  }}
                  // placeholder={string('Email')}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  selectionColor="#96C50F"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  viewTextStyle={styles.viewTextStyle}
                  value={this.state.firstName}
                  underlineColorAndroid="transparent"
                  isFocused={this.state.firstNameFieldFocus}
                  onFocus={() => this.setState({ firstNameFieldFocus: true })}
                  onBlur={() => this.setState({ firstNameFieldFocus: false })}
                  onChangeText={firstName => this.setState({ firstName })}
                  onSubmitEditing={event => {
                    this.lastNameField.focus();
                  }}
                />
              </View>
              {/* <View style={{width:5}}/> */}
              <View style={{ flex: 0.5, marginLeft: 5 }}>
                <TextInputComponent
                  label={string("lastName")}
                  inputMenthod={input => {
                    this.lastNameField = input;
                  }}
                  // placeholder={string('Password')}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  // secureTextEntry={this.state.securePassword}
                  returnKeyType="done"
                  keyboardType="default"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  value={this.state.lastName}
                  viewTextStyle={styles.viewTextStyle}
                  onShowPassword={() =>
                    this.setState({
                      securePassword: !this.state.securePassword
                    })
                  }
                  isFocused={this.state.lastNameFieldFocus}
                  underlineColorAndroid="transparent"
                  onFocus={() => this.setState({ lastNameFieldFocus: true })}
                  onBlur={() => this.setState({ lastNameFieldFocus: false })}
                  onChangeText={lastName => this.setState({ lastName })}
                  onSubmitEditing={event => {
                    this.emailField.focus();
                  }}
                />
              </View>
            </View>
            <View style={{ height: 20 }} />
            <TextInputComponent
              // user={this.props.user}
              label={string("email")}
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

            <View style={{ height: 20 }} />
            <TextInputComponent
              // user={this.props.user}
              // label={'Password'}
              // // secureTextEntry={true}
              // inputMenthod={(input) => { this.passwordField = input }}
              // // placeholder={string('Email')}
              // placeholderTextColor="rgba(62,62,62,0.55)"
              // selectionColor="#3B56A6"
              // returnKeyType="next"
              // keyboardType='default'
              // autoCorrect={false}
              // autoCapitalize='none'
              // blurOnSubmit={false}
              // viewTextStyle={styles.viewTextStyle}
              // value={this.state.password}
              // underlineColorAndroid='transparent'
              // isFocused={this.state.passwordFieldFocus}
              // onFocus={() => this.setState({ passwordFieldFocus: true })}
              // onBlur={() => this.setState({ passwordFieldFocus: false })}
              // onChangeText={(password) => this.setState({ password })}
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
          </View>

          <View style={{ height: 35 }} />
          <View style={styles.continueButton}>
            {this.renderButton(
              "CONTINUE",
              false,
              false,
              colors.primary,
              16,
              true
            )}
            <View style={{ height: 30 }} />
            <View style={styles.dontHaveAnAccountView}>
              <View>
                <Text
                  style={[
                    styles.whatisPetPartner,
                    { color: "#455F6C", fontSize: normalize(16) }
                  ]}
                >
                  {string("alreadyamember")}
                  <Text
                    style={[styles.becomePartner, { color: colors.primary }]}
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    {" "}
                    {string("login")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.orView, { paddingTop: 8 }]}>
            <View style={{ flex: 0.48 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 0.07,
                alignItems: "center",
                marginTop: -7
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.56)", lineHeight: 15 }}>
                {string("or")}
              </Text>
            </View>
            <View style={{ flex: 0.48 }}>
              <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.2)" }} />
            </View>
          </View>
          <View style={{ height: 16 }} />
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View>
            {this.renderSocialButton(string("continueusingfacebook"),false,Images.facebookIcon,'#3E5F97',22)}
            </View>
            <View style={{paddingHorizontal:24}}>
            {this.renderSocialButton(string("continueusinggoogle"),true,Images.googleIcon,colors.transparent,24)}
            </View>   
            <View>
            {/* {this.renderSocialButton(string("continueusinginstagram"),true,Images.instagram,'#E1306C',32)} */}
            </View>

          </View>
          <View style={{ height: 16 }} />

          {/* {this.renderButton(string("continueusingfacebook"),false,Images.facebookIcon,'#3E5F97',14)}

          <View style={{ height: 20 }} />
          {this.renderButton(
            string("continueusinggoogle"),
            true,
            Images.googleIcon,
            colors.transparent,
            14
          )}
          <View style={{ height: 20 }} />
          {this.renderButton(string("continueusinginstagram"),true,Images.instagram,'#E1306C',14)}
          <View style={{ height: 20 }} /> */}

          <View style={styles.signInAgreeView}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.whatisPetPartner,
                  {
                    color: "#455F6C",
                    textAlign: "center",
                    fontSize: normalize(14)
                  }
                ]}
              >
                {string("bySigninginyouareagreedto")}
                <Text
                  style={[styles.becomePartner, { fontSize: normalize(14) }]}
                  onPress={() => console.log("")}
                >
                  {" "}
                  {string("privacypolicies")}
                </Text>
                <Text
                  style={[
                    styles.whatisPetPartner,
                    {
                      color: "#455F6C",
                      fontSize: normalize(14)
                    }
                  ]}
                >
                  &nbsp;{string("and")}
                </Text>
                <Text
                  style={[styles.becomePartner, { fontSize: normalize(14) }]}
                  onPress={() => console.log("")}
                >
                  &nbsp;{string("termsandcondi")}
                </Text>
              </Text>
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          clientId="851971e11b9a4a30b86f70a65b32200a"
          redirectUrl="https://www.seizeit-me.com/insta_callback"
          scopes={["basic"]}
          onLoginSuccess={token => {
            this.getInstagramUserInfo(token);
          }}
          onLoginFailure={data => {
            debugger;
          }}
        />
      </View>
    );
  }
}
export default Signup;
