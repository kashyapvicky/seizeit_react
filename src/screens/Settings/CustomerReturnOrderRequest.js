import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard
} from "react-native";

//local imports
import { postRequest, getRequest } from "../../redux/request/Service";

import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import CustomerInfo from "./Templates/CustomerInfo";
import InvoiceInfo from "./Templates/InvoiceInfo";
import OrderListItem from "./Templates/OrderListItem";
import TextInputComponent from "../../components/TextInput";
import Validation from "../../utilities/validations";

class CustomerReturnOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      return_title: "",
      return_description: "",
      products: []
    };
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && params.order) {
      this.setState({
        order: params.order,
        products: [params.product]
      });
    }
  }
  /*****************  Validation  *************/
  ValidationRules = () => {
    let { return_title, return_description } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: return_title,
        name: "Title",
        rules: "required|no_space",
        lang: lang
      },
      {
        field: return_description,
        name: "Comment",
        rules: "required|no_space",
        lang: lang
      }
    ];
  };

  //***************** Api Function **********************************/
  // Change Order Status
  changeOrderStatus = (orderId, status) => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { return_title, return_description } = this.state;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else {
      let data = {};
      data["order_detail_id"] = orderId;
      data["return_title"] = return_title;
      data["return_description"] = return_description;
      data["status"] = status;
        this.props.navigation.navigate('Address',{
          from:'Return',
          data:data,
        })
    }
  };
  //***************** Api Function **********************************/
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          borderColor: transparent ? colors.primary : colors.transparent,
          borderRadius: 4,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={normalize(14)}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = (title) => {
    if(title == 'CONTINUE'){
       this.changeReturnRequest()
    }
  
  };
  changeReturnRequest = () =>{
      let { params } = this.props.navigation.state;
      if (params && params.product) {
        let { id } = params.product;
        this.changeOrderStatus(id,6);
      }
  }
  renderOrdersItem = () => {
    return (
      <View style={{ flex: 1, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderOrderInfo}
        />
      </View>
    );
  };

  // Order Info
  renderOrderInfo = ({ item, index }) => {
    return (
      <OrderListItem
        item={item}
        index={index}
        fromReturn={true}
        renderButton={(title, transparent) =>
          this.renderButton(title, transparent)
        }
      />
    );
  };
  renderReasonInput = () => {
    let textInputStyle = {
      ...styles.textInputStyle,
      fontSize: normalize(14)
    };
    return (
      <View style={{ marginTop: 25 }}>
        <TextInputComponent
          label={"Why are you returning this item?"}
          inputMenthod={input => {
            this.accountNumberRef = input;
          }}
          bankAccount
          placeholder={"Color fainted"}
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
          onChangeText={return_title => this.setState({ return_title })}
          onSubmitEditing={event => {
            this.confirmAccountNumberRef.focus();
          }}
          textInputStyle={textInputStyle}
        />
        <View style={{ height: 10 }} />
        <TextInputComponent
          label={"Comments"}
          inputMenthod={input => {
            this.confirmAccountNumberRef = input;
          }}
          placeholder={"Describe the problem here…"}
          placeholderTextColor="rgba(62,62,62,0.55)"
          selectionColor="#96C50F"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          multiline={true}
          viewTextStyle={[styles.viewcardTextStyle, { height: 100 }]}
          value={this.state.confirmAccountNumber}
          underlineColorAndroid="transparent"
          isFocused={this.state.confirmAccountFieldFocus}
          onFocus={() => this.setState({ confirmAccountFieldFocus: true })}
          onBlur={() => this.setState({ confirmAccountFieldFocus: false })}
          onChangeText={return_description =>
            this.setState({ return_description })
          }
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
          textInputStyle={textInputStyle}
          bankAccount
        />
        <View style={{ height: 10 }} />
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={Images.close_g}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          hideLeftIcon={true}
          title={"Return Order"}
          onRightPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {this.renderOrdersItem()}
          {this.renderReasonInput()}
        </ScrollView>
        <View
          style={{
            justifyContent: "flex-end",
            backgroundColor: colors.primary,
            paddingVertical: 8
          }}
        >
          {this.renderButton("CONTINUE")}
        </View>
      </View>
    );
  }
}
export default CustomerReturnOrder;
