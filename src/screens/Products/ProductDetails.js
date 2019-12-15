import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  I18nManager
} from "react-native";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import ProductDetailBanner from "./Templates/ProductDetailBanner";
import ProductItemDetail from "./Templates/ProductItemDetail";
import { FeatureLabel } from "./Templates/Feature";
import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import Listitems from "../Home/Templates/ListItem";
import { postRequest, getRequest } from "../../redux/request/Service";
import { ProductPlaceholder } from "../Home/Templates/PlaceHolderProduct";
import ProductSlider from "./Templates/ProductSlider";
import { string } from "../../utilities/languages/i18n";

import Features from "./Templates/Feature";
import styles from "../../styles";
import Text from "../../components/Text";
import { normalize } from "../../utilities/helpers/normalizeText";
import { screenDimensions } from "../../utilities/contsants";
import { NotificationPlaceholder } from "../Notifications/Templates/NotoficationPlaceholder";
import Rating from "./Templates/Rating";
import { ReviewItem } from "../Home/Templates/ReviewItem";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../utilities/method";
import LazyHOC from "../../LazyLoadScreen";
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.veiwRef = {};
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      isbarShow: false,
      product: "",
      similarProducts: [],
      banners: [],
      refreshing: false
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && params.productId) {
      this.setState({
        productId:params.productId
      })
      debugger;
      this.getProductDetail(params.productId);
      this.getSimilarProduct(params.productId);
    }
  }
  /*************APi Call  *********/
  getProductDetail = product_id => {
    let { setIndicator } = this.props.screenProps.actions;
    getRequest(`user/productDetails?product_id=${product_id}`)
      .then(res => {
        debugger;
        if (res && res.success) {
          this.setState({
            product: res.success,
            banners: res.success.pics
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  getSimilarProduct = product_id => {
    let { setIndicator } = this.props.screenProps.actions;
    getRequest(`user/similarproducts?product_id=${product_id}`)
      .then(res => {
        debugger;
        if (res && res.success.length > 0) {
          this.setState(
            {
              similarProducts: res.success
            },
            () => {
              let { carts, wishlists } = this.props.screenProps.product;
              if (
                (carts && carts.length > 0) ||
                (wishlists && wishlists.length > 0)
              ) {
                let similarProducts = updateProductCartValue(
                  this.state.similarProducts,
                  this.props.screenProps.product
                );
                this.setState({
                  similarProducts
                });
              }
            }
          );
        } else {
          this.setState({
            similarProducts: res.success
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };

  /*************APi Call  End *********/
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
    let updateArray = updateWishListSuccess(this.state.similarProducts, item);
    this.setState({
      similarProducts: updateArray
    });
    addWishlitsRequestApi({
      ...item,
      isFevorite: item.isFevorite ? false : true
    });
  };
  addRemoveCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateCartSuccess(this.state.similarProducts, item);
    this.setState({
      similarProducts: updateArray
    });
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
  };
  addToCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
    this.setState({});
  };
  /************** Cart Method  **************/
  renderLabel = title => {
    return (
      <View style={{alignItems:'flex-start'}}>
        <Text h5 style={[styles.labelHeading, { fontSize: normalize(18) }]}>
          {title}
        </Text>
      </View>
    );
  };
  renderButton = (title, transparent,action) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(action)}
        title={string(title).toUpperCase()}
      />
    );
  };
  pressButton = (title) => {
    let { product } = this.state;

    if (title == "AddtoCart") {
      let { product } = this.state;
      this.addToCart(product);
    } else if (title == "ViewCart") {
      this.props.navigation.navigate("Cart");
    } else if (title == "ViewAllReviews") {
      this.props.navigation.navigate("AllReviews",{
        vendorId:product.vendor.id,
        vendorAverage:product.vendorAverage
      });
    }
  };
  renderDescription = () => {
    let { product } = this.state;
    return (
      <View>
        <Text p style={[styles.labelHeading, { fontSize: normalize(16) }]}>
          {`${product.description}`}
        </Text>
      </View>
    );
  };
  renderItems = (item, index, imageHeight) => {
    return (
      <Listitems
        onPress={() => {
          this.props.navigation.push("ProductDetails", {
            productId: item.id
          });
        }}
        item={item}
        index={index}
        imageHeight={imageHeight}
        onPressWishlist={() => this.onPressWishlist(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
      />
    );
  };
  _renderReviewItem = (item, index) => {
    return <ReviewItem item={item} index={index} />;
  };
  renderVendorProfile = () => {
    let { product } = this.state;
    let { user } = this.props.screenProps.user;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("VendorProduct", {
              vendor: product
            })
          }
          style={{ flexDirection: "row", flex: 1}}
        >
          {product.vendor && product.vendor.pic ? (
            <View>
              <Image
                source={{ uri: product.vendor.pic }}
                style={{ width: 48, height: 48, borderRadius: 48 / 2 }}
              />
            </View>
          ) : null}

          <View
            style={{ justifyContent: "center", paddingLeft: 12, flex: 0.8 }}
          >
            <View style={{ alignItems: "flex-start",}}>
            <Text p style={{ fontSize: normalize(18), color: "#000000" }}>
              {" "}
              {`${
                product.vendor && product.vendor.name ? product.vendor.name : ""
              }`}
            </Text>
            </View>
           
            <View
              style={{
                paddingTop: 8
              }}
            >
              <Rating readOnly={true} showRating defaultRating={product.vendorAverage} />
            </View>
          </View>
          {(product && product.isRated == 1) ? <TouchableOpacity
              style={{ flex: 0.5, alignItems: "center" }}
              onPress={() =>
                this.props.navigation.navigate("AddReview", {
                  vendorId: product.vendor.id,
                  getProductDetail:() => this.getProductDetail(this.state.productId)
                })
              }
            >
              <Text h5 style={{ color: colors.primary }}>
                {string("Add review")}
              </Text>
            </TouchableOpacity>:null
          }
        </TouchableOpacity>
        {product.vendor_rating &&
        product.vendor_rating.length > 0 &&
        ((user && user.user_type == "customer") || !user)
          ? this._renderReviesList(product.vendor_rating, string("Reviews"), 168)
          : null}
        {product.vendor_rating &&
        product.vendor_rating.length > 1 &&
        ((user && user.user_type == "customer") || !user) ? (
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {this.renderButton(string("View All Reviews"),false,"ViewAllReviews")}
          </View>
        ) : null}
      </View>
    );
  };
  renderProductsList = (array, label, imageHeight) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 24, }}>
        {this.renderLabel(label)}
        <View style={{ height: 10 }} />
        <FlatList
          bounces={true}
          // horizontal={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={array}
          keyExtractor={(item, index) => index + "product"}
          renderItem={({ item, index }) =>
            this.renderItems(item, index, imageHeight)
          }
          ListEmptyComponent={
            <ProductPlaceholder
              array={[1, 2]}
              message={
                this.props.screenProps.loader ? "" : string("No similar products found")
              }
              loader={this.loaderComponent}
            />
          }
        />
      </View>
    );
  };
  _renderReviesList = (array, label) => {
    return (
      <View style={{ flex: 1 }}>
        {/* {this.renderLabel(label)} */}
        <FlatList
          bounces={true}
          // horizontal={true}
          showsVerticalScrollIndicator={false}
          data={array}
          keyExtractor={(item, index) => index + "product"}
          renderItem={({ item, index }) => this._renderReviewItem(item, index)}
          ListEmptyComponent={
            <NotificationPlaceholder
              array={[1]}
              message={this.props.screenProps.loader ? "" : string("No review found")}
              loader={this.loaderComponent}
            />
          }
        />
      </View>
    );
  };
  renderSpaceBorder = () => {
    let { user } = this.props.screenProps.user;
    return (
      ((user && user.user_type == "customer") || !user) && (
        <View
          style={[
            styles.borderSalesReport,
            {
              marginRight: screenDimensions.width / screenDimensions.width - 24,
              width: screenDimensions.width
            }
          ]}
        />
      )
    );
  };
  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    let { user } = this.props.screenProps.user;
    return (
      <View style={detailStyles.scrollViewContent}>
        <View style={{ flex: 1, paddingVertical: 16 }}>
          <View style={{ paddingHorizontal: 24 ,alignItems:'flex-start'}}>
            <ProductItemDetail product={this.state.product} />
          </View>
          <View style={{ paddingHorizontal: 24 ,alignItems:'flex-start'}}>
            <View style={{ height: 16 }} />
            {this.renderLabel(string("Product Details"))}
            <View style={{ height: 16 }} />
            {this.renderDescription()}
            <View style={{ height: 24 }} />
            <Features product={this.state.product} />
          </View>
          <View style={{ height: 24 }} />
          {((user && user.user_type == "customer") || !user) && (
            <View style={{ paddingHorizontal: 24,alignItems:'flex-start' }}>
              <FeatureLabel title={string("Posted by")} />
            </View>
          )}
          <View style={{ height: 16 }} />
          {((user && user.user_type == "customer") || !user) && (
            <View style={{ flex: 1, paddingHorizontal: 24, }}>
              {this.renderVendorProfile()}
            </View>
          )}
          <View style={{ height: 16 }} />

          {this.renderSpaceBorder()}
          <View style={{ height: 8 }} />
          {((user && user.user_type == "customer") || !user) &&
            this.renderProductsList(this.state.similarProducts, string("Similar Products"), 168)}
          <View style={{ height: 24 }} />
        </View>
      </View>
    );
  }
  handleScroll = event => {
    if (Platform.OS == "ios") {
      if (
        event.nativeEvent.contentOffset.y < 0 &&
        event.nativeEvent.contentOffset.y > -159
      ) {
        this.setState({
          isbarShow: true
        });
      } else if (
        event.nativeEvent.contentOffset.y < -160 &&
        event.nativeEvent.contentOffset.y > -200
      ) {
        this.setState({
          isbarShow: false
        });
      }
    } else if (Platform.OS == "android") {
      if (
        event.nativeEvent.contentOffset.y > 55 &&
        event.nativeEvent.contentOffset.y > 70
      ) {
        this.setState({
          isbarShow: true
        });
      } else if (
        event.nativeEvent.contentOffset.y < 55 &&
        event.nativeEvent.contentOffset.y > 0
      ) {
        this.setState({
          isbarShow: false
        });
      }
    }
  };
  renderCartCount = carts => {
    if (carts && carts.length > 0) {
      return (
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: colors.primary,
            borderRadius: 17 / 2,
            width: 17,
            height: 17,
            top: -5,
            right: -10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            p
            style={{
              color: "white",
              fontSize: normalize(12),
              fontWeight: "600",
              lineHeight: 18
            }}
          >
            {carts.length}
          </Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  };
  render() {
    let { carts } = this.props.screenProps.product;
    let { user } = this.props.screenProps.user;
    let { params } = this.props.navigation.state;
    let title = "Add to Cart";
    let action="AddtoCart";
    if (
      carts &&
      carts.length > 0 &&
      carts.findIndex(x => x.product_id == this.state.product.product_id) > -1
    ) {
      title = "View Cart";
      action="ViewCart"
    }
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    let { product } = this.state;
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });
    const titleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    return (
      <LazyHOC>
        <View style={detailStyles.fill}>
          <Animated.ScrollView
            style={detailStyles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                listener: event => {
                  this.handleScroll(event);
                }
              },
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true });
                  setTimeout(() => this.setState({ refreshing: false }), 1000);
                }}
                // Android offset for RefreshControl
                progressViewOffset={HEADER_MAX_HEIGHT}
              />
            }
            // iOS offset for RefreshControl
            contentInset={{
              top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT
            }}
          >
            {this._renderScrollViewContent()}
          </Animated.ScrollView>
          <Animated.View
            style={[
              detailStyles.header,
              { transform: [{ translateY: headerTranslate }] }
            ]}
          >
            <Animated.View
              style={[
                detailStyles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }]
                }
              ]}
            >
              <ProductSlider banners={this.state.banners} />
            </Animated.View>

            {/* <Animated.Image
            style={[
              detailStyles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri: product.pic
                ? product.pic[0]
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_CxVo-e0CajwrW3CZsXsasW9zRIi1TieY7KbDSdHTYIaz8kkg"
            }}
          /> */}
            <TouchableOpacity
              style={{
                flex: 0.2,
                zIndex: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16
              }}
            >
              <TouchableOpacity
                style={{ alignSelf: "center", zIndex: 1000 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image source={require("../../assets/images/ic_back.png")} 
                style={{transform: [
      { scaleX: I18nManager.isRTL ?-1 :1}, ]}}
                />
              </TouchableOpacity>
              {((user && user.user_type == "customer") || !user) && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Cart")}
                  style={{ alignSelf: "center" }}
                >
                  <Image source={require("../../assets/images/ic_cart.png")} />
                  {this.renderCartCount(carts)}
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </Animated.View>
          {this.state.isbarShow ? (
            <Animated.View
              style={[
                detailStyles.bar,
                {
                  zIndex: 0,
                  opacity: titleOpacity,
                  paddingHorizontal: 24
                  // transform: [{ scale: titleScale }, { translateY: titleTranslate }]
                }
              ]}
            >
              <TouchableOpacity
                style={{ alignSelf: "center", zIndex: 1000 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image source={require("../../assets/images/ic_back.png")} 
                       style={{transform: [
                        { scaleX: I18nManager.isRTL ?-1 :1}, ]}}/>
              </TouchableOpacity>
              <View>
                <Text style={detailStyles.title}>
                  {product.brand ? product.brand.name : ""}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Cart")}
                style={{ alignSelf: "center" }}
              >
                <Image source={require("../../assets/images/ic_cart.png")} />
                {this.renderCartCount(carts)}
              </TouchableOpacity>
            </Animated.View>
          ) : null}
          {((user && user.user_type == "customer") || !user) &&
            this.renderButton(title,false,action)}
        </View>
      </LazyHOC>
    );
  }
}
const detailStyles = StyleSheet.create({
  fill: {
    flex: 1
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F5F8FA",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 18 : 28,
    height: 32,
    alignItems: "center",
    //justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    right: 0
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: normalize(22)
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  }
});
