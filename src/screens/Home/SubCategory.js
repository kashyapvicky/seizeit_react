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
import ListFooterComponent from "./Templates/ListFooterComponent";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../utilities/method";
import ProductCartItem from "./Templates/ProductCartItem";
import LazyHOC from "../../LazyLoadScreen";

class SubCategory extends Component {
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
      fetchingStatus: false,
      refreshing: false,
      products: [],
      orders: ["1", "2"],
      price_filter: "",
      usage_filter: "",
      last_page: 0
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
    if (params && params.category) {
      let { category } = params;
      debugger;
      this.setState(
        {
          name: category.name,
          catId: category.category_id
        },
        () => {}
      );
      this.getSubCategories(category.category_id);
    }
  }
  /*************APi Call  *********/
  getSubCategories = category_id => {
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    data["category_id"] = category_id;
    postRequest("user/getsubcategory", data)
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
                  id: -1,
                  slug: "allproduct",
                  status: 1,
                  name: "All",
                  updated_at: 1557140964
                }
              ];
              this.setState({ tabs: [...prependedValue, ...this.state.tabs] });
              this.onSelectCategoryGetProduct(-1, 1, false);
            }
          );
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  onSelectCategoryGetProduct = (catId, page, hideLoader) => {
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    if (hideLoader) {
      this.setState({ fetchingStatus: true });
    }
    let apiName;
    if (catId == -1) {
      data["category_id"] = this.state.catId;
      data["page"] = page;
      data["usage_filter"] = this.state.usage_filter;
      data["price_filter"] = this.state.price_filter;
      apiName = `user/productList_category`;
    } else {
      data["category_id"] = this.state.catId;
      data["subcategory_id"] = catId;
      data["usage_filter"] = this.state.usage_filter;
      data["price_filter"] = this.state.price_filter;
      data["page"] = page;
      apiName = `user/productList_category`;
    }
    postRequest(apiName, data,hideLoader)
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
        this.onSelectCategoryGetProduct(-1, 1, false);
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
          this.props.navigation.navigate("ProductDetails", {
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
    console.log(this.state.products, "this.state.products");
    return (
      <View
        key={index}
        tabLabel={item.name}
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
      >
        <View style={{ height: 6 }} />
        {/* <ProductCartItem  
          {...this.props}
          products={this.state.products}
        /> */}
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
              let catId = this.state.tabs[this.state.tabPage].id;
              this.onSelectCategoryGetProduct(catId, this.current_page, true);
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
    if (event) {
      let catId = this.state.tabs[event.i].id;
      this.onSelectCategoryGetProduct(catId, 0, false);
      this.setState({
        tabPage: event.i
      });
      debugger;
    }
    console.log(event, "event");
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
    this.bounce(index);
    let { addWishlitsRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateWishListSuccess(this.state.products, item);
    this.setState({
      products: updateArray
    });
    addWishlitsRequestApi({
      ...item,
      isFevorite: item.isFevorite ? false : true
    });
  };
  addRemoveCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateCartSuccess(this.state.products, item);
    this.setState({
      products: updateArray
    });
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
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
export default SubCategory;
