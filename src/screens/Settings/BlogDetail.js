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
import LinearGradient from "react-native-linear-gradient";
import { string } from "../../utilities/languages/i18n";

const HEADER_MAX_HEIGHT = 312;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import styles from "../../styles";
import Text from "../../components/Text";
import { normalize } from "../../utilities/helpers/normalizeText";
import { screenDimensions } from "../../utilities/contsants";
export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      isbarShow:false,
      refreshing: false,
      item:{},
    };
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    if(params && params.blogItem){
      this.setState({
        item : params.blogItem
      })
    }
  }
  _renderScrollViewContent() {
    return (
      <View style={detailStyles.scrollViewContent}>
        <View
          style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}
        >
             <BlogItem item={this.state.item}/> 

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
    const titleMainTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });
    const titleMainOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });
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
          <Animated.Image
            style={[
              detailStyles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{
              uri:this.state.item.image
              
            }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
            style={[styles.linearGradient,{borderRadius: 0
            }]}
          >
            <Animated.View
              style={{
                flex: 0.3,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                zIndex:10,
              }}
            >
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image source={require("../../assets/images/ic_back_w.png")} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Cart")}
                style={{ alignSelf: "center" }}
              >
                <Image source={require("../../assets/images/ic_share_w.png")} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                {
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingHorizontal: 16,
                  alignItems:'flex-start',

                  paddingVertical: 16,
                  opacity: titleMainOpacity,
                  transform: [
                    { scale: titleScale },
                    { translateY: titleMainTranslate }
                  ]
                }
              ]}
            >
              <Text style={[styles.blog_title, { fontSize: normalize(24) }]}>
                {this.state.item.title}
              </Text>
            </Animated.View>
        </LinearGradient>
        </Animated.View>

        {this.state.isbarShow ? 
        <Animated.View
          style={[
            detailStyles.bar,
            {
              flex:1,
              paddingHorizontal:24,
              zIndex:0,
            //   backgroundColor:'red',
              opacity: titleOpacity,
              // transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
        >
      
          <TouchableOpacity
            style={{ alignSelf: "center", zIndex: 1000 }}
            onPress={() => this.props.navigation.goBack()}
          >
          <Image source={require("../../assets/images/ic_back_w.png")} />
          </TouchableOpacity>
          <View>
            <Text style={[detailStyles.title,{color:'white',fontSize:normalize(16)}]}>{this.state.item.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Share")}
            style={{ alignSelf: "center" }}
          >
          <Image source={require("../../assets/images/ic_share_w.png")} />
          </TouchableOpacity>
        </Animated.View> : null}
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
