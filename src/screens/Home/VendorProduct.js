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
import { updateProductCartValue } from "../../utilities/method";
import ListFooterComponent from "../Home/Templates/ListFooterComponent";
import LazyHOC from "../../LazyLoadScreen";

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
      orders: ["1", "2"],
      price_filter: "",
      usage_filter: "",
      last_page: 0,
      fetchingStatus: false,
      refreshing: false
    };
    this.current_page = 1;

    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && params.vendor) {
      let { vendor, category_id } = params.vendor;
      debugger;
      this.setState(
        {
          name: vendor.name,
          vendorId: vendor.id,
          category_id: category_id
        },
        () => {}
      );
      this.getSubCategories(vendor.id, category_id);
    }
  }
  /*************APi Call  *********/
  getSubCategories = (vendor_id, category_id) => {
    let { setIndicator } = this.props.screenProps.actions;
    getRequest(
      `user/vendorsubcategories?vendor_id=${vendor_id}&category_id=${category_id}`
    )
      .then(res => {
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
              this.onSelectCategoryGetProduct(vendor_id, null, 1, false);

              // this.onSelectCategoryGetProduct(vendor_id,0);
            }
          );
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  onSelectCategoryGetProduct = (
    vendor_id,
    subcategoty_id,
    page,
    hideLoader
  ) => {
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    if (hideLoader) {
      this.setState({ fetchingStatus: true });
    }
    let apiName;
    apiName = `user/vendorproductssubcategory?vendor_id=${vendor_id}&subcategoty_id=${subcategoty_id}&usage_filter=${this.state.usage_filter}&price_filter=${this.state.price_filter}&page=${page}`;
    getRequest(apiName)
      .then(res => {
        if (
          res &&
          res.success &&
          res.success.data &&
          res.success.data.length > 0
        ) {
          this.setState(
            {
              products:
                page > 1
                  ? [...this.state.products, ...res.success.data]
                  : res.success.data,
              last_page: res.success.last_page,
              fetchingStatus: false,
              refreshing: false
            },
            () => {
              let { carts, wishlists } = this.props.screenProps.product;
              if (
                (carts && carts.length > 0) ||
                (wishlists && wishlists.length > 0)
              ) {
                let products = updateProductCartValue(
                  this.state.products,
                  this.props.screenProps.product
                );
                this.setState({
                  products,
                  fetchingStatus: false,
                  refreshing: false
                });
              }
            }
          );
        } else {
          this.setState({
            products: [],
            fetchingStatus: false,
            refreshing: false
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  updateFilter = data => {
    this.setState(
      {
        ...this.state,
        ...data
      },
      () => {
        this.onSelectCategoryGetProduct(this.state.vendorId, null, 1, false);
      }
    );
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
          this.props.navigation.push("ProductDetails", {
            productId: item.id
          })
        }
        onPressWishlist={() => this.onPressWishlist(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
      />
    );
  };
  ItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#607D8B"
        }}
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
          itemSeparatorComponent={this.ItemSeparator}
          onScrollEndDrag={() => console.log(" *********end")}
          onScrollBeginDrag={() => console.log(" *******start")}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            this.current_page = this.current_page + 1;
            if (this.state.last_page >= this.current_page) {
              let vendor_id = this.state.tabs[this.state.tabPage].vendor_id;
              let subcategoty_id = this.state.tabs[this.state.tabPage]
                .subcategoty_id
                ? this.state.tabs[this.state.tabPage].subcategoty_id
                : null;
              this.onSelectCategoryGetProduct(
                vendor_id,
                subcategoty_id,
                this.current_page,
                true
              );
            }
          }}
          ListFooterComponent={() => (
            <ListFooterComponent fetchingStatus={this.state.fetchingStatus} />
          )}
        />
      </View>
    );
  };
  setStateForTabChange = event => {
    let { vendor } = this.props.navigation.state.params;
    if (event) {
      if (this.state.tabs[event.i].name) {
        let catId = this.state.tabs[event.i].id;
        this.onSelectCategoryGetProduct(vendor.vendor_id, catId);
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
  onPressWishlist = (item, index) => {
    // let {addToCartSuccess} = this.props.screenProps.productActions
    this.setState({
      products: this.state.products.map(x => {
        if (x.id == item.id) {
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
    this.bounce(index);
  };
  addRemoveCart = item => {
    let { addToCartSuccess } = this.props.screenProps.productActions;
    this.setState({
      products: this.state.products.map(x => {
        if (x.id == item.id) {
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
      let findIndex = carts.findIndex(cart => cart.id == x.id);
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
      <LazyHOC>
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
         filters={this.props.screenProps.product}
          onPress={() =>
            this.props.navigation.navigate("Filter", {
              updateFilter: data => this.updateFilter(data)
            })
          }
        />
      </View>
            </LazyHOC>

    );
  }
}
export default VendorProduct;
