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
import { postRequest, getRequest } from "../../redux/request/Service";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";

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
import { getGroups} from '../../utilities/method'
import moment from "moment";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      tabPage:0,
      cartItems: [],
      allOrders:[],
      tabs: [
        {
          title: "Active Orders",
        },
        {
          title: "Past Orders"
        }
      ],
      orders: [],
    };
  }
  componentDidMount(){
     this.getOrders(0)
  }
  /******************** Api Function  *****************/
  buttonStatus = value => {
    switch (value) {
      case 1:
        return {name:"Confirm Order",
        value: "Confirm Order",
      }
      case 2:
          return {name:"Packed Order",
          value: "Packed Order",
        }
      case 3:
          return {name:"Dispatched",
          value: "Dispatched",
        }
      case 4:
          return {name:"Delivered",
          value: "Delivered",
        }
      default:
        return "";
    }
  };
  pressButton = (title, order) => {
    if (title == "Confirm Order") {
      this.changeOrderStatus(order.id, 2);
    } else if (title == "Packed Order") {
      this.changeOrderStatus(order.id, 3);
    } else if (title == "Dispatched") {
      this.changeOrderStatus(order.id, 4);
    } else if (title == "Delivered") {
      this.changeOrderStatus(order.id, 7);
    }
  };
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
          this.getOrders(0)
          //let filterorders = this.state.orders.filter(x => x.id != orderId);
         // this.setState({ orders: filterorders });
        }
        debugger;
        setIndicator(false);
      })
      .catch(err => {});
  };

  filterActiveandPastOrder = (orders,tabPage) =>{
    if(orders && orders.length > 0){
      let activeOrder = orders.filter((e,i)=> {
        return e.status > 0 && e.status <= 4 ;
     });
     let pastOrder = orders.filter((pastOd,k)=> {
      return pastOd.status > 4 ;
     });
     debugger
     let groupsActiveOrder =getGroups(activeOrder)
     let groupsPastOrder =getGroups(pastOrder)
     this.groupOrderArray(groupsActiveOrder,groupsPastOrder,tabPage)
    }
    debugger
   
          // Grouping Array
  }
  groupOrderArray = (groupsActive,groupsPastOrder,tabPage)=>{
    debugger
    if(groupsActive && tabPage == 0){
    let groupArrays = Object.keys(groupsActive).map((date) => {
        return {
          date,
          orders:groupsActive[date]
        };
      });
      debugger
      this.setState({
        orders: groupArrays,
        isRefreshing: false
      });
    }
    if(groupsPastOrder && tabPage == 1){
      let groupPastArrays = Object.keys(groupsPastOrder).map((date) => {
        return {
          date,
          orders:groupsPastOrder[date]
        };
      });
      this.setState({
        orders: groupPastArrays,
      });
    } 
  }
  getOrders = status => {
    getRequest(`order/vendor_order_detail?status=${status}`)
      .then(res => {
        if (res && res.data && res.data.length > 0) { 
          this.filterActiveandPastOrder(res.data,0)
          this.setState({
            allOrders: res.data,
            isRefreshing: false
          });
        } else {
          this.setState({
            isRefreshing: false,
            orders: [],
            allOrders:0
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };

  setStateForTabChange = event => {
    if (event) {
       if(event.i == 0){
        this.filterActiveandPastOrder(this.state.allOrders,event.i);
       }
       else if(event.i == 1){
        this.filterActiveandPastOrder(this.state.allOrders,event.i);
        this.setState({
          tabPage: event.i
        });
      }
    }
  };

  renderButton = (title, transparent,order,action) => {
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
        onPress={() => this.pressButton(action,order)}
        title={string(title)}
      />
    );
  };
  renderOrders = ({ item, index }) => {
    return (
      <View
      
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}
      >
        <View style={{alignItems:'flex-start'}}> 
        <Text
          h5
          style={{
            color: "#000000",
            fontSize: normalize(18)
          }}
        >
          {item.date}
        </Text>
        </View>
       
        <View style={{ flex: 1, marginTop: 16 }}>
          {this.renderItems(item.orders,index,item)}
        </View>
      </View>
    );
  };
  renderItems = (orders, index) => {
    return orders.map((order, i) => {
      return (
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate("OrderDetails",{
          order :order
        })}
         key={i + "order"} style={{ flexDirection: "row",flex:1}}>
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
              height:'100%',
              // height:
              //   i + 1 == this.state.orders.length
              //     ? 30 * this.state.orders.length
              //     : 100 * this.state.orders.length,
              backgroundColor: "rgba(0,0,0,0.09)",
            }}
          ></View>
          {i + 1 == orders.length && (
            <View
              style={{
                backgroundColor: "green",
                height: 5,
                width: 5,
                borderRadius: 5 / 2,
                bottom: 0,
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
                    justifyContent: "space-between",
                    alignItems:'flex-start'
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
                    Order ID: {`#ORDER${order.id}`}
                  </Text>
                </View>
                <View style={{alignItems:'flex-start'}}>
                  <Text p style={{ color: "#000000", fontSize: normalize(16) }}>
                    {`${String.currency} ${order.amount}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 6,
                    alignItems:'flex-start'
                  }}
                >
                  <Text
                    p
                    style={{
                      color: "rgba(0,0,0,0.5)",
                      fontSize: normalize(13)
                    }}
                  >
                   {`${string("Order placed at")}`} {moment(order.createdAt).format('LT')}
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 6,
                    alignItems:'flex-start'
                  }}
                >
                  {order.status < 4 ?
                    this.renderButton(
                      this.buttonStatus(order.status).name,
                      false,
                      order,
                      this.buttonStatus(order.status).value,
                  ): <Text
                  textAlign
                  style={[
                    styles.text,
                    { color: "#96C50F", fontSize: normalize(10) }
                  ]}
                >
                {order.stausMessage}
                </Text> }
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
                {order.stausMessage}
                </Text>
              </View>
            </View>
            {orders.length - 1 != i && (
              <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
                <Dash
                  dashThickness={1}
                  dashColor={"rgba(0,0,0,0.12)"}
                  style={{ width: screenDimensions.width - 100, height: 1 }}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };
  renderProductsList = (item, index) => {
    console.log(this.state.orders,"this.state.orders")
    return (
      <View skey={index} tabLabel={string(item.title)} style={{ paddingVertical: 16 }}>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.orders}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderOrders}
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={() =>
            !this.props.screenProps.loader ? (
              <ListEmptyComponent message={string('nodatafound')} style={{marginTop:'15%'}}/>
            ) : null
          }
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
            placeholder={string("Search your products here")}
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
        onChangeTab={event => {
          this.setStateForTabChange(event);
        }}
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
          title={string("Orders")}
          backPress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollableTab()}

        {/* {this.renderProductsList()} */}
      </View>
    );
  }
}
export default Orders;
