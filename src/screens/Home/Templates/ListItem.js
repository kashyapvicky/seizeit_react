import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import { Images } from "../../../utilities/contsants";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { screenDimensions } from "../../../utilities/contsants";

const Listitems = ({ item, index, imageHeight,onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={9}
      index={index}
      onPress={() => onPress ? onPress() : null}
      style={[
        {
          backgroundColor: "transparent",
          paddingVertical: 8,
          flex: 0.5,
          width:screenDimensions.width/2-24,
          marginRight: (index + 1) % 2 != 0 ? 16 : 0
        }
      ]}
    >
    <View style={{position:'absolute',right:8,top:12,zIndex:100}}>
          <Image source={require('../../../assets/images/ic_favourite_0.png')} />
    </View>
    <View style={{ paddingBottom: 6 }}>
        <View
          style={[
            {
              flex: 1,
              shadowColor: "rgba(0,0,0)",
              shadowOpacity: 0.12,
              shadowRadius: 5,
              borderRadius: 8
            }
          ]}
        >
          <Image
            style={{ borderRadius: 8, width: "100%", height: imageHeight }}
            source={{
              uri:
                "https://cdn.andamen.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/1/01_3_19.jpg"
            }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 8, paddingTop: 8 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              p
              style={{
                color: "#96C50F",
                letterSpacing: 0.5,
                fontSize: normalize(12)
                // fontWeight: "600"
              }}
            >
              CLOTHING
            </Text>
          </View>
          <View>
            <Text
              p
              style={{
                color: "#000000",
                fontSize: normalize(16),
                fontWeight: "normal"
              }}
            >
              Dotted Red payjama bottom wear
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 6
            }}
          >
            <Text h5 style={{ color: "#000000", fontSize: normalize(13) }}>
              $90
            </Text>
            {
              item.isCart ?  <Image source={Images.removeCart} />
               :  <Image source={Images.addCart} />
            }
           
          </View>
        </View>
      </View>
      <View style={{ height: 16 }} />

    </TouchableOpacity>
  );
};
export default Listitems;
