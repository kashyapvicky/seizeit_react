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
import CodeInput from "react-native-confirmation-code-input";
import {postRequest} from '../../redux/request/Service'

//Local imports
import backButton from "../../assets/images/ic_back.png";
import TextInputComponent from "../../components/TextInput";
import CustomeButton from "../../components/Button";
import styles from "../../styles";
import Text from '../../components/Text'

import { string } from "../../utilities/languages/i18n";
//Utilities
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
import { normalize } from "../../utilities/helpers/normalizeText";
import { screenDimensions } from "../../utilities/contsants";

//Utilities
const initialState = {
  code: "",
  emailFieldFocus: false,
  loader: false,
  securePassword: true,
  visible: false
};

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  inputText(ref) {
    this.value = ref;
  }
  submitMethod() {
    this.value.focus();
  }
  componentDidMount = () => {
    // this.props.navigation.navigate('App')
    // console.log("this.props.navigation", this.props.navigation)
  };

  backToFirst = () => {
    this.props.navigation.navigate("Login");
   };

  onSubmitOtp = () => {
    let { netStatus } = this.props.screenProps.user;
    let {setLoggedUserData,setToastMessage} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    if(this.state.code.length < 6 ){
       return toastRef.show(string('Please add code first'))
    }else {
      if (!netStatus) {
        return toastRef.show(string('NetAlert'))
      }else{
        let {params} = this.props.navigation.state
        let data = {}
        data['otp'] = this.state.code
        data['user_id'] = params.user.user
        postRequest('user/varifyOtp',data).then((res) => {
          debugger
          if(res && res.success == 'Invalid Otp'){
            debugger
            setToastMessage(true,colors.danger)
            return toastRef.show(res.success)
          } else if(res && res.success){
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
pressButton = () => {
  this.onSubmitOtp()
 };

 // Resend Otp Sent
 resendOtp = () =>{
     let {toastRef} = this.props.screenProps
      let {params} = this.props.navigation.state
      let data = {}
      data['phone'] =params.mobile
      data['user_id'] = params.user.user
      postRequest('user/resendVerification',data).then((res) => {
        if(res){
          toastRef.show(res.success)
        }
      })
 }
renderButton = (title, transparent, imageLeft, color, fontSize) => {
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
        buttonTextStyle={{ fontWeight: imageLeft ? "normal" : "bold" }}
        fontSize={normalize(fontSize)}
        color={transparent ? "#455F6C" : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  render() {
    let {params} = this.props.navigation.state

    return (
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <ScrollView>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.backButtonImage}>
              <Image source={backButton} />
            </View>
          </TouchableOpacity>

          <View>
            <View style={{ marginTop: 20}}>
              <Text style={styles.loginText}>{string("verifyMobile")}</Text>
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text style={styles.forgetPassMessage}>
                {string("enter6Digit")}
                <Text style={{ fontWeight: "bold" }}> {`${params.mobile}`}</Text>
              </Text>
            </View>
            <View>
              {/* <Text></Text> */}
              <CodeInput
              ref={ref => (this.codeInputRef = ref)}
              className={"border-box"}
              space={12}
              value={this.state.code}
              // keyboardAppearance={"dark"}
              secureTextEntry={true}
              size={screenDimensions.width / 9}
              codeLength={6}
              // onChange={() => cons)}
              keyboardType={"number-pad"}
              activeColor={colors.primary}
              inactiveColor={"rgba(0,0,0,0.2)"}
              cellBorderWidth={2}
              inputPosition="left"
              codeInputStyle={{
                backgroundColor: "white",
                color: "#000",
                fontSize: 18,
                fontWeight: "bold",
                borderRadius:4,
                height:48
              }}
              containerStyle={{ flex: 0.3, justifyContent: "center" }}
              onFulfill={code => this.setState({code})}
            />
            </View>
            <View style={{ height: 20 }} />
          </View>

          <View style={{ height: 20 }} />
          {this.renderButton(string("VERIFY"), false, false, colors.primary, 16)}
          <View style={{ height: 20 }} />
          <View style={styles.dontHaveAnAccountView}>
              <View>
                <Text
                  style={[
                    styles.whatisPetPartner,
                    { color: "#455F6C", fontSize: normalize(16) }
                  ]}
                >
                  {string("otpNotReceive")}
                  <Text
                    style={[styles.becomePartner, { color: colors.primary }]}
                    onPress={() => this.resendOtp()}
                  >
                    {" "}
                    {string("resendOTP")}
                  </Text>
                
                </Text>
              </View>
            </View>
        </ScrollView>
      </View>
    );
  }
}
export default Verify;
