import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import { Images } from "../../../utilities/contsants";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
const sliderWidth = Dimensions.get("window").width;
const sliderHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;
import Carousel, { Pagination } from "react-native-snap-carousel";
export default class ProductSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Chandigarh",
      bannerImages: this.props.banners,
      imagewidth: "100%",
      imageheight: "100%",
      slider1ActiveSlide: 0
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  bannerImagesData = ({ item, index }) => {
    return (
      <View
        index={index}
        style={[
          styles.shadow,
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF",
            position: "relative",
            borderRadius: 0
          }
        ]}
      >
        <ImageBackground
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_CxVo-e0CajwrW3CZsXsasW9zRIi1TieY7KbDSdHTYIaz8kkg"
          }}
          resizeMode={"stretch"}
          // imageStyle={{borderRadius:4}}
          // style={[styles.bannerImages,{resizeMode:'cover'}]}
          style={{
            height: "100%",
            // borderRadius:4,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
        ></ImageBackground>
      </View>
    );
  };
  render() {
    return (
      <View
        style={[
          styles.cardMainView,
          {
            paddingHorizontal: 0
          }
        ]}
      >
        <View
          style={[
            styles.cardViewStyle,
            styles.shadow,
            ,
            {
              shadowRadius: 5,
              shadowOpacity: 0.3,
              height: 300,
              // backgroundColor:'red',
              shadowOffset: {
                width: 0,
                height: 2
              },
              elevation: 2
            }
          ]}
        >
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.props.banners}
            renderItem={this.bannerImagesData}
            autoplay={true}
            loop={true}
            autoplayInterval={3000}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          />
          <Pagination
            dotsLength={this.state.bannerImages.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={{ position: "absolute", bottom: 0 }}
            dotColor={"#96C50F"}
            dotStyle={{ height: 12, width: 12, borderRadius: 12 / 2 }}
            inactiveDotColor={"black"}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>
      </View>
    );
  }
}
