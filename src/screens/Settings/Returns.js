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
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import { postRequest, getRequest } from "../../redux/request/Service";
import OrderCommonItem from "../Dashboard/Templates/OrderCommonItem";
import { OrderPlaceholder } from "./Templates/OrderPlaceHolder";

class Returns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      orders:[]
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    this.getReturnOrders(6);
  }
  /******************** Api Function  *****************/
  getReturnOrders = status => {
    getRequest(`order/order_detail?status=${status}`)
      .then(res => {
        debugger;
        if (res && res.products && res.products.length > 0) {
          this.setState({
            orders: res.products,
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
        onPress={() => this.props.navigation.navigate("ReturnDetail")}
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
        <OrderCommonItem item={item} />
      </TouchableOpacity>
    );
  };
  renderProductsList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.orders}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
        
          ListEmptyComponent={
            <OrderPlaceholder
              array={[1, 2, 3, 4,]}
              message={
                this.props.screenProps.loader ? "" : "No data found "
              }
              loader={this.loaderComponent}
            />
          }
        />
      </View>
    );
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
          title={"Returns"}
          backPress={() => this.props.navigation.goBack()}
        />

        {this.renderProductsList()}
      </View>
    );
  }
}
export default Returns;
