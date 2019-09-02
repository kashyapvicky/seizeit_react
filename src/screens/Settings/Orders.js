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
import Dash from "react-native-dash";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import ScrollableTabView from "../../components/ScrollableTab";
import { screenDimensions } from "../../utilities/contsants";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      tabs: [
        {
          title: "Active Orders"
        },
        {
          title: "Past Orders"
        }
      ],
      orders: ["1", "2","2"],
    };
  }
  pressButton = () => {};
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          width: 112,
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
  renderOrders = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("OrderDetails")}
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}
      >
        <Text
          h5
          style={{
            color: "#000000",
            fontSize: normalize(18)
          }}
        >
          03-16-2019
        </Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          {this.renderItems(item, index)}
        </View>
      </TouchableOpacity>
    );
  };
  renderItems = (item, index) => {
    return this.state.orders.map((order, i) => {
      return (
        <View key={i + "order"} style={{ flexDirection: "row",flex:1}}>
          <View style={{flex:0.1,marginTop: i == 0 ? 8 : 0,}}>
          {i == 0 && (
            <View
              style={{
                backgroundColor: "green",
                height: 5,
                width: 5,
                borderRadius: 5 / 2,
                top:0,
                left:-1
              }}
            ></View>
          )}
          <View
            style={{
              width:2,
              height:(i + 1 == this.state.orders.length) ? '55%':'100%',
              // height:
              //   i + 1 == this.state.orders.length
              //     ? 30 * this.state.orders.length
              //     : 100 * this.state.orders.length,
              backgroundColor: "rgba(0,0,0,0.09)",
            }}
          ></View>
          {i + 1 == this.state.orders.length && (
            <View
              style={{
                backgroundColor: "green",
                height: 5,
                width: 5,
                borderRadius: 5 / 2,
                bottom: (i + 1 == this.state.orders.length) ? 65:0,
                left:-1,
                position: "absolute"
              }}
            ></View>
          )}
          </View>
          <View
            style={[
              {
                backgroundColor: "white",
                flex: 0.9,
                marginTop:i == 0 ? 16:0,
                // borderBottomWidth:1,
                paddingRight: 16
                // shadowRadius: 0.1
              }
            ]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 0.8, paddingLeft: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    p
                    style={{
                      color: "#233138",
                      letterSpacing: 0.5,
                      fontSize: normalize(13)
                      // fontWeight: "600"
                    }}
                  >
                    Order ID: Mi468337
                  </Text>
                </View>
                <View>
                  <Text p style={{ color: "#000000", fontSize: normalize(16) }}>
                    3 items · $245
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 6
                  }}
                >
                  <Text
                    p
                    style={{
                      color: "rgba(0,0,0,0.5)",
                      fontSize: normalize(13)
                    }}
                  >
                    Order placed at 6:45 pm
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 6
                  }}
                >
                  {this.renderButton("Dispatch")}
                </View>
              </View>
              <View
                style={{
                  width: "auto",
                  height: 16,
                  paddingHorizontal: 6,
                  justifyContent: "center",
                  backgroundColor: "rgba(150,197,15,0.12)",
                  borderRadius: 4
                }}
              >
                <Text
                  textAlign
                  style={[
                    styles.text,
                    { color: "#96C50F", fontSize: normalize(10) }
                  ]}
                >
                  PACKING DONE
                </Text>
              </View>
            </View>
            {this.state.orders.length - 1 != i && (
              <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
                <Dash
                  dashThickness={1}
                  dashColor={"rgba(0,0,0,0.12)"}
                  style={{ width: screenDimensions.width - 100, height: 1 }}
                />
              </View>
            )}
          </View>
        </View>
      );
    });
  };
  renderProductsList = (item, index) => {
    return (
      <View skey={index} tabLabel={item.title} style={{ paddingVertical: 16 }}>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderOrders}
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          // ListEmptyComponent={
          //     (this.state.allProductsListForItem.length == 0) ?
          //         ListEmpty2({ state: this.state.visible, margin: screenDimensions.height / 3 - 20, message: string('noproductfound') })

          //         :
          //         null
          // }
        />
      </View>
    );
  };
  renderSearchInput = () => {
    return (
      <View style={[styles.searchhView]}>
        <View style={{ flex: 0.1, alignSelf: "center", paddingLeft: 16 }}>
          <Icons name={"ios-search"} size={22} color={"#96C50F"} />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{
              height: 40,
              fontSize: normalize(14),
              textAlign: "left",
              // fontWeight: "500",
              color: "#96C50F"
              // fontFamily: fonts.sourcesanspro
              // lineHeight:16
              // borderBottomWidth: 1, borderBottomColor: isFocused ? '#75B152' : 'rgba(0,0,0,0.11)'
            }}
            placeholder={"Search your products here"}
            placeholderTextColor={"#96C50F"}
            // secureTextEntry={this.props.secureTextEntry?this.props.secureTextEntry:false}
          />
        </View>
      </View>
    );
  };

  renderScrollableTab = () => {
    return (
      <ScrollableTabView
        tabs={this.state.tabs}
        renderListTabs={(item, index) => this.renderProductsList(item, index)}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          //   headerStyle={[
          //     styles.shadow,
          //     {
          //       backgroundColor: "#FFFFFF",
          //       shadowRadius: 0.1
          //     }
          //   ]}
          //   hideLeftIcon={true}
          title={"Orders"}
          backPress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollableTab()}

        {/* {this.renderProductsList()} */}
      </View>
    );
  }
}
export default Orders;
