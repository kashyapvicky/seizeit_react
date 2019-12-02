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


class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      order: []
    };
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    debugger
    if (params && params.order && params.from == "order-placed") {
      this.setState({
        order: params.order
      });
    } else {
      this.setState({
        order: params.order
      });
    }
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={14}
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
          {
            backgroundColor: "white",
            paddingVertical: 8,
            marginTop: 15,
            shadowRadius: 0.1
          }
        ]}
      >
        <ItemsProduct item={item.product_detail ? item.product_detail : item} />
      </TouchableOpacity>
    );
  };
  renderOrdersItem = () => {
    let { order_detail, product_detail } = this.state.order;
    debugger;
    return (
      <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={
            order_detail && order_detail.length > 0
              ? order_detail
              : product_detail
              ? [product_detail]
              : []
          }
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
        />
      </View>
    );
  };
  renderCustomerInfo = () => {
    let { user } = this.props.screenProps.user;
    let { customer_address, customer_info, address } = this.state.order;
    return (
      <CustomerInfo
        address={customer_address ? customer_address : address}
        user={user}
        customer_info={customer_info ? customer_info : user}
      />
    );
  };
  renderOrderInvoiceInfo = () => {
    let { order } = this.state;
    return (
      <InvoiceInfo
        order={{
          ...order,
          amount: order.order_amount ? order.order_amount : order.amount
        }}
      />
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
          title={string("Order details")}
          onRightPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this.renderOrdersItem()}
          <View style={styles.borderSalesReport} />
          {this.renderCustomerInfo()}
          <View style={styles.borderSalesReport} />
          {this.renderOrderInvoiceInfo()}
        </ScrollView>
      </View>
    );
  }
}
export default OrderDetails;


//ItemsProduct
const ItemsProduct = ({ item }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={[
          styles.shadow,
          {
            flex: 0.3,
            shadowColor: "rgba(0,0,0)",
            shadowOpacity: 1,
            shadowRadius: 0
          }
        ]}
      >
        <Image
          style={{ height: 96, width: 96, borderRadius: 4 }}
          source={
            item.pics && item.pics.length > 0
              ? {
                  uri: item.pics[0].pic
                }
              : Images.no_image
          }
        />
      </View>
      <View style={{ flex: 0.7, paddingLeft: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            p
            style={{
              color: "#233138",
              letterSpacing: 0.5,
              fontSize: normalize(12),
              fontWeight: "600"
            }}
          >
            CLOTHING
          </Text>
          {/* <Ionicons  name={'dots-vertical'} size={28} color={'#D8D8D8'} /> */}
        </View>
        <View style={{alignItems:'flex-start',flex:1}}> 
          <Text p style={{ color: "#000000" }}>
            {item.product_title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 6
          }}
        >
          <Text h5 style={{ color: "#000000", fontSize: normalize(18) }}>
          {String.currency} {item.price}
          </Text>
        </View>
      </View>
    </View>
  );
};
