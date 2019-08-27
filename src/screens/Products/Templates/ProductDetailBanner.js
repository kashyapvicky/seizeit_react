import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground,
  Animated
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
export default class BannerCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Chandigarh",
      bannerImages: [
        {
          id: 1,
          image:
            "http://subexyabhadel.com/wp-content/uploads/2019/01/main-qimg-7b543be853affc8d4993e2f9bb60cba1.png"
        },
        {
          id: 3,
          image:
            "https://www.irreverentgent.com/wp-content/uploads/2018/11/Types-of-Sweaters-For-Guys-crew.jpg"
        },
        {
          id: 4,
          image:
            "https://www.dhresource.com/0x0s/f2-albu-g10-M00-CC-05-rBVaWVwwaQmAJa-hAAK8INvlYOs969.jpg/seether-rock-band-album-cover-logo-t-shirt.jpg"
        }
      ],
      imagewidth: "100%",
      imageheight: "100%",
      slider1ActiveSlide: 0
    };
  }
  bannerImagesData = ({ item, index }) => {
    return (
      <Animated.View
        // index={index}
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF",
            height: sliderHeight / 2,
            position: "relative"
          }
        ]}
      >
        <Animated.Image
          source={{ uri: 'https://www.dhresource.com/0x0s/f2-albu-g10-M00-CC-05-rBVaWVwwaQmAJa-hAAK8INvlYOs969.jpg/seether-rock-band-album-cover-logo-t-shirt.jpg' }}
          // resizeMode={'stretch'}
          // style={[styles.bannerImages,{resizeMode:'cover'}]}
          style={{
            flex: 1,
            width: "100%",
            position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex:1000,
            height: sliderHeight / 2,
            resizeMode: "cover"
          }}
          {...this.props.imagesProps}
        />

      </Animated.View>
    );
  };
  render() {
    return this.bannerImagesData()
}
}
