import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";

//local imports
import { postRequest, getRequest } from "../../redux/request/Service";
import { ProductPlaceholder } from "./Templates/PlaceHolderProduct";

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
const { width, height } = Dimensions.get("window");

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      notes: "",
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
      options: [
        {
          name: "Debit/Credit",
          description: "",
          icon: false,
          title: "CARDS"
        },
        {
          name: "Cash on delivery",
          description:
            "Please keep exact change handy to help you serve us better",
          icon: false,
          title: "COD"
        },
        {
          name: "Bank transfer",
          description: string("youCreditsAmount"),
          icon: false,
          title: "BANK"
        }
      ],
      cartItems: [],

      user: {},
      delivery: 0,
      totalAmount: 0,
      promoAmount:0,
      promoCode:null,
      address: ""
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
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
        subTotal: this.getCartTotal(carts),
        totalAmount: this.getCartTotal(carts) + this.state.delivery
      });
    }
    this.getDefaultAddress();
  }
  updatePersonalDetail = user => {
    this.setState({
      user: { ...this.state.user, ...user }
    });
  };

  /*************************************APi Call  *********************************************/
  saveOrderApi = () => {
    let { setIndicator, setToastMessage } = this.props.screenProps.actions;
    let { removeCartSuccess } = this.props.screenProps.productActions;
    let selectedPaymentType = this.state.options.filter(x => x.icon);
    let { toastRef } = this.props.screenProps;
    if (!this.state.address_id) {
      setToastMessage(true, colors.danger);
      return toastRef.show("Please add address first");
    } else if (selectedPaymentType && selectedPaymentType.length < 1) {
      setToastMessage(true, colors.danger);
      return toastRef.show("Please select payment type");
    } else {
      let data = {};
      data["address_id"] = this.state.address_id;
      data["net_paid"] = this.state.totalAmount;
      data["order_amount"] = this.state.totalAmount;
      data["payment_mode"] = 1;
      data["notes"] = this.state.notes;
      data["no_of_itmes"] = this.state.cartItems.length;
      data["transaction_id"] = "COD";
      let carts = this.state.cartItems.map(x => {
        return {
          product_id: x.id,
          amount: x.price,
          vendor_id: x.vendor_id,
          quantity: 1
        };
      });
      data["product_detail"] = carts;
      postRequest(`order/save_order`, data)
        .then(res => {
          if (res && res.success) {
            setToastMessage(true, colors.green1);
            toastRef.show(res.success);
            removeCartSuccess();
            this.props.navigation.navigate("OrderSuccessFull", {
              orderArrivedDate: res.data.date
            });
          }
          setIndicator(false);
        })
        .catch(err => {});
    }
  };
  // Get Cart Total
  getCartTotal = carts => {
    if (carts && carts.length > 0) {
      let totalBagAmount = carts.reduce((cnt, cur, currentIndex) => {
        return Number(cnt) + Number(cur.price);
      }, 0);
      return totalBagAmount;
    } else {
      return 0;
    }
  };
  getDefaultAddress = () => {
    let { setIndicator } = this.props.screenProps.actions;
    getRequest("customer/defaultAddress")
      .then(res => {
        debugger;
        if (res && res.success.length > 0) {
          debugger;
          let addArray = res.success.map(x => {
            return {
              title: x.full_address,
              id: x.address_id,
              is_active: x.is_active,
              address: `${x.flat},${x.city},${x.landmark}.${x.state} ${x.country_name} ${x.pincode}`
            };
          })[0];
          this.setState({
            address: addArray.address,
            address_id: addArray.id
          });
        } else {
          //  let {currentLocation} = this.props.screenProps.user
          //  this.setState({
          //    address:currentLocation.address
          //  })
        }
        // setIndicator(false);
      })
      .catch(err => {});
  };

  updateDefaultAddress = (address, address_id) => {
    this.setState({
      address: address,
      address_id: address_id
    });
  };
  setPromoAmount = (coupan, amount) => {
    let { carts } = this.props.screenProps.product;

    this.setState(
      {
        promoCode: coupan,
        promoAmount: amount
      },
      () => {
        if (Number(amount) >= Number(coupan.max_discount)) {
          this.setState({
            promoAmount : Number(coupan.max_discount),
            totalAmount: (this.getCartTotal(carts) + this.state.delivery)-Number(coupan.max_discount) 

          })
        }else{
          this.setState({
            totalAmount: (this.getCartTotal(carts) + this.state.delivery)-Number(amount) 
          })
        }
      }
    );
  };
  applyPromoCode = coupan => {
    let { subTotal, totalAmount, delivery } = this.state;
    if (coupan && coupan.discount_type == 1) {
      this.setPromoAmount(coupan, coupan.discount);
    } else if (coupan && coupan.discount_type == 2) {
      let promoAmount = (Number(subTotal) * Number(coupan.discount)) / 100;
      this.setPromoAmount(coupan, promoAmount);
    }
  };
  getPromoCodeAmount = coupan => {
    let { subTotal, totalAmount, delivery } = this.state;

    if (Number(subTotal) >= Number(item.minimum_order)) {
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.applyPromoCode
      ) {
        this.checkPromoCode(item.coupan_code);
      }
    } else {
    }
  };
  addButtonPress = title => {
    if (title == "Add Promo code") {
      let { subTotal, totalAmount, delivery } = this.state;

      this.props.navigation.navigate("Promotions", {
        headerTitle: "Apply Promotions",
        bagTotal: subTotal,
        applyPromoCode: coupan_code => this.applyPromoCode(coupan_code)
      });
    }
  };
  selectedPaymentType = item => {
    this.setState({
      options: this.state.options.map((res, i) => {
        if (res.title == item.title) {
          return {
            ...res,
            icon: true
          };
        } else {
          return {
            ...res,
            icon: false
          };
        }
      })
    });
  };

  /***********************************APi Call  *********************************************/
  render() {
    let { carts } = this.props.screenProps.product;
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
        {carts && carts.length > 0 ? (
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
        ) : (
          <View
            style={{
              flex: 0.5,
              paddingHorizontal: 16,
              justifyContent: "center"
            }}
          >
            <ProductPlaceholder
              array={[1, 2]}
              message={
                this.props.screenProps.loader ? "" : "Your cart is Empty "
              }
              loader={this.loaderComponent}
            />
          </View>
        )}

        {carts && carts.length > 0 && this.renderBotttomButton()}
      </View>
    );
  }
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
      color: colors.primary,
      height: 95
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
        fromNotes
        viewTextStyle={[
          styles.viewcardTextStyle,
          {
            backgroundColor: "#F0F2FA",
            height: 100,
            paddingHorizontal: 8,
            justifyContent: "flex-start"
          }
        ]}
        value={this.state.notes}
        underlineColorAndroid="transparent"
        isFocused={this.state.confirmAccountFieldFocus}
        onFocus={() => this.setState({ confirmAccountFieldFocus: true })}
        onBlur={() => this.setState({ confirmAccountFieldFocus: false })}
        onChangeText={notes => this.setState({ notes })}
        onSubmitEditing={event => {
          // Keyboard.dismiss()
        }}
        textInputStyle={[textInputStyle, { paddingTop: 8 }]}
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

  renderPaymentMethod = () => {
    return (
      <View style={[{ paddingBottom: 8 }]}>
        {this.state.options.map((option, i) => {
          return (
            <View
              key={i + "payment"}
              style={{ flexDirection: "row", paddingVertical: 8 }}
            >
              <TouchableOpacity
                onPress={() => this.selectedPaymentType(option)}
                style={{
                  flex: 0.1,
                  paddingLeft: 0,
                  paddingTop: 6,
                  paddingRight: 8
                }}
              >
                {option.icon ? (
                  <Image
                    source={Images.check}
                    style={{ alignSelf: "center", height: 18, width: 18 }}
                  />
                ) : (
                  <Image
                    source={Images.round}
                    style={{ alignSelf: "center", height: 18, width: 18 }}
                  />
                )}
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text
                  p
                  style={{
                    color: "#000000",
                    fontSize: normalize(16)
                    // fontWeight: "bold"
                  }}
                >
                  {`${option.name}`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  renderScrollableTab = () => {
    return (
      <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
        <RenderLabel label={"Payment"} />
        <View style={{ height: 20 }}></View>
        {this.renderPaymentMethod()}
        {/* <ScrollableTabView
          tabs={this.state.tabs}
          renderListTabs={(item, index) =>
            this.renderPaymentSelectSection(item, index)
          }
        /> */}
      </View>
    );
  };

  addButton = title => {
    return (
      <TouchableOpacity
        style={{ paddingTop: 16 }}
        onPress={() => this.addButtonPress(title)}
      >
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
        <CartItem {...this.props} />

        {this.renderCommentInput()}
      </View>
    );
  };

  renderSectionOne = () => {
    return (
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <RenderLabel
          label={"Personal details"}
          rightLabel={"Change"}
          onPressChange={() =>
            this.props.navigation.navigate("EditProfile", {
              updatePersonalDetail: user => this.updatePersonalDetail(user)
            })
          }
        />
        {this.renderPersonalDetail()}
      </View>
    );
  };
  onPressChange = () => {
    if (this.state.address_id) {
      this.props.navigation.navigate("Address", {
        updateDefaultAddress: (address, id) =>
          this.updateDefaultAddress(address, id),
        address_id: this.state.address_id,
        fromCheckout: true
      });
    } else {
      this.props.navigation.navigate("AddNewAddress", {
        from: "checkout",
        getDefaultAddress: () => this.getDefaultAddress(),
        updateDefaultAddress: (address, id) =>
          this.updateDefaultAddress(address, id)
      });
    }
  };
  renderSectionTwo = () => {
    return (
      <View style={{ paddingHorizontal: 24, flex: 1, paddingVertical: 8 }}>
        <RenderLabel
          label={"Delivering to"}
          rightLabel={this.state.address_id ? "Change" : "Add"}
          onPressChange={() => this.onPressChange()}
        />

        {/* {this.addButton("Add Address")} */}
        <View style={{ paddingTop: 16 }}>
          {!this.state.address ? (
            <Text p style={[styles.subLable]}>
              {"No default address found ."}
            </Text>
          ) : (
            <Text p style={[styles.subLable]}>
              {this.state.address}
            </Text>
          )}
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
    let { subTotal, totalAmount, delivery ,promoCode,promoAmount} = this.state;
    let order = {
      delivery_charge: delivery,
      amount: totalAmount,
      net_paid: 0
    };
    return (
      <View>
        <InvoiceInfo fromCheckout={true} order={order} subTotal={subTotal} 
         promoAmount={promoAmount}
         promoCode={promoCode}
        />
        <View style={{ height: 10 }} />
        <View style={{ paddingHorizontal: 24 }}>
          {this.addButton("Add Promo code")}
        </View>
        <View style={{ height: 10 }} />
      </View>
    );
  };
  renderBotttomButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.saveOrderApi()}
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
}
export default Checkout;
export const cartStyle = StyleSheet.create({});
