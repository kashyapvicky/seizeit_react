import React, { Component, Fragment } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
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
import { ProductPlaceholder } from "./Templates/PlaceHolderProduct";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../utilities/method";

import CartItem from "./Templates/CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.veiwRef = {};
    this.state = {
      visible2: false,
      cartItems: []
    };
  }
  componentDidMount() {
    let { carts } = this.props.screenProps.product;
    this.setState({
      cartItems: carts
    });
  }
  pressButton = () => {
    let {user} = this.props.screenProps.user
    if(user){
      this.props.navigation.navigate("Checkout");
    }else{
      this.warningMessage()
    }
  };
  warningMessage = () => {
    Alert.alert(
      "",
      string("loginRequired"),
      [
        { text: string("cancel"), onPress: () => null },
        {
          text: string("OK"),
          onPress: () => {
            this.props.navigation.navigate('AuthNavigatorStack');
          }
          // style:'cancel'
        }
      ],
      { cancelable: false }
    );
  };
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
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
        <CartItem 
        {...this.props}
        
        />
        {this.state.cartItems.length > 0 ? (
          <View
            style={{
              flex: 0.1,
              justifyContent: "flex-end",
              paddingHorizontal: 8,
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: colors.primary
            }}
          >
            {/* <View
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
          </View> */}

            <View style={{ flex: 1, justifyContent: "center" }}>
              {this.renderButton("Proceed to Checkout")}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
export default Cart;
