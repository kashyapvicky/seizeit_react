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

import { string } from "../../../utilities/languages/i18n";
import Listitems from "./ListItem";
import { ProductPlaceholder } from "./PlaceHolderProduct";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../../utilities/method";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.veiwRef={}
    this.state = {
      visible2: false,
      cartItems: []
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    let { carts } = this.props.screenProps.product;
    this.setState({
      cartItems: carts
    });
  }
  
  UNSAFE_componentWillReceiveProps(nextProps){
    let { carts } =nextProps.screenProps.product;
    this.setState({
      cartItems: carts
    })
  }

  renderItems = ({ item, index }) => {
    return (
      <Listitems
        item={item}
        index={index}
        imageHeight={168}
        onPress={() =>   this.props.navigation.navigate("ProductDetails", {
          productId: item.id
        })}
        onPressWishlist={() => this.onPressWishlist(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
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
          ListEmptyComponent={
            <ProductPlaceholder
              array={[1, 2]}
              message={
                this.props.screenProps.loader ? "" : string('Your cart is Empty')
              }
              loader={this.loaderComponent}
            />
          }
        />
      </View>
    );
  };
  /************* Cart Methdod ***********/
  bounce = index =>
  this.veiwRef[index]
    .rubberBand(500)
    .then(endState =>
      console.log(endState.finished ? "bounce finished" : "bounce cancelled")
);
onPressWishlist = (item,index) => {
  // let {addToCartSuccess} = this.props.screenProps.productActions
  this.bounce(index)
  let { addWishlitsRequestApi } = this.props.screenProps.productActions;
  let updateArray = updateWishListSuccess(this.state.cartItems, item);
  this.setState({
    cartItems: updateArray
  });
  addWishlitsRequestApi({
    ...item,
    isFevorite: item.isFevorite ? false : true
  });
};
checkCartItem = item => {
    let { carts } = this.props.screenProps.product;
    if (carts && carts.length == 1) {
      this.warningMessage(item);
    } else {
      this.addRemoveCart(item);
    }
  };
  warningMessage = () => {
    Alert.alert(
      "",
      string("areyousureremove"),
      [
        { text: string("cancel"), onPress: () => null },
        {
          text: string("OK"),
          onPress: () => {
            this.removeItems();
          }
          // style:'cancel'
        }
      ],
      { cancelable: false }
    );
  };
  addRemoveCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    this.setState({
       cartItems: this.state.cartItems.filter(
        x => x.product_id != item.product_id
      )
    });
    addCartRequestApi({ ...item, isCart: false });
  };
  removeItems = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    this.setState({
      carts: []
    });
    addCartRequestApi({ ...item, isCart: false });

  };
  /************* Cart Methdod  End***********/

  render() {
    return this.renderProductsList()
  }
}
export default CartItem;
