import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";

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
import ScrollableTabView from "../../components/ScrollableTab";
import Listitems from "./Templates/ListItem";
import RenderLabel from "../Settings/Templates/Label";
import InvoiceInfo from "../Settings/Templates/InvoiceInfo";
import TextInputComponent from "../../components/TextInput";
import CartItem from "./Templates/CartItem";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      tabs: [
        {
          title: "Debit/Credit"
        },
        {
          title: "Cash on delivery"
        },
        {
          title: "Bank transfer"
        }
      ],
      cartItems: [],
      user: {},
      delivery:10,
      totalAmount:0,
      address:''
    };
  }
  componentDidMount() {
    let { user } = this.props.screenProps.user;
    let { carts } = this.props.screenProps.product;
    if (user) {
      this.setState({
        user: {
          name: user.name,
          phone_code: user.phone_code,
          phone: user.phone
        },
        cartItems: carts,
        subTotal:this.getCartTotal(carts),
        totalAmount:this.getCartTotal(carts)+this.state.delivery
      });
    }
    this.getDefaultAddress()
    
  }
  updatePersonalDetail = (user)=>{
    this.setState({
      user : {...this.state.user,...user}
    })
  }
/*************************************APi Call  *********************************************/
  getCartTotal = (carts) =>{

    if(carts && carts.length > 0){
      let totalBagAmount = carts.reduce((cnt, cur, currentIndex) => {
        return Number(cnt) + Number(cur.price)
       },0)
       return totalBagAmount
    }else{
      return 0
    }
  }
  getDefaultAddress = () =>{
    let { setIndicator } = this.props.screenProps.actions;
    getRequest("customer/defaultAddress")
      .then(res => {
        debugger
        if (res && res.success.length > 0) {
          debugger
          let addArray = res.success.map(x=>{
            return {
              title:x.full_address,
              id:x.address_id,
              is_active:x.is_active,
              address:`${x.flat},${x.city},${x.landmark}.${x.state} ${x.country_name} ${x.pincode}`,
            }
          })[0]
          this.setState({
            address:addArray.address,
            address_id:addArray.id
          });
        }else{
           let {currentLocation} = this.props.screenProps.user
           this.setState({
             address:currentLocation.address
           })

        }
        // setIndicator(false);
      })
      .catch(err => {});
  }
  updateDefaultAddress = (address,address_id) => {
    debugger
    if(address){
      this.setState({
        address : address,
        address_id:address_id
      })
    }else{
      let {currentLocation} = this.props.screenProps.user
      this.setState({
        address : currentLocation.address
      })
    }
    
  }
