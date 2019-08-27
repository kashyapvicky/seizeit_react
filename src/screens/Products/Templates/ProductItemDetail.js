import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
import { Images } from "../../../utilities/contsants";
import { normalize } from "../../../utilities/helpers/normalizeText";

 const ProductItemDetail = props => {
  return  <View style={{ flex: 1, paddingTop: 8, }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              p
              style={{
                color: "#96C50F",
                letterSpacing: 0.5,
                fontSize: normalize(16)
                // fontWeight: "600"
              }}
            >
              T-SHIRT
            </Text>
          </View>
          <View  style={{
              paddingTop:8
            }}>
            <Text
              p
              style={{
                color: "#000000",
                fontSize: normalize(20),
                fontWeight: "normal",
                lineHeight:30
              }}
            >
            Set of 4 beautiful T shirts Stripes all of different brands
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 18
            }}
          >
            <Text h5 style={{ color: "#000000", fontSize: normalize(24) }}>
              $90
            </Text>
          </View>
          <View  style={{
              
              paddingTop: 8
            }}>
          <Text
              p
              style={{
                color: "#000000",
                fontSize: normalize(16),
                fontWeight: "normal"
              }}
            >
             Free delivery by Thursday
            </Text>
          </View>
      </View>
};
export default ProductItemDetail
