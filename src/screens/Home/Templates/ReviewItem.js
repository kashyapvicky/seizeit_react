
import React,{useState} from "react";
import { StyleSheet, View,ActivityIndicator, TouchableOpacity, Image } from "react-native";
import colors from "../../../utilities/config/colors";
import { normalize } from "../../../utilities/helpers/normalizeText";
import Text from "../../../components/Text";
import Rating from "../../Products/Templates/Rating";
import styles from "../../../styles";

export const  ReviewItem = ({item,index}) => {
return <View style={[styles.shadow,{ flex: 1, marginTop: 8 ,
    paddingVertical:16,
    shadowRadius: 0.1,
    elevation:1,
   backgroundColor:'white'}]}>
    <View style={{ flexDirection: "row", flex: 1, }}>
      <View style={{ flex: 0.2 }}>
          <View>
            <Image
              source={{
                uri:
                  "https://www.seizeit-me.com/categories/94c8f26313f797911edada31ec1cdf0aRaT1oqa3Gf73A81FkCoaJuYGockq.jpg"
              }}
              style={{ width: 48, height: 48, borderRadius:48 / 2 }}
            />
          </View>
      </View>
      <View style={{ flex: 0.8 }}>
        <View style={{ justifyContent: "flex-start", flex: 0.8 }}>
          <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
            {`${"Mangal Singh"}`}
          </Text>
          <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
            {`${"January 29,2019"}`}
          </Text>
        </View>
        <View style={{ paddingTop: 2 }}>
        <Rating readOnly
           defaultRating={item && item.rating ? item.rating:0}
        />
        </View>
        <View style={{ paddingTop: 4 }}>
          <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
            {`${item && item.feedback ? item.feedback : ''}`}
          </Text>
        </View>
      </View>
    </View>
  </View>
}