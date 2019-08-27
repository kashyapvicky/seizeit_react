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
import ScrollableTabView from "../../components/ScrollableTab";
import Listitems from "./Templates/ListItem";
import { FilterButton } from "./Templates/FilterButton";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [
        {
          id: 1,
          cat_name: "CLOTHING",
          product_name: "Dotted Red payjama bottom wear",
          price: 90,
          isCart: true
        },
        {
          id: 1,
          cat_name: "CLOTHING",
          product_name: "Dotted Red payjama bottom wear",
          price: 100,
          isCart: true
        }
      ]
    };
  }
  pressButton = () => {
    this.props.navigation.navigate("Checkout");
  };
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 52,
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
  renderItems = ({ item, index }) => {
    return (
      <Listitems
        item={item}
        index={index}
        imageHeight={168}
        onPress={() => this.props.navigation.navigate("ProductDetails")}
      />
    );
  };
  renderProductsList = (item, index) => {
    return (
      <View
        skey={index}
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
      >
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.cartItems}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
        />
      </View>
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
          title={"Cart"}
          onRightPress={() => this.props.navigation.dismiss()}
        />
        {this.renderProductsList()}
        <View
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
              flex: 0.4,
              justifyContent: "center",
              paddingHorizontal: 16
            }}
          >
            <Text
              p
              style={{
                fontSize: normalize(14),
                fontWeight: "bold",
                color: "white"
              }}
            >
              $120
            </Text>
          </View>
          <View style={{ flex: 0.6, justifyContent: "center" }}>
            {this.renderButton("Proceed to Checkout")}
          </View>
        </View>
      </View>
    );
  }
}
export default Cart;
