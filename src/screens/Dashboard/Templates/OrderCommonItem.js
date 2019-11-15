import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { Images } from "../../../utilities/contsants";

export default OrderCommonItem = ({ item }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={[
          styles.shadow,
          {
            flex: 0.3,
            shadowColor: "rgba(0,0,0)",
            shadowOpacity: 0.19,
            shadowRadius: 0.1
          }
        ]}
      >
        <Image
          style={{ height: 96, width: 96, borderRadius: 4 }}
          source={
            item.product_detail && item.product_detail.pics.length > 0
              ? {
                  uri: item.product_detail.pics[0].pic
                }
              : Images.no_image
          }
        />
      </View>
      <View style={{ flex: 0.7, paddingLeft: 8 }}>
        <View>
          <Text
            p
            style={{
              color: "#233138",
              letterSpacing: 0.5,
              fontSize: normalize(12),
              fontWeight: "600",
            }}
          >
            {item.product_detail && item.product_detail.brand
              ? item.product_detail.brand.name
              : ""}
          </Text>
        </View>
        <View>
          <Text p style={{ color: "#000000" }}>
            {item && item.product_detail
              ? item.product_detail.product_title
              : ""}
          </Text>
          <Text
            p
            style={{
              color: "rgba(0,0,0,0.56)",
              fontSize: normalize(13)
            }}
          >
            by {item && item.vendor && item.vendor.name ? item.vendor.name : ""}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 6
          }}
        >
          <Text h5 style={{ color: "#000000", fontSize: normalize(18) }}>
            ${item && item.product_detail ? item.product_detail.price : ""}
          </Text>
          {item.status == 6 && (
            <View
              style={{
                width: "auto",
                justifyContent: "center",
                paddingHorizontal: 6,
                height: 18,
                marginTop: 8,
                // justifyContent:'center',
                // flexDirection:'row',
                backgroundColor: "rgba(150,197,15,0.12)",
                borderRadius: 12
              }}
            >
              <Text
                textAlign
                style={[
                  styles.text,
                  { color: "#96C50F", fontSize: normalize(10) }
                ]}
              >
                {item.stausMessage}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
