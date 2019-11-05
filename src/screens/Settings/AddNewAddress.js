import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { postRequest, getRequest } from "../../redux/request/Service";

//local imports
import Button from '../../components/Button'
import Text from '../../components/Text'
import styles from '../../styles'
import Header from "../../components/Header";
import { string } from '../../utilities/languages/i18n'
import colors from '../../utilities/config/colors';
import {Images} from '../../utilities/contsants'
import { normalize } from "../../utilities/helpers/normalizeText";
const rightIcon=require('../../assets/images/ic_dd.png')
import Validation from "../../utilities/validations";

import TextInputComponent from "../../components/TextInput";

class AddNewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        accountNumber: "",
        country: "",
        state: '',
        phoneNumber: '',
        loader: false,
        securePassword: true,
        visible: false,
        countries:[],
        refreshToken: null,
        address_id:null
      };
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    if(params && params.address){
      this.fillAddressData(params.address)
    }
  }
  /**************************** Api call  ********************************/
   fillAddressData = (address) =>{
      this.setState({
        full_address:address.full_address,
        is_active:address.is_active,
        state: address.state,
        streetNo: address.street,
        title: address.title,
        landmark:address.landmark,
        phoneNumber:address.phone_number,
        pinCode :address.pincode,
        houseNo :address.flat,
        city:address.city,
        fullName:address.full_address,
        address_id:address.id,
        country:{name:address.country_name,id:address.country_id}
      })
    }
    addAddress = ()=>{
      let {setToastMessage} = this.props.screenProps.actions
      let {toastRef} = this.props.screenProps
      let { country,fullName,phoneNumber,
        state, houseNo,streetNo,landmark,city,pinCode} = this.state;
      let validation = Validation.validate(this.ValidationRules());
      if (validation.length != 0) {
          setToastMessage(true,colors.danger)
          return toastRef.show(validation[0].message)
      }else{
        let data ={}
        data['country_id'] =country.id
        data['state'] =state
        data['phone_number'] =phoneNumber
        data['pincode'] =pinCode
        data['city'] =city
        data['flat'] =houseNo
        data['street'] =streetNo
        data['landmark'] =landmark
        data['phone_number'] =phoneNumber
        data['full_address'] =fullName       
        let apiName =`customer/addaddress`
        if(this.state.address_id){
          data['address_id'] =this.state.address_id   
          apiName=`customer/updateAddress`
        } 
        postRequest(apiName,data).then((res) => {
          debugger
            if (res && res.success) {
              let {params} = this.props.navigation.state
              if(params && params.getAddress){
                  params.getAddress()
              }else if(params && params.from == 'checkout'){
                params.getDefaultAddress()
                // params.updateDefaultAddress(
                //   is_activeAddress.description,
                //   is_activeAddress.id
                // );
              }
              setToastMessage(true,colors.green1)
              toastRef.show(res.success) 
              this.props.navigation.goBack()
            }
           })
        
      
      }
    }
    
  /**************************** Api call End ********************************/
