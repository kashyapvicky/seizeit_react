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
import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import Listitems from "../Home/Templates/ListItem";
import {postRequest,getRequest} from '../../redux/request/Service'

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
      isbarShow:false,
      product:'',

      refreshing: false
    };
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    debugger
    if(params && params.productId){
      this.getProductDetail(params.productId)
    }
  
  }
 /*************APi Call  *********/
 getProductDetail = (product_id)=>{
  let {setIndicator} = this.props.screenProps.actions
  getRequest(`user/productDetails?product_id=${product_id}`).then((res) => { 
    debugger
    if(res && res.success.length>0){
      this.setState({
        product : res.success[0]
      })
    }   
    setIndicator(false)
  }).catch((err) => {
  })
}
 /*************APi Call  End *********/

  renderLabel = title => {
    return (
      <View>
        <Text h5 style={[styles.labelHeading, { fontSize: normalize(18) }]}>
          {title}
        </Text>
      </View>
    );
  };
  renderButton = (title, transparent) => {
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
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  pressButton = ()=>{

  }
  renderDescription = () => {
    let {product} = this.state
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
          <ProductItemDetail product={this.state.product}/>
          <View style={{ height: 16 }} />
          {this.renderLabel("Product Details")}
          <View style={{ height: 16 }} />
          {this.renderDescription()}
          <View style={{ height: 24 }} />
          <Features 
          product={this.state.product}
          />
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
          {/* {this.renderProductsList([1, 1], "Similer Products", 168)} */}
          <View style={{ height: 24 }} />
        </View>
      </View>
    );
  }
  handleScroll = event => {
    if(Platform.OS == 'ios'){
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
    }else if(Platform.OS == 'android'){
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
  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    let {product} = this.state
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
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }  ],
            {listener:event => {
              this.handleScroll(event);
             }},
            { useNativeDriver: true },
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
              product ?  product.pic[0] : null
            }}
          />
          <TouchableOpacity style={{flex:0.2,zIndex:10,
            flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16}}>
           <TouchableOpacity 
            style={{ alignSelf: "center",zIndex:1000 }} onPress={() => this.props.navigation.goBack()}>
              <Image source={require("../../assets/images/ic_back.png")} />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => null}

            // onPress={() => this.props.navigation.navigate('Cart')}
            style={{ alignSelf: "center" }}>
              <Image source={require("../../assets/images/ic_cart.png")} />
            </TouchableOpacity>
           </TouchableOpacity>
        </Animated.View>
        {
          this.state.isbarShow ?

        <Animated.View
          style={[
            detailStyles.bar,
            {
              zIndex:0,
              opacity: titleOpacity,
              paddingHorizontal:24
              // transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
         >
           <TouchableOpacity 
            style={{ alignSelf: "center",zIndex:1000 }} onPress={() => this.props.navigation.goBack()}>
              <Image source={require("../../assets/images/ic_back.png")} />
            </TouchableOpacity>
            <View>
            <Text style={detailStyles.title}>{product.product_title}</Text>
            </View>
            <TouchableOpacity
               onPress={() => null}

            // onPress={() => this.props.navigation.navigate('Cart')}
            style={{ alignSelf: "center" }}>
              <Image source={require("../../assets/images/ic_cart.png")} />
            </TouchableOpacity>
        </Animated.View>:null}
        {this.renderButton('ADD TO CART')}
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
