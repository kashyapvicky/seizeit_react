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
//Local imports
import backButton from "../../assets/images/ic_back.png";
import TextInputComponent from "../../components/TextInput";
import Text from '../../components/Text'
import {postRequest} from '../../redux/request/Service'

import CustomeButton from "../../components/Button";
import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
//Utilities
import Validation from "../../utilities/validations";
import colors from '../../utilities/config/colors';
import { normalize } from "../../utilities/helpers/normalizeText";

const initialState = {
  email: "",
  emailFieldFocus: false,
  loader: false,
  securePassword: true,
  visible: false
};

class EnterMobile extends Component {
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
  ValidationRules = () => {
    let { phoneNumber } = this.state;
    let { lang } = this.props.screenProps.user;
    debugger;
    return [
      {
        field: phoneNumber,
        name: string("mobilenumber"),
        rules: 'required|numeric|no_space|min:10|max:10',
        lang: lang
      }
    ];
  };
  addPhoneNumber = () => {
    let { netStatus } = this.props.screenProps.user;
    let {setToastMessage,setIndicator} = this.props.screenProps.actions
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
        let { phoneNumber } = this.state
        let {params} = this.props.navigation.state
        let data = {}
        data['mobile'] = phoneNumber
        data['user_id'] = params.user.user
        postRequest('user/varifyregister',data).then((res) => {
          debugger
          if(res){
            this.props.navigation.navigate('Verify',{
              user:params.user,
              mobile:phoneNumber
            })
          }
        }).catch((err) => {

        })

      }
    }
    // if (!this.props.userCommon.netStatus) {
    //     return this.props.actions.showOptionsAlert('Check your internet connection!')
    // }
    // else {
    //     let { email } = this.state
    //     let validation = Validation.validate(this.ValidationRules())
    //     if (validation.length != 0) {
    //         return ToastMessage(validation[0])
    //     }
    //     else {
    //         this.setState({ visible: true })
    //         let data = {}
    //         data['email'] = email.trim()
    //         this.props.loginActions.forgetPassword(data).then((res) => {
    //             if (res && res.status == 200) {
    //                 debugger
    //                 if (res.data.status == 200) {
    //                     debugger
    //                     ToastMessage(res.data.message)
    //                     setTimeout(() => {
    //                         this.props.navigation.navigate('Login')
    //                     }, 2000);
    //                 }
    //                 else {
    //                     debugger
    //                     this.setState({ visible: false })
    //                     ToastMessage(res.data.message)
    //                     // this.props.navigation.navigate('App')
    //                 }
    //             }
    //             else {
    //                 this.setState({ visible: false })
    //             }
    //         }).catch((err) => {
    //             debugger
    //             this.setState({ visible: false })
    //             // alert("Something went wrong")
    //         })
    //     }
    // }
  };

  backToFirst = () => {
    this.props.navigation.navigate("Login");
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
        buttonTextStyle={{fontWeight:imageLeft ?'normal' :'bold'}}
        fontSize={normalize(fontSize)}
        color={transparent ?'#455F6C':'#FFFFFF'}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  pressButton = () => {
    this.addPhoneNumber()
  };
  render() {
    return (
      <View style={{ flex: 1 ,paddingHorizontal:24}}>
        <ScrollView>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.backButtonImage}>
              <Image source={backButton} />
            </View>
          </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.loginText}>{string("mobilenumber")}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.forgetPassMessage}>
                {string("mobileEnterMessage")}
              </Text>
            </View>
            <View style={{marginVertical:32}}>
              {/* <Text></Text> */}
              <TextInputComponent
                user={this.props.user}
                label={string("mobilenumber")}
                inputMenthod={input => {
                  this.emailField = input;
                }}
                placeholder={string("10digitPhone")}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#3B56A6"
                returnKeyType="next"
                keyboardType="phone-pad"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewTextStyle}
                value={this.state.phoneNumber}
                underlineColorAndroid="transparent"
                isFocused={this.state.emailFieldFocus}
                onFocus={() => this.setState({ emailFieldFocus: true })}
                onBlur={() => this.setState({ emailFieldFocus: false })}
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
              />
            </View>
            <View style={{ height: 32 }} />
          {this.renderButton(string('continue'),false,false,colors.primary,16)}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

export default EnterMobile;
