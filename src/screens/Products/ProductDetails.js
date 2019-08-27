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
  RefreshControl
} from "react-native";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import ProductDetailBanner from "./Templates/ProductDetailBanner";
import ProductItemDetail from "./Templates/ProductItemDetail";
import { FeatureLabel } from "./Templates/Feature";
import Listitems from "../Home/Templates/ListItem";
import Features from "./Templates/Feature";
import styles from "../../styles";
import Text from "../../components/Text";
import { normalize } from "../../utilities/helpers/normalizeText";
import { screenDimensions } from "../../utilities/contsants";
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };
  }
  renderLabel = title => {
    return (
      <View>
        <Text h5 style={[styles.labelHeading, { fontSize: normalize(18) }]}>
          {title}
        </Text>
      </View>
    );
  };
  renderDescription = () => {
    return (
      <View>
        <Text p style={[styles.labelHeading, { fontSize: normalize(16) }]}>
          {`This beautiful Top I get it for promotion, I wore it only once for shoot. Its brand new Even tags are attahed as it is. Inspired by Gatorade flavours and featuring premium stuff.`}
        </Text>
      </View>
    );
  };
  renderItems = (item, index, imageHeight) => {
    return (
      <Listitems
        onPress={() => this.props.navigation.navigate("ProductDetails")}
        item={item}
        index={index}
        imageHeight={imageHeight}
      />
    );
  };
  renderVendorProfile = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={{ width: 32, height: 32, borderRadius: 32 / 2 }}
        />
        <View style={{ justifyContent: "center", paddingLeft: 16 }}>
          <Text p style={{ fontSize: normalize(18), color: "#000000" }}>
            {" "}
            {"Wesley Pearson"}
          </Text>
        </View>
      </View>
    );
  };
  renderProductsList = (array, label, imageHeight) => {
    return (
      <View style={{ flex: 1 }}>
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
        />
      </View>
    );
  };
  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={detailStyles.scrollViewContent}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }}>
          <ProductItemDetail />
          <View style={{ height: 16 }} />
          {this.renderLabel("Product Details")}
          <View style={{ height: 16 }} />
          {this.renderDescription()}
          <View style={{ height: 24 }} />
          <Features />
          <View style={{ height: 24 }} />
          <FeatureLabel title={"Posted by"} />
          <View style={{ height: 16 }} />
          <View style={{ flex: 1 }}>{this.renderVendorProfile()}</View>
          <View style={{ height: 24 }} />
          <View
            style={[
              styles.borderSalesReport,
              {
                marginRight:
                  screenDimensions.width / screenDimensions.width - 24,
                width: screenDimensions.width
              }
            ]}
          />
          <View style={{ height: 8 }} />

          {this.renderProductsList([1, 1], "Similer Products", 168)}
          <View style={{ height: 24 }} />
        </View>
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
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
      <View style={detailStyles.fill}>
        <Animated.ScrollView
          style={detailStyles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
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
          pointerEvents="none"
          style={[
            detailStyles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              detailStyles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri:
                "https://cdn.andamen.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/1/01_3_19.jpg"
            }}
          />
          <TouchableOpacity style={{flex:0.2,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16}}>
           <TouchableOpacity 
            style={{ alignSelf: "center",zIndex:1000 }} onPress={() => this.props.navigation.goBack()}>
              <Image source={require("../../assets/images/ic_back.png")} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}
            style={{ alignSelf: "center" }}>
              <Image source={require("../../assets/images/ic_cart.png")} />
            </TouchableOpacity>
           </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            detailStyles.bar,
            {
              opacity: titleOpacity,
              transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
         >
           <TouchableOpacity 
            style={{ alignSelf: "center",zIndex:1000 }} onPress={() => this.props.navigation.goBack()}>
              <Image source={require("../../assets/images/ic_back.png")} />
            </TouchableOpacity>
            <View>
            <Text style={detailStyles.title}>T-Shirt</Text>

            </View>

            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}
            style={{ alignSelf: "center" }}>
              <Image source={require("../../assets/images/ic_cart.png")} />
            </TouchableOpacity>
        </Animated.View>
      </View>
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
    flexDirection:'row',
    justifyContent:'space-between',
    right: 0
  },
  title: {
    color: "#000000",
    fontWeight:'bold',
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
