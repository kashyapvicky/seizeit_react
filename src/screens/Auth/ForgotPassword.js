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

class ForgetPassword extends Component {
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
    let { email } = this.state;
    let { lang } = this.props.userCommon;
    debugger;
    return [
      {
        field: email.trim(),
        name: string("email"),
        rules: "required|email|no_space",
        lang: lang
      }
    ];
  };
  forgetPassword = () => {
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
  render() {
    return (
      <View style={{ flex: 1,paddingHorizontal:24 }}>
        <ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.backButtonImage}>
              <Image source={backButton} />
            </View>
          </TouchableOpacity>
          <View>
          <View style={{ marginTop: 20 }}>
              <Text style={styles.loginText}>{string("forgotpass2")}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.forgetPassMessage}>
                {string("forgotpassmsg")}
              </Text>
            </View>

            <View style={{ height: 20 }} />

            <View>
              {/* <Text></Text> */}
              <TextInputComponent
                user={this.props.user}
                label={string("email")}
                inputMenthod={input => {
                  this.emailField = input;
                }}
                placeholder={string("enteryouremail")}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#3B56A6"
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
                  Keyboard.dismiss();
                }}
              />
            </View>
            <View style={{ height: 20 }} />
          </View>
          <View style={{ height: 20 }} />
          {this.renderButton(string("resetpass"),false,false,colors.primary,16)}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

export default ForgetPassword;
