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
import OrderCommonItem from "./Templates/OrderCommonItem";

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
          title: "Packed"
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
  buttonStatus = value => {
    debugger;
    switch (value) {
      case 1:
        return "Confirm Order";
      case 2:
        return "Packed Order";
      case 3:
        return "Dispatched";
      case 4:
        return "Delivered";
      default:
        return "";
    }
  };
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
          let filterorders = this.state.orders.filter(x => x.id != orderId);
          this.setState({ orders: filterorders });
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
    } else if (title == "Packed Order") {
      this.changeOrderStatus(order.id, 3);
    } else if (title == "Dispatched") {
      this.changeOrderStatus(order.id, 4);
    } else if (title == "Delivered") {
      this.changeOrderStatus(order.id, 7);
    } else if (title == "Order details") {
      this.props.navigation.navigate("OrdeDetail", {
        order: order
      });
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
    let buttons;
    if (item.status >= 4) {
      buttons = [
        {
          name: "Order details",
          backgroundColor: "#FFFFFF",
          color: "#96C50F"
        }
      ];
    } else {
      buttons = this.state.buttons;
    }
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
        <OrderCommonItem item={item} />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            paddingTop: 16,
            paddingBottom: 8
          }}
        >
          {buttons.map((button, index) => {
            return (
              <View style={{ flex: 0.5 }}>
                {index == 1
                  ? this.renderButton(
                      this.buttonStatus(item.status),
                      button.backgroundColor,
                      button.color,
                      item
                    )
                  : this.renderButton(
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
