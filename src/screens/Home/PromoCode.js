import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Keyboard,
  TextInput,
  Dimensions,
  StyleSheet
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import TextInputComponent from "../../components/TextInput";

import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import { postRequest, getRequest } from "../../redux/request/Service";
import { OrderPlaceholder } from "../Settings/Templates/OrderPlaceHolder";

class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPromotion: false,
      title: "Promotions",
      promoCode: null,
      loader: false,
      bagTotal: 0,
      refreshing: false,
      coupans: []
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    this.getCoupans();
    let { params } = this.props.navigation.state;
    if (params && params.bagTotal) {
      let { headerTitle, bagTotal } = this.props.navigation.state.params;
      this.setState({
        title: headerTitle,
        bagTotal: bagTotal
      });
    }
  }
  /******************** Api Function  *****************/
  getCoupans = () => {
    getRequest(`order/get_coupans`)
      .then(res => {
        debugger;
        if (res && res.success && res.success.length > 0) {
          this.setState({
            coupans: res.success,
            isRefreshing: false
          });
        } else {
          this.setState({
            isRefreshing: false,
            coupans: []
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  rightPress = () => {
    this.setState({
      addPromotion: true,
      title: "Add Promotions"
    });
  };
  checkPromoCode = coupon_code => {
    //this.props.navigation.goBack();
    let { setToastMessage,setIndicator } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let data = {};
    data["coupan_code"] =coupon_code;
    postRequest(`order/validate_coupan`, data)
      .then(res => {
        if(res && res.data && res.data.length > 0){
          setToastMessage(true,colors.primary)
          toastRef.show(res.success)
          let {params} = this.props.navigation.state
          if (params && params.applyPromoCode) {
                 let {applyPromoCode} = this.props.navigation.state.params
                 applyPromoCode(res.data[0])
                 this.props.navigation.goBack()
        
              }
        }
        setIndicator(false);
      })
      .catch(err => {});
    // let { user, lang } = this.props.user;
    //     let data = {}
    //     data['locale'] = lang;
    //     data['coupon_code'] = coupon_code
    //     data['bag_total'] = this.state.bagTotal
    // this.props.productDispatch.postRequest(data, 'check_coupons').then((res) => {
    //     if (res && res.status == 401) {
    //         res.data.msg ? userActions.showOptionsAlert(res.data.msg, this.props.actions.logOutUser) : null
    //     } else if (res && res.status == 400) {
    //         ToastShow(res.data.msg)
    //     } else if (res && res.statuscode == 200) {
    //         if (this.props.navigation.state.params && this.props.navigation.state.params.applyPromoCode) {
    //             debugger
    //             this.props.navigation.state.params.applyPromoCode(res.data.coupon)
    //             this.props.navigation.goBack()
    //             ToastShow(res.msg)

    //         }
    //     } else {
    //         ToastShow(res.msg)
    //     }
    // }).catch((err) => {
    //     this.setState({ loader: false, refreshing: false })
    // })
    //}
  };
  // Apply coupan function
  applyPromo = item => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
     let { subTotal, totalAmount, delivery } = this.state;
    if (Number(this.state.bagTotal) >= Number(item.minimum_order)) {
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.applyPromoCode
      ) {
        this.checkPromoCode(item.coupan_code);
      }
    } else {
      setToastMessage(true, colors.danger);
      return toastRef.show(
        `${string("Ordervaluemustbegreaterthen")} ${item.minimum_order}`
      );
    }
  };
  addPromoSubmit = () => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    if (this.state.promoCode) {
      this.checkPromoCode(this.state.promoCode);
    } else {
      setToastMessage(true, colors.danger);
      return toastRef.show(`${string("Pleadseenterpromocodefirst")}`);
    }
  };
  // Back Press handle
  backPressButton = () => {
    if (this.state.addPromotion) {
      if (this.props.navigation.state.params) {
        this.setState({
          title: "Apply Promotions",
          addPromotion: false
        });
      } else {
        this.setState({
          title: "Promotions",
          addPromotion: false
        });
      }
    } else {
      this.props.navigation.goBack();
    }
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
              shadowRadius: 0.1
            }
          ]}
          //   hideLeftIcon={true}
          isRightText={this.state.addPromotion ? null : "Add Promo"}
          title={this.state.title}
          onRightPress={() => {
            this.rightPress();
          }}
          backPress={() => this.backPressButton()}
        />
        <View style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ height: 16 }}></View>
          {this.state.addPromotion
            ? this.renderAddPromoText()
            : this.renderProductsList()}
        </View>
      </View>
    );
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={normalize(18)}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.addPromoSubmit(title)}
        title={title}
      />
    );
  };
  renderItems = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInDown" duration={300}>
        <View
          style={{
            marginVertical: 8,
            // paddingHorizontal: 16,
            borderRadius: 4,
            borderBottomWidth: 1,
            borderColor:
              Platform.OS == "ios" ? "rgba(0,0,0,0.11)" : "transparent",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.01,
            shadowColor: "rgba(0,0,0,0.11)",
            shadowRadius: 1,
            elevation: 1
          }}
        >
          <View
            style={[promotionStyle.row, { justifyContent: "space-between" }]}
          >
            <View
              style={{
                height: 32,
                alignItems: "center",
                flex: 0.5,
                borderRadius: 4,
                paddingHorizontal: 16,
                justifyContent: "center",
                backgroundColor: "rgba(117,177,82,0.2)"
              }}
            >
              <Text
                p
                style={[
                  //   styles.bold,
                  {
                    color: "#75B152",
                    fontWeight: "400"
                  }
                ]}
              >
                {item.coupan_code}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.applyPromo(item)}
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flex: 0.6
              }}
            >
              <Text p style={[styles.text, { color: "#FF7E5D" }]}>
                {"Apply"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingBottom: 16 }}>
            <View style={[promotionStyle.columnStart]}>
              <Text
                p
                style={[styles.bold, { color: "#3E3E3E", fontWeight: "600" }]}
              >
                {`Get ${item.discount_type == 1 ? '$':''}${item.discount}${item.discount_type == 2 ? '%' :''} discount`}
              </Text>

              <Text
                p
                style={[
                  styles.text,
                  {
                    color: "rgba(62,62,62,0.55)",
                    fontWeight: "300",
                    lineHeight: 30
                  }
                ]}
              >
                {`${item.offer_name}`}
              </Text>
            </View>

            <View style={[promotionStyle.columnStart, { paddingTop: 4 }]}>
              <Text
                p
                style={[
                  styles.text,
                  {
                    color: "#3E3E3E",
                    fontWeight: "300"
                  }
                ]}
              >
                {`Valid till ${item.valid_upto}`}
              </Text>
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  };

  renderAddPromoText = () => {
    return (
      <View style={{ marginTop: 20, flex: 1, paddingHorizontal: 16 }}>
        <TextInputComponent
          user={this.props.user}
          // label={"Product Title"}
          inputMenthod={input => {
            this.productTitleRef = input;
          }}
          placeholder={"Enter promo code"}
          placeholderTextColor="rgba(62,62,62,0.55)"
          selectionColor="#96C50F"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          textInputStyle={[styles.addProductTextInputStyle]}
          viewTextStyle={styles.addProductTextInputView}
          value={this.state.promoCode}
          underlineColorAndroid="transparent"
          isFocused={this.state.promoCodeFieldFocus}
          onFocus={() => this.setState({ promoCodeFieldFocus: true })}
          onBlur={() => this.setState({ promoCodeFieldFocus: false })}
          onChangeText={promoCode => this.setState({ promoCode })}
          onSubmitEditing={event => {
            this.productDesRef.focus();
          }}
          // textInputStyle={styles.textInputStyle}
        />
        {this.state.promoCode ? (
          <View
            style={{ flex: 0.2, marginTop: "25%", justifyContent: "flex-end" }}
          >
            {this.renderButton("Apply")}
          </View>
        ) : null}
      </View>
    );
  };
  renderProductsList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={this.state.coupans}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={
            <OrderPlaceholder
              array={[1, 2, 3, 4]}
              message={this.props.screenProps.loader ? "" : "No data found "}
              loader={this.loaderComponent}
            />
          }
        />
      </View>
    );
  };
}
export default Promotions;
const promotionStyle = StyleSheet.create({
  row: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row"
  },
  columnStart: {
    alignItems: "flex-start",
    flex: 0.1,
    paddingHorizontal: 16,
    justifyContent: "flex-start"
  }
});
