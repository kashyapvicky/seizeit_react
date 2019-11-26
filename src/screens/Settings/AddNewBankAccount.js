import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  TextInput,
  Platform,
  KeyboardAvoidingView,

} from 'react-native';
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {getRequest, postRequest} from '../../redux/request/Service'

//local imports
import Button from '../../components/Button'
import Text from '../../components/Text'
import styles from '../../styles'
import Header from "../../components/Header";
import { string } from '../../utilities/languages/i18n'
import colors from '../../utilities/config/colors';
import {Images} from '../../utilities/contsants'
import { normalize } from "../../utilities/helpers/normalizeText";
import TextInputComponent from "../../components/TextInput";

class AddNewBankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        accountNumber: "",
        confirmAccountNumber: "",
        bankAccount:{},
        lists:[{
          name:'ICICI Bank',
          id:1,
        },{
          name:'Punjab National Bank', id:2
        },{
          name:'HDFC Bank',
          id:3
        },{
          name:'State Bank Of India',
          id:4,
        }],
        ifscNumber: '',
        accountHolderName: '',
        loader: false,
        securePassword: true,
        visible: false,
        refreshToken: null
      };
  }
 /******************************  Api Call  **************************/
  addNewBankAccount = () => {
    let { setToastMessage ,setIndicator} = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let {
      accountHolderName,
      bankAccount,
      ifscNumber,
      accountNumber,
      confirmAccountNumber
    } = this.state;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else if (accountNumber != confirmAccountNumber) {
      setToastMessage(true, colors.danger);
      return toastRef.show('The confirm account number and account number must match.');
    }else {
      let data = {};
      data["bank_name"] =bankAccount.name;
      data["account_number"] = accountNumber;
      data["ifsc_code"] = ifscNumber;
  
      let apiName = `vendor/add_bank`;
      postRequest(apiName, data).then(res => {
        if (res && res.success) {
          let { params } = this.props.navigation.state;
          if (params && params.getBankList) {
            params.getBankList();
          } 
          setToastMessage(true, colors.green1);
          toastRef.show(res.success);
          this.props.navigation.goBack();
        }
      });
    }
  };
  pressButton = () =>{
    this.addNewBankAccount()
  }
 /*****************  Validation  *************/
 ValidationRules = () => {
  let {
    accountNumber,
    ifscNumber,
    bankAccount,
    accountHolderName,
    confirmAccountNumber
  } = this.state;
  let { lang } = this.props.screenProps.user;
  return [
    {
      field: bankAccount.name,
      name: "Bank name",
      rules: "required",
      lang: lang
    },
    {
      field: accountNumber,
      name: "IBAN number",
      rules: "required|numeric|max:16",
      lang: lang
    },
    {
      field: confirmAccountNumber,
      name: "Confirm IBAN number",
      rules: "required|numeric|max:16",
      lang: lang
    },
    {
      field: ifscNumber,
      name: "Swift Code",
      rules: "required|no_space",
      lang: lang
    },
    {
      field: accountHolderName,
      name: "Account holder name",
      rules: "required|no_space",
      lang: accountHolderName
    },
  ];
};
  renderButton = (title,transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius:4,
          backgroundColor:transparent ?'transparent':colors.primary
        }}
        fontSize={18}
        color={transparent ?colors.primary:'#FFFFFF'}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header
        isRightIcon={false}
        headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1,
              height: 48,
              
            }
          ]}
        title={"Add new Bank Account"}
        backPress={() => this.props.navigation.goBack()}
      />
        <KeyboardAvoidingView
          enabled={Platform.OS == "ios" ? true : false}
          behavior={Platform.OS == "ios" ? "height" : false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 ,}}
        >
       <ScrollView showsVerticalScrollIndicator={false} 
       style={{flex: 1 }}

       
       >
          <View  style={{ marginTop: 25,paddingHorizontal:16 }}>
          <TextInputComponent
                user={this.props.user}
                label={'Select Bank name'}
                inputMenthod={input => {
                  this.accountNumberRef = input;
                }}
                onPress={() =>
                  this.setState({
                    openDropDownBank: !this.state.openDropDownBank
                  })
                }
                lists={this.state.lists}
                selectItem={(item)=> this.setState({
                  bankAccount:item,
                  openDropDownBank:false
                })}
                editable={false}
                openDropDown={this.state.openDropDownBank}
                bankAccount
                placeholder={'ICICI Bank'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.bankAccount.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.accountFieldFocus}
                onFocus={() => this.setState({ accountFieldFocus: true })}
                onBlur={() => this.setState({ accountFieldFocus: false })}
                rightIcon={require('../../assets/images/ic_dd.png')}

                // onChangeText={accountNumber => this.setState({ accountNumber })}
                onSubmitEditing={event => {
                  this.confirmAccountNumberRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
            <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={'Enter IBAN Number'}
                inputMenthod={input => {
                  this.accountNumberRef = input;
                }}
                bankAccount
                placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.accountNumber}
                underlineColorAndroid="transparent"
                isFocused={this.state.accountFieldFocus}
                onFocus={() => this.setState({ accountFieldFocus: true })}
                onBlur={() => this.setState({ accountFieldFocus: false })}
                onChangeText={accountNumber => this.setState({ accountNumber })}
                onSubmitEditing={event => {
                  this.confirmAccountNumberRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
            <View style={{ height: 10 }} />
            <TextInputComponent
                label={'Re - Enter IBAN Number'}
                inputMenthod={input => {
                  this.confirmAccountNumberRef = input;
                }}
                bankAccount
                placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.confirmAccountNumber}
                underlineColorAndroid="transparent"
                isFocused={this.state.confirmAccountFieldFocus}
                onFocus={() => this.setState({ confirmAccountFieldFocus: true })}
                onBlur={() => this.setState({ confirmAccountFieldFocus: false })}
                onChangeText={confirmAccountNumber => this.setState({ confirmAccountNumber })}
                onSubmitEditing={event => {
                  this.ifscRef.focus();
                }}
                textInputStyle={styles.textInputStyle}

              />
               <View style={{ height: 10 }} />
            <TextInputComponent
                label={'SWIFT Code'}
                inputMenthod={input => {
                  this.ifscRef = input;
                }}
                bankAccount
                placeholder={'ICICI00056845'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.ifscNumber}
                underlineColorAndroid="transparent"
                isFocused={this.state.ifscFieldFocus}
                onFocus={() => this.setState({ ifscFieldFocus: true })}
                onBlur={() => this.setState({ ifscFieldFocus: false })}
                onChangeText={ifscNumber => this.setState({ ifscNumber })}
                onSubmitEditing={event => {
                  this.nameRef.focus();
                }}
                textInputStyle={styles.textInputStyle}

              />
               <View style={{ height: 10 }} />
            <TextInputComponent
                
                label={'Name of the Account holder'}
                inputMenthod={input => {
                  this.nameRef = input;
                }}
                placeholder={'Vikram Bawa'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                bankAccount
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                textInputStyle={styles.textInputStyle}
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.accountHolderName}
                underlineColorAndroid="transparent"
                isFocused={this.state.nameFieldFocus}
                onFocus={() => this.setState({ nameFieldFocus: true })}
                onBlur={() => this.setState({ nameFieldFocus: false })}
                onChangeText={accountHolderName => this.setState({ accountHolderName })}
                onSubmitEditing={event => {
                    Keyboard.dismiss()
                }}
              />
          </View>
         
        </ScrollView>
        </KeyboardAvoidingView>
        <View style={{flex:0.15,paddingHorizontal: 16}}>
        {this.renderButton('Save new Bank Account')}
      </View>
    </View>
    );
  }
}
export default  AddNewBankAccount