/*****************  Validation  *************/
ValidationRules = () => {
  let { country, state,fullName,phoneNumber,
 houseNo,streetNo,landmark,city,pinCode} = this.state;
 let {name} = country
  let { lang } = this.props.screenProps.user;
  return [
    {
      field: name,
      name: 'Country namme',
      rules: "required",
      lang: lang
    },
    {
      field: state,
      name: 'State name',
      rules: "required|no_space",
      lang: lang
    },
    {
      field: fullName,
      name: 'Full Name',
      rules: "required|no_space",
      lang: lang
    },
    {
      field: phoneNumber,
      name: 'Mobile Number',
      rules: 'required|numeric|no_space|min:10|max:10',
      lang: lang
    },
    {
      field: pinCode,
      name: 'Pincode',
      rules: "required|no_space|numeric",
      lang: lang
    },
    {
      field: city,
      name: 'City name',
      rules: "required|no_space",
      lang: lang
    },
    {
      field: houseNo,
      name: 'House number',
      rules: "required|no_space",
      lang: lang
    },
    {
      field: streetNo,
      name: 'Street number',
      rules: "required|no_space",
      lang: lang
    },
    {
      field: landmark,
      name: 'Landmark',
      rules: "required|no_space",
      lang: lang
    }
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

  pressButton =(title) =>{
    if(title == 'Save new address' || title == 'Update address'){
      this.addAddress()
    }
  }
  updateCountry = (country) =>{
    this.setState({
      country : country
    })
  }
  render() {
    return (
    <View
      // enabled={false}
      style={{ flex: 1 }}
    >
      <Header
        isRightIcon={false}
        headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1,
              height:48,
            }
          ]}
        title={"Add new address"}
        backPress={() => this.props.navigation.goBack()}
      />
       <KeyboardAvoidingView 
       enabled={Platform.OS =='ios' ? true:false}
       behavior={Platform.OS =='ios' ? 'height':false}
       showsVerticalScrollIndicator={false} 
       style={{flex:1}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 25,paddingHorizontal:16,flex:1 }}>
          <TextInputComponent
                 pointerEvents="none"
                onPress={() =>
                  this.props.navigation.navigate('Countries',{
                    updateCountry :(country) => this.updateCountry(country)
                  })
                }
                label={'Select your country'}
                editable={false}
                inputMenthod={input => {
                  this.productCountryRef= input;
                }}
                placeholder={'Country name'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                bankAccount
                textInputStyle={styles.textInputStyle}
                viewTextStyle={styles.viewcardTextStyle}
                 value={this.state.country.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.productCatFieldFocus}
                onFocus={() => this.setState({ productCatFieldFocus: true })}
                onBlur={() => this.setState({ productCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.stateRef.focus();
                }}
              />
            <View style={{ height: 10 }} />
            <TextInputComponent
                label={'State'}
                inputMenthod={input => {
                  this.stateRef = input;
                }}
                bankAccount
                placeholder={'Enter State name'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.state}
                underlineColorAndroid="transparent"
                isFocused={this.state.stateFieldFocus}
                onFocus={() => this.setState({ stateFieldFocus: true })}
                onBlur={() => this.setState({ stateFieldFocus: false })}
                onChangeText={state => this.setState({ state })}
                onSubmitEditing={event => {
                  this.fullRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
             <View style={{ height: 25 }} />
             <View style={{ marginTop: 5 }}>
             <Text p style={{
                fontSize: normalize(15),
                color: "#000000",
                ...styles.text
             } }>
                Full Address Details
             </Text> 
             </View>
             <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.fullRef = input;
                }}
                bankAccount
                placeholder={'Full name'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.fullName}
                underlineColorAndroid="transparent"
                isFocused={this.state.fullNameFieldFocus}
                onFocus={() => this.setState({ fullNameFieldFocus: true })}
                onBlur={() => this.setState({ fullNameFieldFocus: false })}
                onChangeText={fullName => this.setState({ fullName })}
                onSubmitEditing={event => {
                  this.mobileRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
              <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.mobileRef = input;
                }}
                bankAccount
                placeholder={'10 digit mobile'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.phoneNumber}
                underlineColorAndroid="transparent"
                isFocused={this.state.mobileFieldFocus}
                onFocus={() => this.setState({ mobileFieldFocus: true })}
                onBlur={() => this.setState({ mobileFieldFocus: false })}
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                onSubmitEditing={event => {
                  this.pinCodeRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
               <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.pinCodeRef = input;
                }}
                bankAccount
                placeholder={'Pincode'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.pinCode}
                underlineColorAndroid="transparent"
                isFocused={this.state.pinCodeFieldFocus}
                onFocus={() => this.setState({ pinCodeFieldFocus: true })}
                onBlur={() => this.setState({ pinCodeFieldFocus: false })}
                onChangeText={pinCode => this.setState({ pinCode })}
                onSubmitEditing={event => {
                  this.cityRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
               <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.cityRef = input;
                }}
                bankAccount
                placeholder={'City'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.city}
                underlineColorAndroid="transparent"
                isFocused={this.state.cityFieldFocus}
                onFocus={() => this.setState({ cityFieldFocus: true })}
                onBlur={() => this.setState({ cityFieldFocus: false })}
                onChangeText={city => this.setState({ city })}
                onSubmitEditing={event => {
                  this.houseNoRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
                <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.houseNoRef = input;
                }}
                bankAccount
                placeholder={'H.No./Flat/Building'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.houseNo}
                underlineColorAndroid="transparent"
                isFocused={this.state.houseNoFieldFocus}
                onFocus={() => this.setState({ houseNoFieldFocus: true })}
                onBlur={() => this.setState({ houseNoFieldFocus: false })}
                onChangeText={houseNo => this.setState({ houseNo })}
                onSubmitEditing={event => {
                  this.streetRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
                 <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.streetRef = input;
                }}
                bankAccount
                placeholder={'Street No./Colony'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.streetNo}
                underlineColorAndroid="transparent"
                isFocused={this.state.streetNoFieldFocus}
                onFocus={() => this.setState({ streetNoFieldFocus: true })}
                onBlur={() => this.setState({ streetNoFieldFocus: false })}
                onChangeText={streetNo => this.setState({ streetNo })}
                onSubmitEditing={event => {
                  this.landmarkRef.focus();
                }}
                textInputStyle={styles.textInputStyle}
              />
               <TextInputComponent
                label={''}
                inputMenthod={input => {
                  this.landmarkRef = input;
                }}
                bankAccount
                placeholder={'Landmark'}
                placeholderTextColor="#000000"
                selectionColor="#96C50F"
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={styles.viewcardTextStyle}
                value={this.state.landmark}
                underlineColorAndroid="transparent"
                isFocused={this.state.landmarkFieldFocus}
                onFocus={() => this.setState({ landmarkFieldFocus: true })}
                onBlur={() => this.setState({ landmarkFieldFocus: false })}
                onChangeText={landmark => this.setState({ landmark })}
                onSubmitEditing={event => {
                  Keyboard.dismiss()
                }}
                textInputStyle={styles.textInputStyle}
              />
             <View style={{ height: 50 }} />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={{flex:0.12,paddingHorizontal: 16}}>
        {this.renderButton(this.state.address_id ? 'Update address' : 'Save new address')}
      </View>
    </View>
    );
  }
}
export default  AddNewAddress


