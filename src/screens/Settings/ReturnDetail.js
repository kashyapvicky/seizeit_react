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
import {
  DrawerActions,
  NavigationActions,
  StackActions
} from "react-navigation";

//local imports
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
import OrderCommonItem from "../Dashboard/Templates/OrderCommonItem";

class ReturnDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      order: this.props.navigation.state.params.order
    };
  }
  pressButton = () => {
    //;
    this.resetStack()
    setTimeout(()=>this.props.navigation.navigate("Home"),0)
  };
  resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "CardStack" }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.dismiss()
  };
  handleBackPress = () => {
    this.resetStack()
    setTimeout(()=>this.props.navigation.navigate("Home"),0)
  };
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
        fontSize={normalize(16)}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
 
  renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={9}
        index={index}
        style={[
          styles.shadow,

          {
            backgroundColor: "white",
            paddingVertical: 12,
            backgroundColor: "white",
            paddingVertical: 16,
            marginVertical: 8,
            shadowRadius: 0.1
          }
        ]}
      >
        <OrderCommonItem item={this.state.order} />
      </TouchableOpacity>
    );
  };
  renderOrdersItem = () => {
    return (
      <View style={{ flex: 1, marginHorizontal: 24, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={[1]}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
        />
      </View>
    );
  };
  renderCustomerInfo = () => {
    let { user } = this.props.screenProps.user;
    if (this.state.order) {
      let { customer_address, customer_info, address } = this.state.order;
      return (
        <CustomerInfo
          address={customer_address ? customer_address : address}
          user={user}
          customer_info={customer_info ? customer_info : user}
        />
      );
    }
  };
  renderOrderInvoiceInfo = () => {
    let { order } = this.state;
    return (
      <InvoiceInfo
        order={{
          ...order,
          amount:
            order && order.order_amount
              ? order.order_amount
              : order
              ? order.amount
              : 0
        }}
      />
    );
  };
  renderOrderInfo = () => {
    let {
      return_title,
      return_description,
      stausMessage,
      order_id
    } = this.state.order;
    return (
      <View style={{ marginTop: 5, paddingHorizontal: 24 }}>
        <View style={[styles.rowWithSpaceBetween]}>
          <View style={{ mflex: 0.8 }}>
            <Text p style={[styles.profileLabel, styles.orderInfoLabel]}>
              {"Order Id"}
            </Text>
            <Text
              style={[
                styles.amountMoney,
                {
                  color: "#000000",
                  fontWeight: "normal",
                  fontSize: normalize(16),
                  lineHeight: 24
                }
              ]}
            >
              {`ORDER#${order_id}`}
            </Text>
          </View>
          <View style={{ flex: 0.5, alignItems: "flex-end" }}>
            <Text p style={[styles.profileLabel, styles.orderInfoLabel]}>
              {"Status"}
            </Text>
            <Text
              p
              style={[
                styles.amountMoney,
                {
                  color: "#DB495B",
                  fontWeight: "normal",
                  lineHeight: 24,
                  fontSize: normalize(16)
                }
              ]}
            >
              {"Pending"}
            </Text>
          </View>
        </View>
        <View style={[styles.rowWithSpaceBetween, { paddingTop: 10 }]}>
          <View style={{ flex: 0.8 }}>
            <Text p style={[styles.profileLabel, styles.orderInfoLabel]}>
              {"Reason of Return"}
            </Text>
            <Text
              p
              style={[
                styles.amountMoney,
                {
                  color: "#000000",
                  fontWeight: "normal",
                  fontSize: normalize(16),
                  lineHeight: 24
                }
              ]}
            >
              {return_title}
            </Text>
          </View>
        </View>
        <View style={[styles.rowWithSpaceBetween, { paddingTop: 10 }]}>
          <View style={{ flex: 1 }}>
            <Text p style={[styles.profileLabel, styles.orderInfoLabel]}>
              {"Comments"}
            </Text>
            <Text
              p
              style={[
                styles.amountMoney,
                styles.text,
                {
                  color: "#000000",
                  fontWeight: "normal",
                  fontSize: normalize(16),
                  lineHeight: 28
                }
              ]}
            >
              {return_description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  returnCutomerQuery = () => {
    return (
      <View style={{ marginTop: 16, paddingHorizontal: 24 }}>
        <View style={[styles.rowWithSpaceBetween]}>
          <Text p style={[styles.labelRetunInfo, { color: colors.primary }]}>
            {"When will I get my refund?"}
          </Text>
        </View>
        <View style={[styles.rowWithSpaceBetween, { marginTop: 8 }]}>
          <Text p style={[styles.labelRetunInfoText, {}]}>
            {
              "Your refund will be generated once the item reached final warehouse and money will be transferred to your account in 2 - 3 working days."
            }
          </Text>
        </View>
        <View style={{height:16}} />
        {this.renderInfoCard()}
        <View style={{height:32}} />
          {this.renderButton('CONTINUE SHOPPING')}
      </View>
    );
  };

  renderInfoCard = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={styles.returnCard}>
          <Text
            p
            style={[
              styles.labelRetunInfo,
              { color: colors.primary, fontWeight: "normal" }
            ]}
          >
            {`You have already requested a return of this item. \n Return received, Processing your refund  for this item.`}
          </Text>
          <View style={[styles.rowWithSpaceBetween, { marginTop: 24 }]}>
            <Text
              p
              style={[styles.labelRetunInfoText, { fontSize: normalize(12) }]}
            >
              {"Return received on: Mar 1, 2019"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    let { user } = this.props.screenProps.user;

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
          title={"Return details"}
          onRightPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this.renderOrdersItem()}
          {user && user.user_type == "vendor" ? (
            <View>
              {this.renderOrderInfo()}
              <View style={styles.borderSalesReport} />
              {this.renderCustomerInfo()}
              <View style={styles.borderSalesReport} />
              {this.renderOrderInvoiceInfo()}
            </View>
          ) : (
            this.returnCutomerQuery()
          )}
        </ScrollView>
      </View>
    );
  }
}
export default ReturnDetail;
