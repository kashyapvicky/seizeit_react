import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
import { Images } from "../../../utilities/contsants";
import { normalize } from "../../../utilities/helpers/normalizeText";
import Rating from "./Rating";
import i18 from 'i18n-js';

const ProductItemDetail = ({ product }) => {
  return (
    <View style={{ flex: 1, paddingTop: 8 }}>
     
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          p
          style={{
            color: "#96C50F",
            letterSpacing: 0.5,
            fontSize: normalize(16),
            lineHeight: 20
            // fontWeight: "600"
          }}
        >
     {i18.locale == 'ar' ? product.arabic_name ? product.arabic_name : '' : product.brand ? product.brand.name.toUpperCase() : ''}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 8,
          alignItems:'flex-start'
        }}
      >
        <Text
          p
          style={{
            color: "#000000",
            fontSize: normalize(20),
            fontWeight: "normal",
            lineHeight: 30
          }}
        >
              {i18.locale == 'ar' ? product.arabic_product_title : product.product_title}
        </Text>
      </View>
      <View
        style={{
          // flexDirection: "row",
          // justifyContent: "space-between",
          paddingTop: 14,
          flex:1,
          // backgroundColor:'red'
        }}
      >
        <View style={{ flex: 1, }}>
          <Text h5 style={{ color: "#000000", fontSize: normalize(24) }}>
          {String.currency} {product.price}
          </Text>
        </View>
      </View>
      {/* <View  style={{
              paddingTop: 8
            }}>
           <Rating />

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
          </View> */}
    </View>
  );
};
export default ProductItemDetail;
