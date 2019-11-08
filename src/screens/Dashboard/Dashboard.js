import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";

//local imports
import { postRequest, getRequest } from "../../redux/request/Service";

import Button from "../../components/Button";
import ScrollableTabView from "../../components/ScrollableTab";
import Text from "../../components/Text";
import LineChartComponet from "./Templates/Chart";
import Header from "../../components/Header";
import { normalize } from "../../utilities/helpers/normalizeText";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";

import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      orders: [],
      tabs: [
        {
          title: "Order Recieved"
        },
        {
          title: "In Processing"
        },
        {
          title: "Dispatched"
        }
      ],
      buttons: [
        {
          name: "Reject Order",
          backgroundColor: "#6B7580"
        },
        {
          name: "Confirm Order",
          backgroundColor: "#96C50F"
        },
        {
          name: "Order details",
          backgroundColor: "#FFFFFF",
          color: "#96C50F"
        }
      ]
    };
    this.props.screenProps.actions.setIndicator(false);
  }
  componentDidMount() {
    this.getOrders(1);
  }

  /******************** Api Function  *****************/
  getOrders = status => {
    getRequest(`order/vendor_order_detail?status=${status}`)
      .then(res => {
        debugger;
        if (res && res.data && res.data.length > 0) {
          this.setState({
            orders: res.data,
            isRefreshing: false
          });
        } else {
          this.setState({
            isRefreshing: false,
            orders: []
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };

  // Change Order Status
  changeOrderStatus = (orderId, status) => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let data = {};
    data["order_detail_id"] = orderId;
    data["status"] = status;
    postRequest(`order/change_product_status`, data)
      .then(res => {
        if (res && res.success) {
          setToastMessage(true, colors.primary);
          toastRef.show(res.success);
          let filterorders = this.state.orders.filter(x=> x.id != orderId )
          this.setState({orders:filterorders})
        }
        debugger;
        setIndicator(false);
      })
      .catch(err => {});
  };

  pressButton = (title, order) => {
    if (title == "Reject Order") {
      this.changeOrderStatus(order.id, 8);
    } else if (title == "Confirm Order") {
      this.changeOrderStatus(order.id, 2);
    } else if (title == "Order details") {
      this.props.navigation.navigate('OrdeDetail',{
        order:order
      })
    }
  };
  /******************** Api Function  End *****************/
  renderButton = (title, backgroundColor, color, order) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          width: deviceWidth / 3 - 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          borderColor: color ? color : backgroundColor,
          backgroundColor: backgroundColor
        }}
        fontSize={14}
        color={color}
        onPress={() => this.pressButton(title, order)}
        title={title}
      />
    );
  };
  //***************** */Tabs Function  **********************//
  setStateForTabChange = i => {};
  renderListForProducts = (item, index) => {
    return (
      <View
        key={index}
        tabLabel={item.title}
        style={{ paddingVertical: 16, paddingHorizontal: 8 }}
      >
        {this.state.orders.length > 0 ? (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text p={{ color: "#6B7580", fontSize: normalize(14) }}>
              {`${this.state.orders.length} Orders in total`}
            </Text>
          </View>
        ) : null}

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderAllItem()}
          <View style={styles.borderSalesReport} />

          <LineChartComponet />
        </ScrollView>
      </View>
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
            paddingVertical: 8,
            marginTop: 16,
            shadowRadius: 0.1
          }
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.shadow,
              {
                flex: 0.3,
                shadowColor: "rgba(0,0,0)",
                shadowOpacity: 0.19,
                shadowRadius: 0.1
              }
            ]}
          >
            <Image
              style={{ height: 96, width: 96, borderRadius: 4 }}
              source={
                item.product_detail && item.product_detail.pics.length > 0
                  ? {
                      uri: item.product_detail.pics[0].pic
                    }
                  : Images.no_image
              }
            />
          </View>
          <View style={{ flex: 0.7, paddingLeft: 8 }}>
            <View>
              <Text
                p
                style={{
                  color: "#233138",
                  letterSpacing: 0.5,
                  fontSize: normalize(12),
                  fontWeight: "600"
                }}
              >
                {item.product_detail.brand
                  ? item.product_detail.brand.name
                  : ""}
              </Text>
            </View>
            <View>
              <Text p style={{ color: "#000000" }}>
                {item.product_detail.product_title}
              </Text>
            </View>
            <View style={{ paddingTop: 6 }}>
              <Text h5 style={{ color: "#000000", fontSize: normalize(18) }}>
                ${item.product_detail.price}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            paddingTop: 16,
            paddingBottom: 8
          }}
        >
          {this.state.buttons.map((button, index) => {
            return (
              <View style={{ flex: 0.5 }}>
                {this.renderButton(
                  button.name,
                  button.backgroundColor,
                  button.color,
                  item
                )}
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };
  renderAllItem = (data, index) => {
    return (
      <View style={{ paddingHorizontal: 10 }} key={index}>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.orders}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={() =>
            !this.props.screenProps.loader ? (
              <ListEmptyComponent message={"No Orders found"} />
            ) : null
          }
        />
      </View>
    );
  };
  setStateForTabChange = event => {
    if (event) {
      this.getOrders(event.i + 1);
      this.setState({
        tabPage: event.i
      });
    }
  };
  renderScrollableTab = () => {
    return (
      <ScrollableTabView
        tabs={this.state.tabs}
        onChangeTab={event => {
          this.setStateForTabChange(event);
        }}
        renderListTabs={(item, index) =>
          this.renderListForProducts(item, index)
        }
      />
    );
  };
  //***************** */Tabs Function End **********************//

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={Images.notification}
          hideLeftIcon={true}
          title={"Dashboard"}
          backPress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollableTab()}
      </View>
    );
  }
}
export default Home;
