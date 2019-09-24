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
import ScrollableTabView from "../../components/ScrollableTab";
import Listitems from "./Templates/ListItem";
import { FilterButton } from "./Templates/FilterButton";
import { ProductPlaceholder } from "./Templates/PlaceHolderProduct";
import {updateProductCartValue} from '../../utilities/method'

class VendorProduct extends Component {
  constructor(props) {
    super(props);
    this.veiwRef = {};

    this.state = {
      visible2: false,
      cartItems: [],
      name: "",
      catId: "",
      tabPage: 0,
      tabs: [],
      products: [],
      orders: ["1", "2"]
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && params.vendor) {
      let { vendor } = params;
      debugger;
      this.setState(
        {
          name: vendor.vendor_name,
          vendorId: vendor.vendor_id
        },
        () => {}
      );
      this.getSubCategories(vendor.vendor_id);
    }
  }
  /*************APi Call  *********/
  getSubCategories = vendor_id => {
    let { setIndicator } = this.props.screenProps.actions;
    getRequest(`user/vendorsubcategories?vendor_id=${vendor_id}`)
      .then(res => {
    
        debugger;
        if (res && res.success && res.success.length > 0) {
          this.setState(
            {
              tabs: res.success
            },
            () => {
              let prependedValue = [
                {
                  created_at: 1557140964,
                  description: null,
                  icon: false,
                  id: 0,
                  slug: "allproduct",
                  status: 1,
                  name: "All",
                  updated_at: 1557140964
                }
              ];
              this.setState({ tabs: [...prependedValue, ...this.state.tabs] });
              this.onSelectCategoryGetProduct(vendor_id,0);
            }
          );
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  onSelectCategoryGetProduct = (vendor_id,subcategoty_id) => {
    let { setIndicator } = this.props.screenProps.actions;
    apiName = `user/vendorproductssubcategory?vendor_id=${vendor_id}&subcategoty_id=${subcategoty_id}`;
    getRequest(apiName)
      .then(res => {
        debugger;
        if (res && res.success && res.success.length > 0) {
          this.setState(
            {
              products: res.success
            },
            () => {
              let { carts,wishlists } = this.props.screenProps.product;
              if (carts && carts.length > 0 || wishlists && wishlists.length>0) {
                let products = updateProductCartValue(this.state.products,this.props.screenProps.product);
                this.setState({
                  products
                });
              }
            }
          );
        } else {
          this.setState({
            products: []
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  /*********** APi Call End  *****/
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
  renderItems = ({ item, index }) => {
    return (
      <Listitems
        item={item}
        index={index}
        imageHeight={168}
        onPress={() =>
          this.props.navigation.navigate("ProductDetails", {
            productId: item.product_id
          })
        }
        onPressWishlist={() => this.onPressWishlist(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
      />
    );
  };
  renderProductsList = (item, index) => {
    return (
      <View
        key={index}
        tabLabel={item.name}
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
      >
        <View style={{ height: 6 }} />
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={
            <ProductPlaceholder
              array={[1, 2, 3, 4, 5, 6]}
              message={this.props.screenProps.loader ? "" : "No products found"}
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
  setStateForTabChange = event => {
    let {vendor} = this.props.navigation.state.params
    if (event) {
      if(this.state.tabs[event.i].name){
        let catId = this.state.tabs[event.i].id;
        this.onSelectCategoryGetProduct(vendor.vendor_id,catId);
        this.setState({
          tabPage: event.i
        });
      }
    }
  };
  renderScrollableTab = () => {
    return (
      <ScrollableTabView
        tabs={this.state.tabs}
        //tabPage={this.state.tabPage}
        onChangeTab={event => {
          this.setStateForTabChange(event);
        }}
        renderListTabs={(item, index) => this.renderProductsList(item, index)}
      />
    );
  };
  /************** Cart Method  **************/
  bounce = index =>
    this.veiwRef[index]
      .rubberBand(500)
      .then(endState =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  onPressWishlist = (item,index) => {
    // let {addToCartSuccess} = this.props.screenProps.productActions
    this.setState({
      products: this.state.products.map(x => {
        if (x.product_id == item.product_id) {
          return {
            ...x,
            isFevorite: x.isFevorite ? false : true
          };
        } else {
          return {
            ...x
          };
        }
      })
    });
    this.bounce(index)

  };
  addRemoveCart = item => {
    let { addToCartSuccess } = this.props.screenProps.productActions;
    this.setState({
      products: this.state.products.map(x => {
        if (x.product_id == item.product_id) {
          return {
            ...x,
            isCart: x.isCart ? false : true
          };
        } else {
          return {
            ...x
          };
        }
      })
    });
    addToCartSuccess({ ...item, isCart: item.isCart ? false : true });
  };
  updateProductCartValue = array => {
    debugger;
    let { carts } = this.props.screenProps.product;
    let newArray = array.map(x => {
      let findIndex = carts.findIndex(cart => cart.product_id == x.product_id);
      if (findIndex > -1) {
        return {
          ...x,
          isCart: carts[findIndex].isCart
        };
      } else {
        return {
          ...x
        };
      }
    });
    return newArray;
  };
/************** Cart Method  **************/
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          // headerStyle={[
          //   styles.shadow,
          //   {
          //     backgroundColor: "#FFFFFF",
          //     shadowRadius: 0.1
          //   }
          // ]}
          //   hideLeftIcon={true}
          title={this.state.name}
          backPress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollableTab()}
        <FilterButton
          onPress={() => this.props.navigation.navigate("Filter")}
        />
      </View>
    );
  }
}
export default VendorProduct;
