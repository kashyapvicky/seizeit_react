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
  TextInput

} from 'react-native';
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        ifscNumber: '',
        name: '',
        loader: false,
        securePassword: true,
        visible: false,
        refreshToken: null
      };
  }

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

            }
          ]}
        title={"Add new Bank Account"}
        backPress={() => this.props.navigation.goBack()}
      />
       <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View  style={{ marginTop: 25,paddingHorizontal:16 }}>
              <TextInputComponent
                user={this.props.user}
                label={'Enter Account Number'}
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
                label={'Re - Enter Account Number'}
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
                label={'IFSC Code'}
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
                value={this.state.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.nameFieldFocus}
                onFocus={() => this.setState({ nameFieldFocus: true })}
                onBlur={() => this.setState({ nameFieldFocus: false })}
                onChangeText={name => this.setState({ name })}
                onSubmitEditing={event => {
                    Keyboard.dismiss()
                }}
              />
          </View>
         
        </ScrollView>
        <View style={{flex:0.15,paddingHorizontal: 16}}>
        {this.renderButton('Save new Bank Account')}
      </View>
    </View>
    );
  }
}
export default  AddNewBankAccount


