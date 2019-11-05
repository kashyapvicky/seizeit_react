import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Alert
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
import Listitems from "../Home/Templates/ListItem";
import { ProductPlaceholder } from "../Home/Templates/PlaceHolderProduct";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../utilities/method";
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      products: []
    };
    this.veiwRef = {};

    // Placeholder Product
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    let { wishlists } = this.props.screenProps.product;
    this.setState({
      products: wishlists
    });
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
      <Listitems
        item={item}
        index={index}
        imageHeight={168}
        onPress={() => this.props.navigation.navigate("ProductDetails",{
          productId:item.id
        })}
        onPressWishlist={() => this.checkCartItem(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
      />
    );
  };

  renderProductsList = (item, index) => {
    return (
      <View style={{ flex: 1, marginTop: 8 }}>
        <View style={{ height: 6 }} />
        <FlatList
          bounces={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={
            <ProductPlaceholder
              array={[1, 2, 3, 4, 5, 6]}
              loader={this.loaderComponent}
              message={this.props.screenProps.loader ? "" : "No wishlist found"}


            />
          }
        />
      </View>
    );
  };
  /************** Cart Method  **************/
  bounce = index =>
    this.veiwRef[index]
      .rubberBand(500)
      .then(endState =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  checkCartItem = (item, index) => {
    let { wishlists } = this.props.screenProps.product;
    if (wishlists && wishlists.length == 1) {
      this.warningMessage(item, index);
    } else {
      this.onPressWishlist(item, index);
    }
  };
  warningMessage = (item, index) => {
    Alert.alert(
      "",
      string("areyousureremove"),
      [
        { text: string("cancel"), onPress: () => null },
        {
          text: string("OK"),
          onPress: () => {
            this.removeItems(item, index);
          }
          // style:'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  onPressWishlist = (item, index) => {
    this.bounce(index);
    let { addWishlitsRequestApi } = this.props.screenProps.productActions;
    this.setState({
      products: this.state.products.filter(x => x.product_id != item.product_id)
    });
    addWishlitsRequestApi({ ...item, isFevorite: false });
  };
  
  removeItems = item => {
    let { addWishlitsRequestApi } = this.props.screenProps.productActions;
    this.setState({
      products: []
    });
    addWishlitsRequestApi({ ...item, isFevorite: false });
  };

  addRemoveCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateCartSuccess(this.state.products, item);
    this.setState({
      products: updateArray
    });
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          isRightIcon={false}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          hideLeftIcon={false}
          title={"Wishlist"}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {this.renderProductsList()}
        </ScrollView>
      </View>
    );
  }
}
export default Wishlist;