/***********************************APi Call  *********************************************/

  pressButton = () => {};
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          //   borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        buttonTextStyle={{ fontSize: normalize(14), fontWeight: "bold" }}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };

  renderCommentInput = () => {
    let textInputStyle = {
      ...styles.textInputStyle,
      fontSize: normalize(14),
      color: colors.primary
    };
    return (
      <TextInputComponent
        label={""}
        inputMenthod={input => {
          this.confirmAccountNumberRef = input;
        }}
        placeholder={"Add note if any..."}
        placeholderTextColor={colors.primary}
        selectionColor="#96C50F"
        returnKeyType="next"
        autoCorrect={false}
        autoCapitalize="none"
        blurOnSubmit={false}
        multiline={true}
        editable={true}
        viewTextStyle={[
          styles.viewcardTextStyle,
          { height: 100, backgroundColor: "#F0F2FA", paddingTop: 16 }
        ]}
        value={this.state.confirmAccountNumber}
        underlineColorAndroid="transparent"
        isFocused={this.state.confirmAccountFieldFocus}
        onFocus={() => this.setState({ confirmAccountFieldFocus: true })}
        onBlur={() => this.setState({ confirmAccountFieldFocus: false })}
        onChangeText={confirmAccountNumber =>
          this.setState({ confirmAccountNumber })
        }
        onSubmitEditing={event => {
          // Keyboard.dismiss()
        }}
        textInputStyle={textInputStyle}
        bankAccount
      />
    );
  };
  renderPaymentSelectSection = (item, index) => {
    return (
      <View key={index} tabLabel={item.title} style={{ paddingTop: 16 }}>
           <RenderLabel label={"Saved cards"} />
      </View>
    );
  };
  renderScrollableTab = () => {
    return (
      <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
        <RenderLabel label={"Payment"} />
        <ScrollableTabView
          tabs={this.state.tabs}
          renderListTabs={(item, index) =>
            this.renderPaymentSelectSection(item, index)
          }
        />
      </View>
    );
  };
  addButton = title => {
    return (
      <TouchableOpacity style={{ paddingTop: 16, paddingHorizontal: 24 }}>
        <Text h5 style={{ color: colors.primary, fontSize: normalize(14) }}>
          +{title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };
  renderProductsList = (item, index) => {
    return (
      <View
        key={index}
        style={{ flex: 1, paddingHorizontal: 24, marginTop: 8 }}
      >
        <RenderLabel label={"Items"} />
        <View style={{ height: 10 }} />
        <CartItem 
         {...this.props}

        />
       
        {this.renderCommentInput()}
      </View>
    );
  };

  renderSectionOne = () => {
    return (
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <RenderLabel label={"Personal details"} rightLabel={"Change"} 
            onPressChange={() => this.props.navigation.navigate('EditProfile',{
              updatePersonalDetail : (user) => this.updatePersonalDetail(user)
            })}
        />
        {this.renderPersonalDetail()}
      </View>
    );
  };
  renderSectionTwo = () => {
    return (
      <View style={{ paddingHorizontal: 24, flex: 1, paddingVertical: 8 }}>
        <RenderLabel label={"Delivering to"} rightLabel={"Change"} 
          onPressChange={() => this.props.navigation.navigate('Address',{
            updateDefaultAddress : (address,id) => this.updateDefaultAddress(address,id),
            address_id:this.state.address_id,
            fromCheckout:true
          })}
        />
        <View style={{ paddingTop: 16 }}>
          <Text p style={[styles.subLable]}>
           {this.state.address}
          </Text>
        </View>
      </View>
    );
  };
  renderPersonalDetail = () => {
    let { name, phone_code, phone } = this.state.user;
    return (
      <View style={{ flex: 1, paddingVertical: 16 }}>
        <View>
          <Text h5 style={[styles.pLable]}>
            Name
          </Text>
          <Text p style={[styles.subLable]}>
            {name}
          </Text>
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text h5 style={[styles.pLable]}>
            Phone Number
          </Text>
          <Text p style={[styles.subLable]}>{`${phone_code} ${phone}`}</Text>
        </View>
      </View>
    );
  };
  renderOrderInvoiceInfo = () => {
    let{subTotal,totalAmount,delivery} = this.state
    return (
      <View>
        <InvoiceInfo fromCheckout={true} 
         subTotal ={subTotal}
         totalAmount={totalAmount}
         delivery= {delivery}
        />
        <View style={{ height: 10 }} />
        {this.addButton("Add Promo code")}
        <View style={{ height: 10 }} />
      </View>
    );
  };
  renderBotttomButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("OrderSuccessFull")}
        style={{
          flex: 0.12,
          justifyContent: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: colors.primary
        }}
      >
        <View
          style={{
            flex: 0.55,
            justifyContent: "center",
            paddingHorizontal: 16
          }}
        >
          <Text
            p
            style={{
              fontSize: normalize(20),
              fontWeight: "bold",
              color: "white"
            }}
          >
            {`$${this.state.totalAmount.toFixed(2)}`}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            p
            style={{
              fontSize: normalize(16),
              fontWeight: "bold",
              color: "white"
            }}
          >
            PLACE ORDER{" "}
          </Text>
          <View>
            <Icons
              name={"ios-arrow-forward"}
              color={"#FFFFFF"}
              size={20}
              style={{ alignSelf: "center" }}
            />
          </View>
        </View>
      </TouchableOpacity>
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
          title={"Checkout"}
          onRightPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{ flex: 1, paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {this.renderSectionOne()}
          <View style={styles.borderSalesReport} />
          {this.renderSectionTwo()}
          <View style={styles.borderSalesReport} />
          {this.renderProductsList()}
          <View style={styles.borderSalesReport} />
          {this.renderOrderInvoiceInfo()}
          <View style={styles.borderSalesReport} />
          {this.renderScrollableTab()}
          <View style={{ height: 48 }} />
        </ScrollView>

        {this.renderBotttomButton()}
      </View>
    );
  }
}
export default Checkout;
