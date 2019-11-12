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
import { postRequest, getRequest } from "../../redux/request/Service";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import OrderListItem from "./Templates/OrderListItem";
import { OrderPlaceholder } from "./Templates/OrderPlaceHolder";
import OrderPlacedListItem from "./Templates/OrderPlacedListItem";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      orders: []
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    this.getOrders();
  }
  /******************** Api Function  *****************/
  getOrders = () => {
    getRequest(`order/order_detail`)
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
  /******************** Api Function End*****************/

  renderButton = (title, transparent,item,orderItem) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          borderColor: transparent ? colors.primary : colors.transparent,
          borderRadius: 4,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        buttonTextStyle={{ fontWeight: "normal" }}
        fontSize={normalize(14)}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title,item,orderItem)}
        title={title}
      />
    );
  };
  pressButton = (title,item,orderItem) => {
    if (title == "Return") {
      this.props.navigation.navigate("CustomerReturnOrderRequest",{
        order: orderItem,
        product:item,
        getOrders:()=> this.getOrders()
      });
    }
  };
  renderItems = ({ item, index }) => {
    return (
      <OrderPlacedListItem
        onPress={() =>
          this.props.navigation.navigate("OrderDetails", {
            order: item,
            from: "order-placed"
          })
        }
        item={item}
        index={index}
        renderButton={(title, transparent,item,orderItem) =>
          this.renderButton(title, transparent,item,orderItem)
        }
      />
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
          ListEmptyComponent={
            <OrderPlaceholder
              array={[1, 2, 3, 4, 5, 6]}
              loader={this.loaderComponent}
            />
          }
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
          title={"Orders"}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }}>{this.renderProductsList()}</ScrollView>
      </View>
    );
  }
}
export default CustomerOrders;
