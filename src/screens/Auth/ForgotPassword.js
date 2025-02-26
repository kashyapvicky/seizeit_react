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
    let { lang } = this.props.screenProps.user;
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
    let { netStatus,fcm_id } = this.props.screenProps.user;
    let {setToastMessage,setIndicator} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
        setToastMessage(true,colors.danger)
        return toastRef.show(validation[0].message)
    }
    else {
        let { email } = this.state;
        let data ={}
        data['email'] = email.trim()
        postRequest('user/password-reset',data).then((res) => {
          if(res){
            toastRef.show(res.success)
            this.props.navigation.navigate('Login')
          }
        }).catch((err) => {
          debugger
        })
    }
  };

  backToFirst = () => {
    this.props.navigation.navigate("Login");
  };
  renderButton = (title,transparent,imageLeft,color,fontSize,action) => {
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
        onPress={() => this.pressButton(action)}
        title={title.toUpperCase()}
      />
    );
  };
  pressButton = (title) => {
    if(title =='RESET'){
      this.forgetPassword()
    }
  }
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
          {this.renderButton(string("resetpass"),false,false,colors.primary,16,'RESET')}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

export default ForgetPassword;
