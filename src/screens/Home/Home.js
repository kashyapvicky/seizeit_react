import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  RefreshControl
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import RNGooglePlaces from "react-native-google-places";
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';

import {postRequest,getRequest} from '../../redux/request/Service'

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import SearchInput from "../../components/SearchInput";

import Header from "../../components/Header";
import { normalize } from "../../utilities/helpers/normalizeText";
import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images, screenDimensions } from "../../utilities/contsants";
import Listitems from "./Templates/ListItem";
import BannerCarousel from "./Templates/Carousel";
import {requestLocationPermission} from './Templates/RequestLocationPermission'
import {ProductPlaceholder} from './Templates/PlaceHolderProduct'
import {CategoryPlaceholder} from './Templates/CategoryPlaceHolder'

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 10 : 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class Home extends Component {
  // loadingComponent: Promise<React.Element<*>>;
  constructor(props) {
    super(props);
    this.state = {
      name:'Location',
      visible2: false,
      categories:[],
      featureProducts:[],
      banners:[],
      popularProducts:[],
      isbarShow: false,
      scrollY: new Animated.Value(
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    };
    
    this.isbarShow = false;
    this.onGetCurrentPlacePress()
    if(Platform.OS == 'android'){
      requestLocationPermission().then((res)=>{
        if(res){
          this.onGetCurrentPlacePress()
        }
      })
      }
      // Placeholder Product 
      this.loaderComponent = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
   
  }
  componentDidMount(){
    this.getCategories()
    this.getHomeData()
  }
/*********** Get current Location  *****/
 onGetCurrentPlacePress = () => {
    RNGooglePlaces.getCurrentPlace()
      .then(results => {
        if (results && results.length > 0) {
          debugger
          this.setState({
            currentAddress: results[0].address,
            currentLocation: results[0].location,
            name:results[0].name,
          });
        }
      })
      .catch(error => console.log(error.message));
  };
  updateLocation = (location) =>{
    this.setState({
      ...location
    })
  }
  /*************APi Call  *********/
  getCategories = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    getRequest('user/fetchcategory').then((res) => { 
      debugger
      if(res && res.success && res.success.length > 0){
        this.setState({
          categories : res.success
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  getHomeData = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    getRequest('user/home-page').then((res) => { 
      debugger
      if(res && res.success){
        this.setState({
          featureProducts : res.success.featured &&  res.success.featured.length>0 ?res.success.featured:[],
          popularProducts : res.success.popular &&  res.success.popular.length>0 ?res.success.popular:[],
          banners:res.success.banner && res.success.banner.length >0 ? res.success.banner :[]
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  /*********** APi Call End  *****/

  renderButton = title => {
    return (
      <Button
        buttonStyle={{
          height: 38,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          borderColor: colors.primary,
          backgroundColor: "transparent"
        }}
        buttonTextStyle={{ fontWeight: "normal" }}
        fontSize={normalize(16)}
        color={colors.primary}
        onPress={() => alert()}
        title={title}
      />
    );
  };
  renderSearchInput = style => {
    return (
      <SearchInput
        editable={false}
        //backgroundColor={'white'}
        style={style && style}
        pointerEvents="none"
        onPress={() => this.props.navigation.navigate("SearchProduct")}
        placeHolder={"What are you looking for?"}
      />
    );
  };
  showAllCateItems = ({ item, index }) => {
    return (
      <View index={index} style={styles.showAllPetProductsView}>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => this.props.navigation.navigate("SubCategory",{
            category:item
          })}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16
            }}
          >
            <Image
              source={require("../../assets/images/profile.jpeg")}
              style={{ width: 32, height: 32, borderRadius: 32 / 2 }}
            />
            <View style={{ paddingTop: 8 }}>
              <Text p style={styles.itemName}>
                {item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderCategory = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          bounces={false}
          autoplay={true}
          horizontal={true}
          snapToInterval={300}
          data={this.state.categories}
          pagingEnabled={true}
          ListEmptyComponent={<CategoryPlaceholder  
            loader={this.loaderComponent}
          />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index + "flatlist"}
          renderItem={this.showAllCateItems}
        />
      </View>
    );
  };
  renderLabel = title => {
    return (
      <View>
        <Text h4 style={styles.labelHeading}>
          {title}
        </Text>
      </View>
    );
  };
  renderItems = (item, index, imageHeight) => {
    console.log(item,"item")
    return (
      <Listitems
        onPress={() => this.props.navigation.navigate("ProductDetails",{
          productId:item.product_id
        })}
        item={item}
        index={index}
        imageHeight={imageHeight}
      />
    );
  };
  renderProductsList = (array, label, imageHeight) => {
    return (
      <View style={{ flex: 1 }}>
        {this.renderLabel(label)}
        <View style={{ height: 10 }} />
        <FlatList
          bounces={true}
          // numColumns={2}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          data={array}
          keyExtractor={(item, index) => index + "product"}
          ListEmptyComponent={<ProductPlaceholder  
            loader={this.loaderComponent}
          />}
          renderItem={({ item, index }) =>
            this.renderItems(item, index, imageHeight)
          }
        />

      </View>
    );
  };
  /**************** Render Scrollview Content  ************/

  _renderScrollViewContent() {
    return (
      <View style={detailStyles.scrollViewContent}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}>
          <View style={{ flex: 1, marginVertical: 16, borderRadius: 16 }}>
            <BannerCarousel 
             banners={this.state.banners}
            />
          </View>
          <View style={{ height: 28 }} />
          {this.renderProductsList(this.state.popularProducts, "Trending Products", 96)}
          <View style={{ height: 16 }} />
          {this.renderButton("Explore more in Trending")}
          <View style={{ height: 32 }} />
          {this.renderProductsList(
            this.state.featureProducts,
            "Featured Products",
            168
          )}
          <View style={{ height: 16 }} />
          {this.renderButton("Explore more in Trending")}
          <View style={{ height: 16 }} />
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
        event.nativeEvent.contentOffset.y < -159 &&
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
    /************ Animation Type */
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const titleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    console.log(this.state.isbarShow, "this.isbarShow ");
    /**************** End Animation Type ************************/
    return (
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
          <Animated.View style={{ paddingTop: 16, flex: 1, zIndex: 100 }}>
            <Header
              isRightIcon={Images.cart}
              hideLeftIcon={true}
              headerStyle={{ flex: 1, zIndex: 1000 }}
              title={this.state.name}
              isLocation
              onRightPress={() => null}

              // onRightPress={() => this.props.navigation.navigate("Cart")}
              onPressLocation={() =>
                this.props.navigation.navigate("ChangeLocation",{
                  updateLocation : (location) => this.updateLocation(location)
                })
              }
              backPress={() => this.props.navigation.goBack()}
            />
          </Animated.View>
          <Animated.View
            style={[styles.shadow, styles.homeShadowView, { zIndex: 0 }]}
          >
            {this.renderSearchInput()}
            <View style={{ height: 25 }} />
            {this.renderCategory()}
          </Animated.View>
        </Animated.View>
        {this.state.isbarShow
        
        
        
         ? (
          <Animated.View
            style={[
              detailStyles.bar,
              // styles.shadow,
              {
                flex: 1,
                paddingVertical: 16,
                opacity: titleOpacity,
                // transform: [
                //   { scale: titleScale },
                //   { translateY: titleTranslate }
                // ]
              }
            ]}
          >
            <View
              style={[
                styles.shadow,
                {
                  flex: 1,
                  justifyContent: "center",
                  shadowRadius: 2,
                  shadowOpacity: 0.2
                }
              ]}
            >
              {this.renderSearchInput({ backgroundColor: "white",borderRadius:40/2 })}
            </View>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}
export default Home;
const detailStyles = StyleSheet.create({
  fill: {
    // flex: 1,
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: "white"

    //  height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    // height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    margin: 0,
    marginTop: Platform.OS === "ios" ? 18 : 28,
    // alignItems: "center",
    //justifyContent: "center",
    position: "absolute",
    zIndex: 0,
    height: 52,
    backgroundColor: "transparent",
    // top: 0,
    width: screenDimensions.width,
    borderRadius:52/2,
    // left: 0,
    flexDirection: "row",
    // justifyContent:'space-between',
    // right: 0,
    flex: 1
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
    // margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  }
});
